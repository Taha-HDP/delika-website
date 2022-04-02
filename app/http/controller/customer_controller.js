const Customer = require("../../models/customer_model");
const Shop = require("../../models/shop_model");
const Request = require("../../models/help_request_model");
const Payment = require("../../models/payment_model");
const Self_request = require("../../models/self_request_model");
const Offer = require("../../models/offer_model");
const Site_data = require("../../models/site_data_model");
const bcrypt = require("bcrypt");
const dateTime = require('node-datetime');
const Course_payment = require("../../models/course_payment_model");
const Course = require("../../models/course_model");
module.exports = new (class Customer_controller {
    async site_data(req, res) {
        const data = await Site_data.find();
        res.send(data[0]);
    }

    async register(req, res) {
        const user_phone = await Customer.findOne({ phone: req.body.phone });
        const user_email = await Customer.findOne({ email: req.body.email });
        const user_username = await Customer.findOne({ username: req.body.username });
        if (user_phone || user_username || user_email) {
            return res.status(400).send("قبلا ثبت شده");
        }
        const newMember = new Customer({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            gender: req.body.gender,
            phone: req.body.phone,
            birth: req.body.birth,
            create_date: dateTime.create().format('Y-m-d'),
        });
        const salt = await bcrypt.genSalt(10);
        const new_pass = await bcrypt.hash(req.body.password, salt);
        newMember.password = new_pass;
        await newMember.save();
        const token = newMember.createAuthToken();
        res.header("Access-Control-Expose-headers", "x-auth-token").header("x-auth-token", token).send();
    }
    async login(req, res) {
        const userA = await Customer.findOne({ username: req.body.username });
        const userB = await Customer.findOne({ phone: req.body.username });
        if (userA) {
            const result = await bcrypt.compare(req.body.password, userA.password);
            if (!result) {
                return res.status(404).send("کاربری با این نام یا پسوورد یافت نشد");
            }
            const token = userA.createAuthToken();
            res.header("Access-Control-Expose-headers", "x-auth-token").header("x-auth-token", token).send();
        } else if (userB) {
            const result = await bcrypt.compare(req.body.password, userB.password);
            if (!result) {
                return res.status(404).send("کاربری با این نام یا پسوورد یافت نشد");
            }
            const token = userB.createAuthToken();
            res.header("Access-Control-Expose-headers", "x-auth-token").header("x-auth-token", token).send();
        } else {
            return res.status(404).send("کاربری با این نام یا پسوورد یافت نشد");
        }



    }
    async forgetPassword(req, res) {
        const user = await Customer.findOne({ phone: req.body.phone });
        if (!user) res.status(404).send("کاربری با این شماره یافت نشد");
        const code = Math.floor(1000 + Math.random() * 9000);
        res.status(200).send({ code });
    }
    async member_info(req, res) {
        let user = await Customer.findById(req.user._id);
        if (!user) return res.status(404).send("کاربر مورد نظر یافت نشد");
        res.send(user);
    }
    async edit_member_info(req, res) {
        let user = await Customer.findById(req.user._id);
        if (!user) return res.status(404).send("کاربر مورد نظر یافت نشد");
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.username = req.body.username;
        user.email = req.body.email;
        user.gender = req.body.gender;
        user.phone = req.body.phone;
        user.address = req.body.address;
        user.birth = req.body.birth;
        await user.save((err) => {
            if (err) {
                return res.status(400).send();
            } else {
                res.status(200).send();
            }
        });

    }
    async change_password(req, res) {
        let user = await Customer.findById(req.user._id);
        if (!user) return res.status(404).send("کاربر مورد نظر یافت نشد");
        const result = await bcrypt.compare(req.body.current, user.password);
        if (!result) {
            return res.status(404).send("کاربری با این پسوورد یافت نشد");
        } else {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.new_password, salt);
            await user.save((err) => {
                if (err) {
                    return res.status(400).send();
                } else {
                    res.status(200).send();
                }
            });
        }
    }
    async newPassword(req, res) {
        let user = await Customer.findOne({ phone: req.body.phone });
        if (!user)
            res.status(404).send("کاربر مورد نظر یافت نشد");
        const salt = await bcrypt.genSalt(10);
        const new_pass = await bcrypt.hash(req.body.password, salt);
        user.password = new_pass;
        await user.save((err) => {
            if (err) {
                return res.status(400).send();
            } else {
                res.status(200).send();
            }
        });
    }
    async request_data(req, res) {
        let user = await Customer.findById(req.user._id);
        if (!user) return res.status(404).send("کاربر مورد نظر یافت نشد");
        if (user.first_name && user.last_name) {
            const data = {
                phone: user.phone,
                name: user.first_name + " " + user.last_name,
            }
            return res.send(data);
        } else {
            const data = {
                phone: user.phone,
                name: "",
            }
            return res.send(data);
        }
    }
    async send_request(req, res) {
        let check = false;
        let user = await Customer.findById(req.user._id);
        if (!user) return res.status(404).send("کاربر مورد نظر یافت نشد");
        const result = await Request.find({ person: user._id });
        if (result) {
            result.map((item) => {
                if (item.status != "انجام شده") {
                    check = true;
                    return res.status(406).send();
                }
            })
        }
        if (check == false) {
            const new_request = new Request({
                name: req.body.name,
                phone: req.body.phone,
                create_date: dateTime.create().format('Y-m-d'),
                final_date: "در انتظار تماس",
                type: req.body.type,
                info: req.body.info,
                person: user._id,
            });
            await new_request.save();
            user.requests.push(new_request._id);
            await user.save();
            res.status(200).send();
        } else {
            return res.status(406).send();
        }

    }
    async help_request_list(req, res) {
        let user = await Customer.findById(req.user._id);
        if (!user) return res.status(404).send("کاربر مورد نظر یافت نشد");
        const requests = await Request.find({ person: user._id });
        res.send(requests);
    }
    async self_request_list(req, res) {
        const requests = await Self_request.find();
        res.send(requests);
    }
    async self_request_detail(req, res) {
        const request = await Self_request.findById(req.params.id);
        if (!request)
            return res.status(404).send();
        res.send(request);
    }
    async orderList(req, res) {
        const user = await Customer.findById(req.user._id);
        if (!user)
            return res.status(404).send();
        const orders = await Payment.find({
            member_id: user._id,
            succes: true
        });
        res.send(orders);
    }
    async orderDetail(req, res) {
        const user = await Customer.findById(req.user._id);
        if (!user)
            return res.status(404).send();
        const order = await Payment.findById(req.params.id);
        if (!order)
            return res.status(404).send();
        let Items = [];
        for (let i = 0; i < order.item_id.length; i++) {
            Items.push(await Shop.findById(order.item_id[i]))
        }
        const body = {
            name: order.buyer_name,
            address: order.address,
            post_code: order.post_code,
            refID: order.refID,
            shipping_cost: order.shipping_cost,
            total_price: order.total_price,
            offer: order.offer,
            items: Items,
            date: order.date,
            status: order.status,
        }
        res.send(body);
    }
    async my_course(req, res) {
        const courses = await Course_payment.find({
            member_id: req.user._id,
            succes: true
        });
        let course = [];
        if (courses) {
            for (let i = 0; i < courses.length; i++) {
                const air = await Course.findById(courses[i].course_id);
                if (air) {
                    course.push(air);
                }
            }
        }
        res.send(course);
    }
});


