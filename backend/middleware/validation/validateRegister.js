const { body, validationResult } = require("express-validator");


const validateRegister = [
    body("username")
        .notEmpty()
        .withMessage("Username required"),

    body("email")
        .isEmail()
        .withMessage("Valid email required"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be 6+ chars"),
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];


module.exports = validateRegister;