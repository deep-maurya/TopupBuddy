const {Router} = require("express");
const { check_login_or_not_user } = require("../Middleware/User/userMiddleware");
const { create_order } = require("../Utils/Razorpay");
const crypto = require('crypto');
const { WalletRecord } = require("../Models/WalletRecord");
const { Wallet } = require("../Models/Wallet");
const walletRouter = Router();

const verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');
    console.log(generatedSignature)
    if (generatedSignature === razorpay_signature) {
      return true;
    } else {
      return false;
    }
};

const update_order_and_update_user_Wallet = async (orderId, paymentId) => {
    try {
        const data =await WalletRecord.findOne({razorpayOrderId:orderId});
        if(data){
            data.status = 'success';
            data.razorpayPaymentId = paymentId;
            await data.save();
            const userId = data.userId;
            try {
                const wallet_data =await Wallet.findOne({userId:userId});
                if(wallet_data){
                    wallet_data.walletBalance+=data.amount;
                    await wallet_data.save();
                }
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

walletRouter.route("/create_order").post(
    check_login_or_not_user,
    async (req,res) => {
        const {amount} = req.body;
        if(!amount){
            return res.json({status:0,messege:"amount required in body"})
        }
        if(amount<100 || amount>5000){
            return res.json({status:0,messege:"amount can be only in 100rs to 5000rs"})
        }
        const orderDetails = await create_order(amount,req.user.user_id);
        //console.log(orderDetails)
        if(orderDetails.status===1){
            return res.json({status:1,data:orderDetails.data})
        } else {
            return res.json({status:0,messege:orderDetails.error})
        }
    }
)

walletRouter.route('/verify_payment').post(
    (req,res)=>{
        const{ paymentId, orderId, signature } = req.body;
        if(!paymentId || !orderId || !signature) {
            return res.json({status:0,messege:"Try again...!"})
        }
        if(verifyPayment(orderId, paymentId, signature)){
            update_order_and_update_user_Wallet(orderId, paymentId)
            return res.json({status:1,messege:"Payment Success"})
        } else {
            return res.json({status:0,messege:"Try again...ff!"})
        }
    }  
)

walletRouter.route('/wallet_balance').post(
    check_login_or_not_user,
    async (req,res)=>{
        const userID = req.user.user_id;
        //console.log(userID)
        try {
            let wallet = await Wallet.findOne({ userId:userID });
            return res.json({status:1,messege:"Wallet Balance Fetched successfully",wallet:wallet.walletBalance})  
        } catch (error) {
            return res.json({status:0,messege:"Try again.."})
        }
    }
)

walletRouter.route('/wallet_record').post(
    check_login_or_not_user,
    async (req,res)=>{
        const userID = req.user.user_id;
        //console.log(userID)
        try {
            let wallet = await WalletRecord.find({ userId:userID }).sort({ timestamp: -1 });
            return res.json({status:1,messege:"Wallet records Fetched successfully",records:wallet})  
        } catch (error) {
            return res.json({status:0,messege:"Try again.."})
        }
    }
)


module.exports = {
    walletRouter
}