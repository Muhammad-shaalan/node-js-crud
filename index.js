const express = require("express");
const app = express();
const port = 3000;
app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}`)
})
// Parsing Body Object
app.use(express.json());
const {body, validationResult} = require("express-validator");


let courses = [
    {
        id: 1,
        name: "Js Course",
        price: 1200
    },
    {
        id: 2,
        name: "PHP Course",
        price: 1500
    },
]
app.get("/api/courses", (req, res)=>{
    res.json(courses)
})
app.get("/api/courses/:courseId", (req, res)=>{
    const courseId = +req.params.courseId;
    const course = courses.find(course=>course.id === courseId)
    if(course) {
        res.json(course)
    } else {
        res.status(400).json({msg: "Not found this course"})
    }
})
app.post("/api/courses/",
    body('name')
    .notEmpty().withMessage("Name field is required")
    .isLength({min: 2}).withMessage("Name field min length is 2 chars"), 
    body('price')
    .notEmpty().withMessage("Price field is required")
    .isFloat().withMessage("Price field must be number"), 
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json(errors)
        } else {
            const newCourse = {id: courses.length + 1, ...req.body};
            courses.push(newCourse)
            res.status(201).json(newCourse)
        }
    }
)
app.patch("/api/courses/:courseId",
    body('name')
    .notEmpty().withMessage("Name field is required")
    .isLength({min: 2}).withMessage("Name field min length is 2 chars"), 
    body('price')
    .isFloat().withMessage("Price field must be number"), 
    (req, res)=>{
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
)
app.delete("/api/courses/:courseId", (req, res)=>{
    const courseId = +req.params.courseId;
    const deletedCourse = courses.findIndex(course=>course.id === courseId)
    if(deletedCourse >= 0) {
        courses.splice(deletedCourse, 1)
        res.json({msg: "Deleted Successfully"})
    } else {
        res.status(400).json({msg: "Not found this course"})
    }
})