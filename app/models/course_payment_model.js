const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    buyer_name : String ,
    payment_code: String,
    succes: { type: Boolean, default: false },
    refID: String,
    total_price: Number,
    date: String,
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
    },
    member_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member',
    }
});
const Course_paymentModel = mongoose.model('course_payment', schema);
module.exports = Course_paymentModel;