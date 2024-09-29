const { model, Schema, Types } = require("mongoose");

const RechargeRecordSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "Users",
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    deviceType: {
        type: String,
        enum: ['mobile', 'DTH'],
        required: true,
    },
    mobileType: {
        type: String,
        enum: ['prepaid', 'postpaid'],
        required: function() {
            return this.deviceType === 'mobile';
        },
    },
    operator: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['success', 'failed', 'pending'],
        required: true,
    }
});

const RechargeRecord = model("RechargeRecord", RechargeRecordSchema);

module.exports = {
    RechargeRecord
};
