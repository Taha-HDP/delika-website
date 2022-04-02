const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    type: String,
    instagram: { type: String, default: "@instagram_id" },
    instagramLink: { type: String, default: "#" },
    email: { type: String, default: "your_email.address@gmail.com" },
    phone: { type: String, default: "+98-9*********" },
    current_country: { type: String, default: "Irean" },
    address: { type: String, default: "country - city - street - ..." },
    local_transport: { type: String, default: "1000" },
    global_transport: { type: String, default: "2000" },
    phone_2: { type: String, default: "+98-9*********" },
    address_2: { type: String, default: "country - city - street - ..." },
    about: { type: String, default: "write your website info and ..." },
});
const site_dataModel = mongoose.model('site_data', schema);
module.exports = site_dataModel;