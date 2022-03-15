const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name: String,
    type: String,
    x: String,
    y: String,
    picture: String,
    info: String,
    send_date: String,
    status: { type: String, default: "checking" },
    member_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member',
    }
});
const RequestModel = mongoose.model('self_request', schema);
module.exports = RequestModel;