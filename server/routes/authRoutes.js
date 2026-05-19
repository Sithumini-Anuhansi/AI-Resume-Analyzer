const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const {
    register,
    login
} = require("../controllers/authController");


// Validation middleware
const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
};


// REGISTER
router.post(
    "/register",

    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid email required"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters")
    ],

    validate,

    register
);


// LOGIN
router.post(
    "/login",

    [
        body("email").isEmail().withMessage("Valid email required"),
        body("password").notEmpty().withMessage("Password required")
    ],

    validate,

    login
);

module.exports = router;