const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    phone: String,
    create_date: String,
    final_date: String,
    type: String,
    info: String,
    status : {type : String , default : "در حال بررسی"} ,
    money_status : {type : String , default : "پرداخت نشده"} ,
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member' ,
    },
});


const Help_requestModel = mongoose.model('help_request', schema);

module.exports = Help_requestModel;