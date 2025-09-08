const Payment = require("../models/Payment");

exports.initiatePayment = async (req, res, next) => {
  try {
    const payment = await Payment.create({
      user: req.user.id,
      amount: req.body.amount,
      method: req.body.method,
      status: "pending"
    });
    res.json({ message: "Payment initiated", payment });
  } catch (err) { next(err); }
};

exports.handleCallback = async (req, res, next) => {
  try {
    // Handle webhook (mpesa/stripe)
    console.log("Webhook received:", req.body);
    res.json({ message: "Callback received" });
  } catch (err) { next(err); }
};

exports.getUserPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.params.userId });
    res.json(payments);
  } catch (err) { next(err); }
};