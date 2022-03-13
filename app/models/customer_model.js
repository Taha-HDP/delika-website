const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const schema = new mongoose.Schema({
    username: { type: String, unique: true },
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    password: String,
    phone: { type: String, unique: true },
    gender: String,
    birth: String,
    role: { type: String, default: "user" },
    super_role : {type : Boolean , default : false} ,
    address: String,
    create_date: String,
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'help_request',
    }]
});

schema.methods.createAuthToken = function () {
    const data = {
        _id: this.id,
        name: this.username,
        role: this.role ,
        super_role : this.super_role ,
    }
    return jwt.sign(data, config.get("jwtPrivetKey"));
}
const MemberModel = mongoose.model('member', schema);

module.exports = MemberModel;