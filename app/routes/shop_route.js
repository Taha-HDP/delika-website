const express = require("express");
const router = express.Router();
const Shoping_controller = require("../http/controller/shop_controller");
const auth = require("../http/middleware/auth");

router.post("/items", Shoping_controller.get_item_list);
router.post("/sorted_items", Shoping_controller.getSortList);
router.post("/items/addComment/:id", Shoping_controller.add_comment);
router.get("/items/:id", Shoping_controller.get_one_item);
router.post("/items/findItem", Shoping_controller.findeItem);

router.post("/basket/checkOut", auth, Shoping_controller.check_out);
router.get("/payment/verification", Shoping_controller.verification);
router.post("/payment/factor", Shoping_controller.factor);
router.post("/payment/offer_check/:code", Shoping_controller.check_offer);
module.exports = router;