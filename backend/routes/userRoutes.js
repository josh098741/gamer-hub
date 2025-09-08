const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware"); // Fixed typo from "roleMiddleare"
const validateProfileUpdate = require("../middleware/validation/validateProfileUpdate");

// Admin only routes
router.get("/", auth, role(["admin"]), getUsers); // Fixed route path
router.delete("/:id", auth, role(["admin"]), deleteUser); // Fixed route path

// User routes (accessible to authenticated users)
router.get("/:id", auth, getUserById); // Fixed route path
router.put("/:id", auth, validateProfileUpdate, updateUser); // Fixed route path

module.exports = router;