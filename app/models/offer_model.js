const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    offer_code : String ,
    offer_value : String , //in % exmple : 20 => 20%
    create_date : String ,
    expire_time : String ,
    status : {type:Boolean , default: true} ,
});
const OfferModel = mongoose.model('offer', schema);
module.exports = OfferModel;