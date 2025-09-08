const { body, validationResult } = require("express-validator");

const validatePayment = [
    body("amount")
        .isNumeric()
        .withMessage("Amount must be a number"),

    body("method")
        .isIn(["mpesa","stripe","paypal"])
        .withMessage("Invalid payment method"),
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

module.exports = validatePayment;