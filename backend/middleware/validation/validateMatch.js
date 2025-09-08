const { body, validationResult } = require("express-validator");


const validateMatch = [
    body("tournament")
        .notEmpty()
        .withMessage("Tournament ID required"),

    body("type")   
        .notEmpty()
        .isIn(["solo","team"])
        .withMessage("Type must be solo or team"),

    body("participants")
        .isArray({ min: 1 })   
        .withMessage("At least one participant required"),
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];


module.exports = validateMatch;