const { body, validationResult } = require("express-validator");


const validateLogin = [
    body("email")
        .isEmail() 
        .withMessage("Valid email required"),

    body("password")    
        .notEmpty()
        .withMessage("Password required"),
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];


module.exports = validateLogin;