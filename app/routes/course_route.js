const express = require("express");
const router = express.Router();
const Course_controller = require("../http/controller/course_controller");
const auth = require("../http/middleware/auth");

router.get("/courses/:type", Course_controller.courses);
router.get("/course_detail/:id", Course_controller.get_course);
router.get("/courses/enrolling_class/:id", auth, Course_controller.enrolling_class);
router.get("/course/verification", auth, Course_controller.verification);
module.exports = router;