const express = require("express");
const router = express.Router();
const {
  sendNotification,
  getUserNotifications
} = require("../controllers/notificationController");

const auth = require("../middleware/authMiddleware");
const notificationValidator = require("../middleware/notificationValidator");

router.post("/", auth, notificationValidator, sendNotification);
router.get("/:userId", auth, getUserNotifications);

module.exports = router;