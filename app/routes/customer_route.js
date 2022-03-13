const express = require("express");
const router = express.Router();
const Customer_controller = require("../http/controller/customer_controller");
const auth = require("../http/middleware/auth");

router.get("/profile/detail" , auth , Customer_controller.member_info) ;
router.put("/profile/edit" , auth , Customer_controller.edit_member_info) ;
router.put("/profile/changePassword" , auth , Customer_controller.change_password) ;
router.get("/profile/help_request_list", auth , Customer_controller.help_request_list);
router.post("/register", Customer_controller.register);
router.post("/login", Customer_controller.login);
router.post("/forgetPassword", Customer_controller.forgetPassword);
router.put("/newPassword", Customer_controller.newPassword);

router.get("/requestData" , auth , Customer_controller.request_data) ;
router.post("/sendRequest", auth ,Customer_controller.send_request);

router.get("/profile/orders", auth , Customer_controller.orderList);
router.get("/profile/orders/:id", auth , Customer_controller.orderDetail);

router.get("/profile/my_course", auth , Customer_controller.my_course);

module.exports = router;