const mongoose = require("mongoose");
const schema_comment = new mongoose.Schema({
    name: { type: String, required: true },
    text: { type: String, required: true },
    create_date : String ,
    father_id : String ,
    status : {type : String , default : "not_accepted"}
})
const schema_item = new mongoose.Schema({
    name: { type: String, unique: true },
    type: String,
    class: String,
    x: String,
    y: String,
    price: String,
    info: String,
    picture: String,
    create_date: String,
    salesNumber: { type: Number, default: 0 },
    comment: [schema_comment],
});
const ItemModel = mongoose.model('items', schema_item);
module.exports = ItemModel;