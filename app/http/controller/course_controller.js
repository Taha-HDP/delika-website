const Customer = require("../../models/customer_model");
const Payment = require("../../models/course_payment_model");
const Course = require("../../models/course_model");
const dateTime = require('node-datetime');
const config = require("config");
const jwt = require("jsonwebtoken");
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create(config.get("zarinpal_number"), true);
module.exports = new (class Course_controller {
    async courses(req, res) {
        const courses = await Course.find({
            type: req.params.type,
            status: "waiting"
        });
        if (!courses)
            return res.status(404).send();
        res.send(courses);
    }
    async get_course(req, res) {
        let course = await Course.findById(req.params.id);
        if (!course)
            return res.status(404).send();
        const token = req.header("x-auth-token");
        let user, history;
        if (token) {
            try {
                user = jwt.verify(token, config.get("jwtPrivetKey"));
                for (let i = 0; i < course.members_id.length; i++) {
                    if (user._id == course.members_id[i]) {
                        history = "false";
                        break;
                    }
                }
            } catch (error) {
                history = "true";
            }
        }
        const body = {
            course,
            history: history
        }
        res.send(body);
    }
    async enrolling_class(req, res) {
        const course = await Course.findById(req.params.id);
        if (!course)
            return res.status(404).send();
        if (course.status == "done" || course.status == "ongoing")
            return res.status(400).send();
        const user = await Customer.findById(req.user._id);
        if (!user)
            return res.status(404).send();
        const callBack = config.get("domain")+"/bill_result.html?for=course" ;
        const result = await zarinpal.PaymentRequest({
            Amount: parseInt(course.price),
            CallbackURL: callBack,
            Description: 'پرداخت دلیکا',
            Email: user.email,
            Mobile: user.phone,
        });
        const payment = new Payment({
            buyer_name: user.username,
            total_price: parseInt(course.price),
            date: dateTime.create().format('Y-m-d'),
            course_id: course._id,
            member_id: user._id,
            payment_code: result.authority,
        });
        await payment.save();
        res.send(result.url);
    }
    async verification(req, res) {
        const payment_code = req.query.Authority;
        const status = req.query.Status;
        const payment = await Payment.findOne({
            payment_code
        });
        if (status === "OK") {
            const result = await zarinpal.PaymentVerification({
                Amount: payment.total_price,
                Authority: payment_code,
            });
            if (result.status === -21) {
                return res.send("پرداخت پیدا نشد")
            } else {
                payment.refID = result.RefID;
                payment.succes = "true";
                await payment.save();
                const course = await Course.findById(payment.course_id);
                course.members++;
                course.members_id.push(req.user._id);
                await course.save();
                res.send(payment);
            }
        } else {
            res.send(payment);
        }
    }
});


