
const { RechargeRecord } = require("../Models/RechargeRecords");
const { Wallet } = require("../Models/Wallet");

const CreateOrderID = () => {
    return `ORD${new Date().getTime()}`;
};

const callRechargeAPI = async (amount, operator, mobileno, service) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 'success', transactionId: `TXN${new Date().getTime()}` });
        }, 2000);
    });
};

const Recharge_mobile = async (req, res) => {
    try {
        const { amount, operator, mobileno, service, userId } = req.rechargeData;
        console.log(userId)
        let wallet = await Wallet.findOne({ userId:userId });
        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }

        if (!wallet.checkBalance(amount)) {
            return res.status(400).json({ message: "Insufficient wallet balance" });
        }

        wallet.walletBalance -= amount;
        await wallet.save();

        const rechargeRecord = new RechargeRecord({
            userId,
            orderId: CreateOrderID(),
            amount,
            deviceType: "mobile",
            mobileType: service,
            operator,
            customerId: mobileno,
            status: 'pending'
        });
        await rechargeRecord.save();

        
        const apiResponse = await callRechargeAPI(amount, operator, mobileno, service);
        rechargeRecord.status = apiResponse.status === 'success' ? 'success' : 'failed';
        rechargeRecord.transactionId = apiResponse.transactionId || null;
        await rechargeRecord.save();

        return res.status(200).json({
            message: apiResponse.status === 'success' ? "Recharge successful" : "Recharge failed",
            rechargeRecord,
        });

    } catch (error) {
        console.error("Error during recharge:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};


const Recharge_DTH = async (req, res) => {
    try {
        const { amount, operator, customerID, userId } = req.rechargeData;
        //console.log(userId)
        let wallet = await Wallet.findOne({ userId:userId });
        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }

        if (!wallet.checkBalance(amount)) {
            return res.status(400).json({ message: "Insufficient wallet balance" });
        }

        wallet.walletBalance -= amount;
        await wallet.save();

        const rechargeRecord = new RechargeRecord({
            userId,
            orderId: CreateOrderID(),
            amount,
            deviceType: "DTH",
            operator,
            customerId: customerID,
            status: 'pending'
        });
        await rechargeRecord.save();

        
        const apiResponse = await callRechargeAPI(amount, operator, customerID, 'NA');
        rechargeRecord.status = apiResponse.status === 'success' ? 'success' : 'failed';
        rechargeRecord.transactionId = apiResponse.transactionId || null;
        await rechargeRecord.save();

        return res.status(200).json({
            message: apiResponse.status === 'success' ? "Recharge successful" : "Recharge failed",
            rechargeRecord,
        });

    } catch (error) {
        console.error("Error during recharge:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = {
    Recharge_mobile,
    Recharge_DTH
};



