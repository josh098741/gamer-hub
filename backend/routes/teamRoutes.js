const express = require("express");
const router = express.Router();
const {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  registerTeamToTournament,
} = require("../controllers/teamController");

// Middleware
const { protect, adminOnly } = require("../middleware/authMiddleware");

// @route   POST /api/teams
// @desc    Create a new team
// @access  Private (logged in)
router.post("/", protect, createTeam);

// @route   GET /api/teams
// @desc    Get all teams
// @access  Public
router.get("/", getAllTeams);

// @route   GET /api/teams/:id
// @desc    Get a team by ID
// @access  Public
router.get("/:id", getTeamById);

// @route   PUT /api/teams/:id
// @desc    Update team
// @access  Private (team creator or admin)
router.put("/:id", protect, updateTeam);

// @route   DELETE /api/teams/:id
// @desc    Delete team
// @access  Private (team creator or admin)
router.delete("/:id", protect, deleteTeam);

// @route   POST /api/tournaments/:tournamentId/register/team
// @desc    Register team in a tournament
// @access  Private
router.post(
  "/tournament/:tournamentId/register",
  protect,
  registerTeamToTournament
);

module.exports = router;