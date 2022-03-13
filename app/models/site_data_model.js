const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    type: String,
    instagram: String,
    email: String,
    phone: String,
    current_country : String ,
    address: String,
    local_transport: String,
    global_transport: String,
    phone_2: String,
    address_2: String,
    phone_3: String,
    phone_4: String , 
    about : String ,
});
const site_dataModel = mongoose.model('site_data', schema);
module.exports = site_dataModel;