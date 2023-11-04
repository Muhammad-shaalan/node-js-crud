const { validationResult } = require("express-validator");

const Course = require("../models/course.model");

const getAllCourses = async (req, res)=>{
    const courses = await Course.find();
    res.json(courses)
}

const getCourse = async (req, res)=>{
    const courseId = req.params.courseId;
    try {
        const course = await Course.findById(courseId);
        if(course) {
            res.json(course)
        } else {
            res.status(400).json({msg: "Not found this course"})
        }
    } catch(err) {
        res.status(400).json({msg: err.message})
    }
}

const addCourse = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json(errors)
    } else {
        const newCourse = new Course(req.body);
        await newCourse.save()
        res.status(201).json(newCourse)
    }
}

const updateCourse =  async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = await Course.findByIdAndUpdate(courseId, {$set: {...req.body}}, {new: true});
        if(course) {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                res.status(400).json(errors)
            } else {
                res.json(course)
            }
        } else {
            res.status(400).json({msg: "Not found this course"})
        }
    } catch(err) {
        res.status(400).json({msg: err.message})
    }
}

const deleteCourse = async (req, res)=>{
    const courseId = req.params.courseId;
    try {
        const deletedCourse = await Course.deleteOne({_id: courseId});
        console.log(deletedCourse);
        if(deletedCourse) {
            res.json({msg: deletedCourse})
        } else {
            res.status(400).json({msg: "Not found this course"})
        }
    } catch(err) {
        res.status(400).json({msg: err.message})
    }
}


module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}