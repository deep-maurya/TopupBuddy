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
    orderID : {
        type: String,
        required:true,  
    },
    razorpayPaymentId: {
        type: String,
        required: false,
    },
    razorpayOrderId: {
        type: String,
        default:'',
        required: false,
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
