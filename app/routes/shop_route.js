const express = require("express");
const router = express.Router();
const Shoping_controller = require("../http/controller/shop_controller");
const auth = require("../http/middleware/auth");
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/public/image')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage });

router.post("/items", Shoping_controller.get_item_list);
router.post("/sorted_items", Shoping_controller.getSortList);
router.post("/items/addComment/:id", Shoping_controller.add_comment);
router.get("/items/:id", Shoping_controller.get_one_item);
router.post("/items/findItem", Shoping_controller.findeItem);

router.post("/basket/checkOut", auth, Shoping_controller.check_out);
router.get("/payment/verification", Shoping_controller.verification);
router.post("/payment/factor", Shoping_controller.factor);
router.post("/payment/offer_check/:code", Shoping_controller.check_offer);

router.post("/shop/sendSelfRequest", [auth, upload.single("picture")], Shoping_controller.send_self_request);

module.exports = router;