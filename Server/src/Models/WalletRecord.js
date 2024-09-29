const { model, Schema } = require("mongoose");

const WalletRecordSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    amount: {
        type: Number,
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
    },
    razorpayPaymentId: {
        type: String,
        required: true,
    },
    razorpayOrderId: {
        type: String,
        required: true,
    }
    // },
    // razorpaySignature: {
    //     type: String,
    //     required: true,
    // }
});

// Creating the WalletRecord model
const WalletRecord = model("WalletRecord", WalletRecordSchema);

module.exports = {
    WalletRecord
};
