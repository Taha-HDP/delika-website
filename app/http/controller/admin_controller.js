const Shop = require("../../models/shop_model");
const Customer = require("../../models/customer_model");
const Requests = require("../../models/help_request_model");
const Payment = require("../../models/payment_model");
const Site_data = require("../../models/site_data_model");
const Offer = require("../../models/offer_model");
const Course = require("../../models/course_model");
const Self_request = require("../../models/self_request_model");
const Course_payment = require("../../models/course_payment_model");
const dateTime = require('node-datetime');
const fs = require("fs");
module.exports = new (class Admin_controller {
    async all_data(req, res) {
        const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
        const customers = await Customer.find();
        const items = await Shop.find();
        const request = await Requests.find();
        const done_request = await Requests.find({ status: "انجام شده" });
        const waiting_request = (request.length - done_request.length);

        let request_counter = 0;
        for (var i = 0; i < request.length; i++) {
            let new_date = dateTime.create().format('Y-m-d');
            let space1 = diffDays(new Date(request[i].create_date), new Date(new_date));
            if (space1 < 7) {
                request_counter++;
            }
        }
        let new_item_counter = 0;
        for (var i = 0; i < items.length; i++) {
            let new_date = dateTime.create().format('Y-m-d');
            let space2 = diffDays(new Date(items[i].create_date), new Date(new_date));
            if (space2 < 7) {
                new_item_counter++;
            }
        }
        let new_member_counter = 0;
        for (var i = 0; i < customers.length; i++) {
            let new_date = dateTime.create().format('Y-m-d');
            let space3 = diffDays(new Date(customers[i].create_date), new Date(new_date));
            if (space3 < 7) {
                new_member_counter++;
            }
        }
        const saledItems = await Payment.find({
            succes: true
        });
        let new_saled_counter = 0;
        for (var i = 0; i < saledItems.length; i++) {
            let new_date = dateTime.create().format('Y-m-d');
            let space4 = diffDays(new Date(saledItems[i].date), new Date(new_date));
            if (space4 < 7) {
                new_saled_counter++;
            }
        }
        const item = await Shop.find(
            { comment: { $elemMatch: { status: "not_accepted" } } }
        );
        let comment_list = [];
        for (var i = 0; i < item.length; i++) {
            for (var j = 0; j < item[i].comment.length; j++) {
                if (item[i].comment[j].status == "not_accepted") {
                    comment_list.push(item[i].comment[j]);
                }
            }
        }
        const body = {
            customers: customers.length,
            items: items.length,
            requests: request.length,
            done_requests: done_request.length,
            waiting_requests: waiting_request,
            new_requests: request_counter,
            added_items: new_item_counter,
            new_members: new_member_counter,
            saled_items: saledItems.length,
            new_saled_items: new_saled_counter,
            waiting_comments: comment_list.length,
        }
        res.send(body);
    }
    async site_data(req, res) {
        const result = await Site_data.findOne({
            type: "base"
        });
        if (!result)
            return res.status(404).send();
        res.send(result);
    }
    async edit_site_data(req, res) {
        let result = await Site_data.findOne({
            type: "base"
        });
        if (!result)
            return res.status(404).send();
        switch (req.body.type) {
            case "siteEmail":
                result.email = req.body.data;
                break;
            case "siteInstagram":
                result.instagram = req.body.data;
                break;
            case "sitePhone":
                result.phone = req.body.data;
                break;
            case "siteAdresss":
                result.address = req.body.data;
                break;
            case "sitePhone2":
                result.phone_2 = req.body.data;
                break;
            case "siteAdresss2":
                result.address_2 = req.body.data;
                break;
            case "sitePhone3":
                result.phone_3 = req.body.data;
                break;
            case "sitePhone4":
                result.phone_4 = req.body.data;
                break;
            case "siteAdresss3":
                result.address_3 = req.body.data;
                break;
            case "localTransport":
                result.local_transport = req.body.data;
                break;
            case "globalTransprot":
                result.global_transport = req.body.data;
                break;
            case "about_delika":
                result.about = req.body.data;
                break;
        }
        await result.save();
        res.send(result);
    }
    //---- member section
    async member_list(req, res) {
        const customers = await Customer.find();
        res.send(customers);
    }
    async member_detail(req, res) {
        const customers = await Customer.findById(req.body.id);
        if (!customers)
            res.status(404).send();

        res.send(customers);
    }
    async change_role(req, res) {
        if (req.user.super_role != true)
            return res.status(401).send();
        let member = await Customer.findById(req.params.id);
        member.role = req.body.role;
        member.save();
        await res.status(200).send();
    }
    //---- item section
    async getItemList(req, res) {
        const items = await Shop.find().select("-comment");
        res.send(items);
    }
    async add_new_item(req, res) {
        const uniqe = await Shop.findOne({ name: req.body.name });
        if (uniqe) {
            return res.status(400).send("قبلا ثبت شده");
        }
        const new_item = new Shop({
            name: req.body.name,
            type: req.body.type,
            class: req.body.class,
            price: req.body.price,
            x: req.body.x,
            y: req.body.y,
            info: req.body.info,
            picture: req.file.path,
            create_date: dateTime.create().format('Y-m-d'),
        });
        await new_item.save();
        res.send('new item added');
    }
    async edit_itemP(req, res) {
        const item = await Shop.findById(req.params.id)
        item.name = req.body.name;
        item.type = req.body.type;
        item.class = req.body.class;
        item.price = req.body.price;
        item.x = req.body.x;
        item.y = req.body.y;
        item.info = req.body.info;
        if (req.file.path) {
            const pathToFile = item.picture;
            fs.unlinkSync(pathToFile, (err) => {
                if (err) {
                    res.status(400).send();
                }
            })
            item.picture = "";
        }
        item.picture = req.file.path;
        await item.save();
        res.status(200).send();
    }
    async edit_item(req, res) {
        const item = await Shop.findById(req.params.id)
        item.name = req.body.name;
        item.type = req.body.type;
        item.class = req.body.class;
        item.price = req.body.price;
        item.x = req.body.x;
        item.y = req.body.y;
        item.info = req.body.info;
        await item.save();
        res.status(200).send("");
    }
    async delete_item(req, res) {
        const id = req.params.id;
        let item = await Shop.findById(id);
        const pathToFile = item.picture;
        fs.unlinkSync(pathToFile, function (err) {
            if (err) {
                throw err
            }
        })
        await Shop.findByIdAndRemove(id);
        res.status(200).send();
    }
    async getItem(req, res) {
        const item = await Shop.findById(req.params.id);
        res.send(item);
    }
    async findItem(req, res) {
        let item = await Shop.find({ name: req.body.wanted });
        if (item.length == 0) {
            item = await Shop.find({ type: req.body.wanted });
            if (item.length == 0) {
                item = await Shop.find({ class: req.body.wanted });
                if (item.length == 0) {
                    if (req.body.wanted.match(/^[0-9a-fA-F]{24}$/)) { //its validate for object id
                        item = await Shop.find({ _id: req.body.wanted });
                    }
                    if (item.length == 0) {
                        res.status(200).send();
                    } else {
                        res.send(item);
                    }
                } else {
                    res.send(item);
                }
            } else {
                res.send(item);
            }
        } else {
            res.send(item);
        }
    }
    //----- admin role
    async check_admin(req, res) {
        res.status(200).send();
    }
    async check_super_admin(req, res) {
        const body = {
            role: req.user.super_role,
            id: req.user._id
        }
        res.send(body);
    }
    //----- help request
    async help_request_list(req, res) {
        const requests = await Requests.find();
        res.send(requests);
    }
    async help_request_edit(req, res) {
        const requests = await Requests.findById(req.body.id);
        requests.status = req.body.status;
        requests.final_date = req.body.final_date;
        requests.money_status = req.body.money_status;
        await requests.save();
        res.status(200).send();
    }
    //----- self request
    async self_request_list(req, res) {
        const requests = await Self_request.find();
        res.send(requests);
    }
    async self_request_edit(req, res) {
        const requests = await Self_request.findById(req.body.id);
        requests.status = req.body.status;
        await requests.save();
        res.send();
    }
    async get_self_request(req, res) {
        const request = await Self_request.findById(req.params.id);
        if (!request)
            return res.status(404).send();
        res.send(request);
    }
    async find_self_request(req, res) {
        let request = await Self_request.find({ username: req.params.id });
        if (request.length == 0) {
            request = await Self_request.find({ name: req.params.id });
            if (request.length == 0) {
                if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) { //its validate for object id
                    request = await Self_request.find({ _id: req.params.id });
                }
                if (request.length == 0) {
                    request = await Self_request.find({ member_id: req.params.id });
                    if (request.length == 0) {
                        res.status(200).send();
                    } else {
                        res.send(request);
                    }
                } else {
                    res.send(request);
                }
            } else {
                res.send(request);
            }
        } else {
            res.send(request);
        }
    }
    //----- orders & payments
    async getOrdersList(req, res) {
        const orders = await Payment.find({
            succes: true
        });
        if (!orders)
            return res.status(404).send();
        res.send(orders);
    }
    async changeOrderStatus(req, res) {
        const order = await Payment.findById(req.params.id);
        if (!order)
            return res.status(404).send();
        order.status = req.body.status;
        await order.save();
        res.status(200).send();
    }
    async findPayment(req, res) {
        let payment = await Payment.find({ refID: req.params.id });
        if (payment.length == 0) {
            payment = await Payment.find({ buyer_name: req.params.id });
            if (payment.length == 0) {
                if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) { //its validate for object id
                    payment = await Payment.find({ _id: req.params.id });
                }
                if (payment.length == 0) {
                    payment = await Payment.find({ member_id: req.params.id });
                    if (payment.length == 0) {
                        res.status(200).send();
                    } else {
                        res.send(payment);
                    }
                } else {
                    res.send(payment);
                }
            } else {
                res.send(payment);
            }
        } else {
            res.send(payment);
        }
    }
    //----- comments
    async comment_list(req, res) {
        const item = await Shop.find(
            { comment: { $elemMatch: { status: "not_accepted" } } }
        );
        let comment_list = [];
        for (var i = 0; i < item.length; i++) {
            for (var j = 0; j < item[i].comment.length; j++) {
                if (item[i].comment[j].status == "not_accepted") {
                    comment_list.push(item[i].comment[j]);
                }
            }
        }
        res.send(comment_list);
    }
    async accept_comment(req, res) {
        const item = await Shop.find(
            { comment: { $elemMatch: { _id: req.params.id } } }
        );
        for (var i = 0; i < item.length; i++) {
            for (var j = 0; j < item[i].comment.length; j++) {
                if (item[i].comment[j]._id == req.params.id) {
                    item[i].comment[j].status = "accepted";
                    await item[i].save();
                    return res.status(200).send();
                }
            }
        }
    }
    async delete_comment(req, res) {
        await Shop.updateMany(
            {},
            { $pull: { comment: { _id: req.params.id } } }
        );
        res.status(200).send();
    }
    //------ offers
    async create_offer(req, res) {
        var randomString = function (length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
        let random_code;
        if (req.body.code) {
            random_code = req.body.code;
        } else {
            random_code = randomString(7);
        }
        const offer = new Offer({
            offer_code: random_code,
            offer_value: req.body.value,
            create_date: dateTime.create().format('Y-m-d'),
            expire_time: req.body.time,
        })
        await offer.save();
        res.send(offer.offer_code);
    }
    async offer_list(req, res) {
        const offers = await Offer.find();
        if (!offers)
            return res.status(404).send();
        res.send(offers);
    }
    //------ courses
    async create_course(req, res) {
        const uniqe = await Course.findOne({ name: req.body.name });
        if (uniqe) {
            return res.status(400).send();
        }
        const new_item = new Course({
            name: req.body.name,
            type: req.body.type,
            length: req.body.length,
            price: req.body.price,
            teacher: req.body.teacher,
            time: req.body.time,
            info: req.body.info,
            picture: req.file.path,
            status: "waiting",
            hours: req.body.hours,
            members: 0,
            place: req.body.place,
            start_date: req.body.start_date,
        });
        await new_item.save();
        res.send('new item added');
    }
    async course_list(req, res) {
        const courses = await Course.find();
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
    async edit_course(req, res) {
        const item = await Course.findById(req.params.id);
        item.name = req.body.name;
        item.type = req.body.type;
        item.length = req.body.length;
        item.price = req.body.price;
        item.teacher = req.body.teacher;
        item.time = req.body.time;
        item.info = req.body.info;
        item.hours = req.body.hours;
        item.place = req.body.place;
        item.start_date = req.body.start_date;
        await item.save();
        res.status(200).send("");
    }
    async edit_courseP(req, res) {
        const item = await Course.findById(req.params.id);
        item.name = req.body.name;
        item.type = req.body.type;
        item.length = req.body.length;
        item.price = req.body.price;
        item.teacher = req.body.teacher;
        item.time = req.body.time;
        item.info = req.body.info;
        item.hours = req.body.hours;
        item.place = req.body.place;
        item.start_date = req.body.start_date;
        if (req.file.path) {
            const pathToFile = item.picture;
            fs.unlinkSync(pathToFile, (err) => {
                if (err) {
                    res.status(400).send();
                }
            })
            item.picture = "";
        }
        item.picture = req.file.path;
        await item.save();
        res.status(200).send();
    }
    async course_status(req, res) {
        const course = await Course.findById(req.params.id);
        if (!course)
            return res.status(404).send();
        course.status = req.body.status;
        await course.save();
        res.send();
    }
    async course_payments(req, res) {
        const payment = await Course_payment.find({
            succes: true
        });
        res.send(payment);
    }
    async findCourse(req, res) {
        const course = await Course_payment.find({
            refID: req.params.refID
        });
        res.send(course);
    }
    //---- reset cath
    async clear_catch() {
        const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
        const all_payments = await Payment.find();
        let space = diffDays(new Date(all_payments.create_date), new Date(new_date));
        if (space > all_payments.expire_time) {
            all_payments.status = false
        }
        await all_payments.save();
        const payments = await Offer.find({
            status: false
        });
        const offers = await Offer.find({
            status: false
        });
        if (payments && payments.length > 0) {
            for (let i = 0; i < payments.length; i++) {
                await Payment.findByIdAndRemove(payments[i]._id);
            }
        }
        if (offers && offers.length > 0) {
            for (let i = 0; i < offers.length; i++) {
                await Offer.findByIdAndRemove(offers[i]._id);
            }
        }
        console.log("all failed payments & offer deleted")
    }
});


