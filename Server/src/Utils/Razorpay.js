const Razorpay = require('razorpay');
const { WalletRecord } = require('../Models/WalletRecord');
require('dotenv').config();


var RP = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

const CreateOrderID = () => {
    return `WD${new Date().getTime()}`;
};

const create_order = async(amount,userID) => {
    const orderID = CreateOrderID();
    try {
        const response = await RP.orders.create({
            "amount": amount*100,
            "currency": "INR",
            "receipt": orderID,
            "partial_payment": false,
            "notes": {
                "key1": "value3",
                "key2": "value2"
            }
        })
        const Wallet_order = new WalletRecord({
            orderID:orderID,
            status:'pending',
            amount:amount,
            userId:userID,
            razorpayOrderId:response.id
        })
        Wallet_order.save();
        return {status:1,data:Wallet_order};
    } catch (error) {
        return {status:0,error:error};
    }
}

module.exports = {
    create_order
}