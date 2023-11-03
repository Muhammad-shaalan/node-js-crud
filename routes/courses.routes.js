const express = require("express");
const router = express.Router();

const validationSchema = require("../validations/courses.validations");


let courseController = require("../controllers/courses.controller");


router.route("/")
    .get(courseController.getAllCourses)
    .post(validationSchema(), courseController.addCourse);

router.route("/:courseId")
    .get(courseController.getCourse)
    .patch(validationSchema(), courseController.updateCourse)
    .delete(courseController.deleteCourse)


module.exports = router;