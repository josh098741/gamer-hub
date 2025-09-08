const express = require("express");
const router = express.Router();
const {
    initiatePayment,
    handleCallback,
    getUserPayments
} = require("../controllers/paymentController");

const auth = require("../middleware/authMiddleware");
const validatePayment = require("../middleware/validation/validatePayment");
const paymentWebhookParser = require("../middleware/paymentWebhookParser");

router.post("/initiate", auth, validatePayment, initiatePayment);
router.post("/callback", paymentWebhookParser, handleCallback);
router.get("/:userId", auth, getUserPayments);

module.exports = router;