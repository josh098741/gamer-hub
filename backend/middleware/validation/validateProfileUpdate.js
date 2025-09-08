const { body, validationResult } = require("express-validator");

const validateProfileUpdate = [
    body("phone")
        .optional()
        .isMobilePhone()
        .withMessage("Invalid phone number"),

    body("avatar")
        .optional()
        .isURL()
        .withMessage("Avatar must be a valid URL"),
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

module.exports = validateProfileUpdate;