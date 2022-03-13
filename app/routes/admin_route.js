const multer = require("multer");
const express = require("express");
const router = express.Router();
const Admin_controller = require("../http/controller/admin_controller");
const auth = require("../http/middleware/auth");
const admin = require("../http/middleware/admin");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/public/image')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage });

router.get("/admin/site_setting", [auth, admin], Admin_controller.site_data);
router.put("/admin/site_setting", [auth, admin], Admin_controller.edit_site_data);
router.get("/admin/allData", [auth, admin], Admin_controller.all_data);
//---- members
router.get("/admin/memberList", [auth, admin], Admin_controller.member_list);
router.post("/admin/memberdetail", [auth, admin], Admin_controller.member_detail);
router.put("/super_admin/change_role/:id", [auth, admin], Admin_controller.change_role);
//----- requests
router.get("/admin/help_request_list", [auth, admin], Admin_controller.help_request_list);
router.put("/admin/help_request_edit", [auth, admin], Admin_controller.help_request_edit);
//----- items section
router.get("/admin/items", [auth, admin], Admin_controller.getItemList);
router.get("/admin/orders", [auth, admin], Admin_controller.getOrdersList);
router.get("/admin/orders/:id", [auth, admin], Admin_controller.findPayment);
router.put("/admin/orders/:id", [auth, admin], Admin_controller.changeOrderStatus);
router.get("/admin/item/:id", [auth, admin], Admin_controller.getItem);
router.post("/admin/add_new_item", [auth, admin, upload.single("picture")], Admin_controller.add_new_item);
router.post("/admin/findItem", [auth, admin], Admin_controller.findItem);
router.put("/admin/edit_item/:id", [auth, admin], Admin_controller.edit_item);
router.put("/admin/edit_itemP/:id", [auth, admin, upload.single("picture")], Admin_controller.edit_itemP);
router.delete("/admin/remove_item/:id", [auth, admin], Admin_controller.delete_item);
//----- comment section
router.get("/admin/comments", [auth, admin], Admin_controller.comment_list);
router.put("/admin/comments/:id", [auth, admin], Admin_controller.accept_comment);
router.delete("/admin/comments/:id", [auth, admin], Admin_controller.delete_comment);
//----- admin auth
router.get("/admincheck", [auth, admin], Admin_controller.check_admin);
router.get("/superAdmincheck", [auth, admin], Admin_controller.check_super_admin);
//------ offers
router.post("/admin/newOffer", [auth, admin], Admin_controller.create_offer);
router.get("/admin/offers", [auth, admin], Admin_controller.offer_list);
//----- courses
router.get("/admin/courses", [auth, admin], Admin_controller.course_list);
router.get("/admin/coursedetail/:id", [auth, admin], Admin_controller.get_course);
router.post("/admin/create_course", [auth, admin, upload.single("picture")], Admin_controller.create_course);
router.put("/admin/edit_course/:id", [auth, admin], Admin_controller.edit_course);
router.put("/admin/edit_courseP/:id", [auth, admin, upload.single("picture")], Admin_controller.edit_courseP);

router.get("/admin/clear_catch", Admin_controller.clear_catch);
module.exports = router;