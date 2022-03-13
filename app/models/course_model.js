const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    price: String,
    type: String,
    length: String,
    time: String,
    info : String ,
    picture : String ,
    teacher : String ,
    members : Number ,
    hours : String ,
    place : String ,
    start_date: String,
    status : String  ,
});

const CourseModel = mongoose.model('course', schema);

module.exports = CourseModel;