const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleare");
const validateProfileUpdate = require("../middleware/validation/validateProfileUpdate");

//Admin only
router.get("/api/users",auth,role(["admin"]),getUsers)
router.delete("/api/users/:id",auth,role(["admin"]),deleteUser)

//Anyone
router.get("/admin/user/:id",auth, getUserById);
router.put("/api/user/:id",auth,validateProfileUpdate, updateUser)

module.exports = router