const { validationResult } = require("express-validator");

const Course = require("../models/course.model");

const httpStatusText = require("../utils/httpStatusText");

const getAllCourses = async (req, res)=>{
    try {
        let page = +req.query.page || 1;
        let limit = +req.query.limit || 2;
        let skip = (page - 1) * limit;
        const courses = await Course.find({}, {__v: false}).limit(limit).skip(skip);
        res.json({status: httpStatusText.SUCCESS, data: {courses}})
    } catch(err) {
        res.status(400).json({status: httpStatusText.ERROR, data: null, message: err.message})
    }
}

const getCourse = async (req, res)=>{
    const courseId = req.params.courseId;
    try {
        const course = await Course.findById(courseId);
        if(course) {
            return res.json({status: httpStatusText.SUCCESS, data: {course}})
        } else {
            return res.status(404).json({status: httpStatusText.FAIL, data: {course}})
        }
    } catch(err) {
        res.status(400).json({status: httpStatusText.ERROR, data: null, message: err.message})
    }
}

const addCourse = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({status: httpStatusText.FAIL, data: {errors: errors.array()}})
    } else {
        const newCourse = new Course(req.body);
        await newCourse.save()
        return res.status(201).json({status: httpStatusText.SUCCESS, data: {course: newCourse}})
    }
}

const updateCourse =  async (req, res) => {
    const courseId = req.params.courseId;
    const errors = validationResult(req);
    try {
        if(!errors.isEmpty()) {
            return res.status(400).json({status: httpStatusText.FAIL, data: {errors: errors.array()}})
        } else {
            const course = await Course.findByIdAndUpdate(courseId, {$set: {...req.body}}, {new: true});
            if(course) {
                return res.status(200).json({status: httpStatusText.SUCCESS, data: {course}})
            } else {
                return res.status(404).json({status: httpStatusText.FAIL, data: {course}})
            }
        }
    } catch(err) {
        res.status(400).json({status: httpStatusText.ERROR, data: null, message: err.message})
    }
}

const deleteCourse = async (req, res)=>{
    const courseId = req.params.courseId;
    try {
        const deletedCourse = await Course.deleteOne({_id: courseId});
        console.log(deletedCourse);
        if(deletedCourse.deletedCount) {
            return res.status(200).json({status: httpStatusText.SUCCESS, data: null})
        } else {
            return res.status(404).json({status: httpStatusText.FAIL, data: {deletedCourse}})
        }
    } catch(err) {
        res.status(400).json({status: httpStatusText.ERROR, data: null, message: err.message})
    }
}


module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}