const Shop = require("../../models/shop_model");
const Customer = require("../../models/customer_model");
const dateTime = require('node-datetime');
const Payment = require("../../models/payment_model");
const Site_data = require("../../models/site_data_model");
const Offer = require("../../models/offer_model");
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('00000000-0000-0000-0000-000000000000', true);
module.exports = new (class Shoping_controller {
    async get_item_list(req, res) {
        if (req.body.type) {
            const items = await Shop.find({ type: req.body.type }).select("-comment");
            return res.send(items);
        } else {
            const items = await Shop.find().select("-comment");
            return res.send(items);
        }
    }
    async getSortList(req, res) {
        const items = await Shop.find({ class: req.body.class, type: req.body.type }).select("-comment");
        res.send(items);
    }
    async get_one_item(req, res) {
        const id = req.params.id;
        const item = await Shop.findById(id);
        if (!item) return res.status(404).send("item not found!");
        res.send(item);
    }
    async add_comment(req, res) {
        const id = req.params.id;
        const item = await Shop.findById(id);
        if (!item) return res.status(404).send("item not found!");
        const new_comment = {
            name: req.body.name,
            text: req.body.text,
            create_date: dateTime.create().format('Y-m-d'),
            father_id: item._id,
        }
        item.comment.push(new_comment);
        await item.save();
        res.status(200).send();
    }
    async findeItem(req, res) {
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
    async check_out(req, res) {
        const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
        const user = await Customer.findById(req.user._id);
        const transports = await Site_data.findOne({ type: "base" });
        if (!user)
            return res.status(404).send();
        let items = req.body.basket;
        if (items.length != 0) {
            let amount = 0;
            for (let i = 0; i < items.length; i++) {
                items[i] = await Shop.findById(items[i]);
                amount += parseInt(items[i].price);
            }
            let shipping_cost_money, offer_value = 0, offer_money;
            if (req.body.country == transports.current_country) {
                shipping_cost_money = parseInt(transports.local_transport);
            } else {
                shipping_cost_money = parseInt(transports.global_transport);
            }
            let save_offer = "";
            if (req.body.offer) {
                const offer_object = await Offer.findOne({
                    offer_code: req.body.offer
                });
                if (offer_object) {
                    let new_date = dateTime.create().format('Y-m-d');
                    let space = diffDays(new Date(offer_object.create_date), new Date(new_date));
                    if (space < offer_object.expire_time && offer_object.status == true) {
                        offer_value = offer_object.offer_value;
                        save_offer = offer_object._id;
                    } else {
                        offer_value = 0;
                    }
                } else {
                    offer_value = 0;
                }
                let air = amount + shipping_cost_money;
                offer_money = (offer_value * air) / 100;
            } else {
                offer_money = 0
            }
            const total_money = (amount + shipping_cost_money) - offer_money;
            const final_address = req.body.country + "-" + req.body.address;
            const result = await zarinpal.PaymentRequest({
                Amount: total_money,
                CallbackURL: 'http://localhost:3000/bill_result.html',
                Description: 'پرداخت دلیکا',
                Email: user.email,
                Mobile: user.phone,
            });
            const payment = new Payment({
                buyer_name: req.body.name,
                offer: offer_money,
                offer_code: save_offer,
                shipping_cost: shipping_cost_money,
                total_price: total_money,
                date: dateTime.create().format('Y-m-d'),
                post_code: req.body.post_code,
                address: final_address,
                item_id: req.body.basket,
                member_id: user._id,
                payment_code: result.authority,
            });
            //------ delete failed payments
            await Payment.findOneAndRemove({
                succes: false
            })
            //-----
            await payment.save();
            res.send(result.url);
        }
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
                if (payment.offer_code) {
                    const response = await Offer.findById(payment.offer_code);
                    response.status = false;
                    await response.save();
                }
                for (let i = 0; i < payment.item_id.length; i++) {
                    const shop_item = await Shop.findById(payment.item_id[i])
                    shop_item.salesNumber += 1;
                    await shop_item.save();
                }
                res.send(payment);
            }
        } else {
            setTimeout(async function () {
                await Payment.findOneAndRemove({
                    payment_code
                })
            }, 5 * 60 * 1000);
            res.send(paymnet);
        }
    }
    async factor(req, res) {
        const data = await Site_data.findOne({
            type: "base",
        });
        if (!data)
            return res.status(404).send();
        let shipping_cost_money, offer_money = 0;
        if (req.body.country) {
            if (req.body.country == data.current_country) {
                shipping_cost_money = parseInt(data.local_transport);
            } else {
                shipping_cost_money = parseInt(data.global_transport);
            }
        } else {
            shipping_cost_money = 0;
        }
        const body = {
            transport: shipping_cost_money,
        }
        res.send(body);
    }
    async check_offer(req, res) {
        const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
        let offer_money = 0;
        const offer_object = await Offer.findOne({
            offer_code: req.params.code
        });
        if (offer_object) {
            let new_date = dateTime.create().format('Y-m-d');
            let space = diffDays(new Date(offer_object.create_date), new Date(new_date));
            if (space < offer_object.expire_time && offer_object.status == true) {
                offer_money = offer_object.offer_value;
            } else {
                offer_money = 0;
            }
        } else {
            offer_money = 0;
        }
        res.send(`${offer_money}`);
    }
});


