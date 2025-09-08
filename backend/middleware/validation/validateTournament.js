const { body, validationResult } = require("express-validator");

const validateTournament = [
    body("name")
        .notEmpty()
        .withMessage("Tournament name is required")
        .isLength({ min: 3 })
        .withMessage("Tournament name must be at least 3 characters"),

    body("type")
        .notEmpty()
        .withMessage("Tournament type is required")
        .isIn(["solo", "team"])
        .withMessage("Type must be either 'solo' or 'team'"),

    body("startDate")
        .notEmpty()
        .withMessage("Start date is required")
        .isISO8601()
        .toDate()
        .withMessage("Start date must be a valid date"), // Fixed validation

    body("endDate")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("End date must be a valid date")
        .custom((value, { req }) => {
            if (value && req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
                throw new Error("End date cannot be before start date");
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateTournament;