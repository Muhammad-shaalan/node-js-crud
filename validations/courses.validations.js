const { body } = require("express-validator");

const coursesValidationSchema = () => {
    return [
        body('name')
        .notEmpty().withMessage("Name field is required")
        .isLength({min: 2}).withMessage("Name field min length is 2 chars"), 
        body('price')
        .notEmpty().withMessage("Price field is required")
        .isFloat().withMessage("Price field must be number")
    ]
}

module.exports = coursesValidationSchema;