const { validationResult } = require("express-validator");

const Course = require("../models/course.model");

const httpStatusText = require("../utils/httpStatusText");

const asyncWrapper = require("../middlewares/asyncWrapper")

const AppError = require("../utils/appError");

const getAllCourses = asyncWrapper(
    async (req, res)=>{
        let page = +req.query.page || 1;
        let limit = +req.query.limit || 2;
        let skip = (page - 1) * limit;
        const courses = await Course.find({}, {__v: false}).limit(limit).skip(skip);
        res.json({status: httpStatusText.SUCCESS, data: {courses}})
    }
)

const getCourse = asyncWrapper(
    async (req, res, next)=>{
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if(!course) {
            const error = AppError.create("Course not found", 404, httpStatusText.FAIL)
            return next(error);
        }
        return res.json({status: httpStatusText.SUCCESS, data: {course}})
    }
)

const addCourse = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const error = AppError.create(errors.array(), 400, httpStatusText.FAIL)
            return next(error);
        }
        const newCourse = new Course(req.body);
        await newCourse.save()
        return res.status(201).json({status: httpStatusText.SUCCESS, data: {course: newCourse}})
    }
)

const updateCourse =  asyncWrapper(
    async (req, res, next) => {
        const courseId = req.params.courseId;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const error = AppError.create(errors.array(), 400, httpStatusText.FAIL)
            return next(error);
        }
        const course = await Course.findByIdAndUpdate(courseId, {$set: {...req.body}}, {new: true});
        if(course) {
            return res.status(200).json({status: httpStatusText.SUCCESS, data: {course}})
        } else {
            const error = AppError.create("Course  not found", 404, httpStatusText.FAIL)
            return next(error);
        }
    }
)

const deleteCourse = asyncWrapper(
    async (req, res, next)=>{
        const courseId = req.params.courseId;
        const deletedCourse = await Course.deleteOne({_id: courseId});
        if(deletedCourse.deletedCount) {
            return res.status(200).json({status: httpStatusText.SUCCESS, data: null})
        } else {
            const error = AppError.create("Course  not found", 404, httpStatusText.FAIL)
            return next(error);
        }
    }
)

module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}