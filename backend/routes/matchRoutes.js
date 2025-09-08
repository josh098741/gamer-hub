const express = require("express");
const router = express.Router();
const {
    createMatch,
    getMatches,
    getMatch,
    updateMatch,
    deleteMatch
} = require("../controllers/matchController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const validateMatch = require("../middleware/validation/validateMatch");

router.post("/", auth, role(["admin"]), validateMatch, createMatch);
router.get("/", getMatches);
router.get("/:id", getMatch);
router.put("/:id", auth, role(["admin"]), validateMatch, updateMatch);
router.delete("/:id", auth, role(["admin"]), deleteMatch);

module.exports = router;