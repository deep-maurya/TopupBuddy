const { model, Schema } = require("mongoose");

const WalletSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    walletBalance: { 
        type: Number,
        required: true,
        default: 0,
    }
});

WalletSchema.methods.checkBalance = function (amount) {
    return this.walletBalance >= amount;
};

const Wallet = model("Wallet", WalletSchema);

module.exports = {
    Wallet
};
