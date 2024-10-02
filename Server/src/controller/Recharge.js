
const { RechargeRecord } = require("../Models/RechargeRecords");
const { Wallet } = require("../Models/Wallet");
const axios = require('axios');
require("dotenv").config();

const CreateOrderID = () => {
    return `ORD${new Date().getTime()}`;
};

const dummyApiTransID = () => {
    return Math.random().toString(36).substr(2, 12).toUpperCase();
}

const dummyOperatorRefId = () => {
    return Math.random().toString(36).substr(2, 12).toUpperCase();
}

const dummyStatus = () => {
    const statuses = ['Success', 'FAILED'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

const callRechargeAPI = async (amount, operatorCode, mobileno, service, orderID) => {
    let api_mode = 0;
    let Error = 0;
    let Response = ''
    if(api_mode){
        try {
            Response = await axios.get(`https://cyrusrecharge.in/services_cyapi/recharge_cyapi.aspx?memberid=${process.env.CYRUS_API_KEY}&pin=${process.env.CYRUS_SECRET_KEY}&number=${mobileno}&operator=${operatorCode}&circle=19&amount=${amount}&usertx=${orderID}&format=json`)
            console.log(Response.data)
        } catch (error) {
            console.log(error)
            Error = 1;
        }
    } else {
        const status = dummyStatus();
        Response = {
            ApiTransID: dummyApiTransID(),
            Status: status,
            ErrorMessage: ' ',
            OperatorRef: status==='Success'?dummyOperatorRefId():'',
            TransactionDate: Date.now()
        };        
        //console.log(Response)
    }
    return {error:Error,data:[Response]}
};

const Recharge_mobile = async (req, res) => {
    try {
        const { amount, operator, mobileno, service, userId } = req.rechargeData;
        console.log(userId)
        let wallet = await Wallet.findOne({ userId:userId });
        if (!wallet) {
            return res.status(404).json({Status:'failed', message: "Wallet not found" });
        }

        if (!wallet.checkBalance(amount)) {
            return res.status(400).json({Status:'failed', message: "Insufficient wallet balance" });
        }

        wallet.walletBalance -= amount;
        await wallet.save();
        const order_id = CreateOrderID();
        const rechargeRecord = new RechargeRecord({
            userId,
            orderId: order_id,
            amount,
            deviceType: "mobile",
            mobileType: service,
            operator,
            customerId: mobileno,
            status: 'pending'
        });
        await rechargeRecord.save();

        const apiResponse = await callRechargeAPI(amount, 'JIO', mobileno, service, order_id);
        if(apiResponse.error===0){
            const responseData = apiResponse.data[0];
            rechargeRecord.status = responseData.Status === 'Success' ? 'success' : 'failed';
            rechargeRecord.transactionId = responseData.OperatorRef || null;
            await rechargeRecord.save();
            
        }
        
        return res.status(200).json({
            Status: rechargeRecord.status,
            rechargeRecord
        });

    } catch (error) {
        console.error("Error during recharge:", error);
        return res.status(500).json({ Status:'failed',message: "Internal server error" });
    }
};

module.exports = {
    Recharge_mobile
};



