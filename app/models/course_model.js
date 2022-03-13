const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    price: String,
    type: String,
    length: String,
    time: String,
    info: String,
    picture: String,
    teacher: String,
    members: { type: Number, default: 0 },
    hours: String,
    place: String,
    start_date: String,
    status: String,
    members_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member',
    }]
});

const CourseModel = mongoose.model('course', schema);

module.exports = CourseModel;