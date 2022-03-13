const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    buyer_name : String ,
    offer_code : String ,
    offer: { type: Number, default: 0 },
    shipping_cost: { type: Number, default: 0 },
    status: { type: String, default: "در حال بررسی" },
    payment_code: String,
    succes: { type: Boolean, default: false },
    refID: String,
    total_price: Number,
    date: String,
    post_code: String,
    address: String,
    item_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
    }],
    member_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member',
    }
});
const PaymentModel = mongoose.model('payment', schema);
module.exports = PaymentModel;