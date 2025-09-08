const {body, validationResult} = require("express-validator");

const notificationValidator = [
    body("message").notEmpty().withMessage("Message is required"),
    body("recipient").notEmpty().withMessage("Recipient is required"),

    (req,res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
            next();
        }
    },
];

module.exports = notificationValidator