const { validationResult } = require("express-validator");

let { courses } = require("../data/courses");

const getAllCourses = (req, res)=>{
    res.json(courses)
}

const getCourse = (req, res)=>{
    const courseId = +req.params.courseId;
    const course = courses.find(course=>course.id === courseId)
    if(course) {
        res.json(course)
    } else {
        res.status(400).json({msg: "Not found this course"})
    }
}

const addCourse = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json(errors)
    } else {
        const newCourse = {id: courses.length + 1, ...req.body};
        courses.push(newCourse)
        res.status(201).json(newCourse)
    }
}

const updateCourse =  (req, res)=>{
    const courseId = +req.params.courseId;
    const courseIndex = courses.findIndex(course => course.id === courseId);
    if(courseIndex >= 0) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json(errors)
        } else {
            courses[courseIndex] = { ...courses[courseIndex], ...req.body };
            res.json(courses[courseIndex])
        }
    } else {
        res.status(400).json({msg: "Not found this course",s:courseId, ss:courseIndex})
    }
}

const deleteCourse = (req, res)=>{
    const courseId = +req.params.courseId;
    const deletedCourse = courses.findIndex(course=>course.id === courseId)
    if(deletedCourse >= 0) {
        courses.splice(deletedCourse, 1)
        res.json({msg: "Deleted Successfully"})
    } else {
        res.status(400).json({msg: "Not found this course"})
    }
}


module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}