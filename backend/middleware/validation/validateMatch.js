const { body, validationResult } = require("express-validator");

const validateMatch = [
    body("tournament")
        .notEmpty()
        .withMessage("Tournament ID required")
        .isMongoId()
        .withMessage("Invalid tournament ID"),

    body("type")   
        .notEmpty()
        .withMessage("Match type required")
        .isIn(["solo", "team"]) // Fixed to match actual usage
        .withMessage("Type must be solo or team"),

    body("participants")
        .isArray({ min: 1 })   
        .withMessage("At least one participant required"),

    body("participants.*") // Validate each participant ID
        .isMongoId()
        .withMessage("Invalid participant ID"),
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateMatch;