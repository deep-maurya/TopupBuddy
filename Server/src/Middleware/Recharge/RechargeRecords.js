const { RechargeRecord } = require("../../Models/RechargeRecords");

const rechargeRecords = async(req,res) => {
    const userId = req.user.user_id;
    console.log(userId)
    try {
        Data = await RechargeRecord.find({userId:userId}).sort({ timestamp: -1 });
        return res.json({status:1,Data})
    } catch (error) {
        return res.json({status:0,messege:error})
    }
}

module.exports = {
    rechargeRecords
};