const Notification = require("../models/Notification");

exports.sendNotification = async (req, res, next) => {
  try {
    const notification = await Notification.create({
      recipient: req.body.recipient,
      message: req.body.message,
      type: req.body.type || "system"
    });
    res.status(201).json(notification);
  } catch (err) { next(err); }
};

exports.getUserNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ recipient: req.params.userId });
    res.json(notifications);
  } catch (err) { next(err); }
};