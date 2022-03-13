const Customer = require("../../models/customer_model");
const Payment = require("../../models/payment_model");
const Offer = require("../../models/offer_model");
const Course = require("../../models/course_model");
const dateTime = require('node-datetime');
module.exports = new (class Course_controller {
    async courses(req, res) {
        const courses = await Course.find({
            type: req.params.type
        });
        if (!courses)
            return res.status(404).send();
        res.send(courses);
    }
    async get_course(req, res) {
        const course = await Course.findById(req.params.id);
        if (!course)
            return res.status(404).send();
        res.send(course);
    }
    async enrolling_class(req,res){
        
    }
});


