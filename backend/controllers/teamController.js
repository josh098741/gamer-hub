const Team = require("../models/Team");
const Tournament = require("../models/Tournament");

// @desc Create a new team
// @route POST /api/teams
// @access Private (user must be logged in)
const createTeam = async (req, res, next) => {
  try {
    const { name, members } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Team name is required" });
    }

    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res.status(400).json({ message: "Team name already exists" });
    }

    const team = await Team.create({
      name,
      members: members || [], // array of user IDs
      createdBy: req.user.id, // who created it
      captain: req.user.id, // Set creator as captain by default
    });

    await team.populate("members", "username email");
    res.status(201).json(team);
  } catch (err) {
    next(err);
  }
};

// @desc Get all teams
// @route GET /api/teams
// @access Public
const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.find()
      .populate("members", "username email")
      .populate("createdBy", "username email")
      .populate("captain", "username email");
    res.status(200).json(teams);
  } catch (err) {
    next(err);
  }
};

// @desc Get a single team by ID
// @route GET /api/teams/:id
// @access Public
const getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("members", "username email")
      .populate("createdBy", "username email")
      .populate("captain", "username email");
    
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (err) {
    next(err);
  }
};

// @desc Update a team (name, members)
// @route PUT /api/teams/:id
// @access Private (team creator or admin)
const updateTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Check permission
    if (team.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update fields
    if (req.body.name) team.name = req.body.name;
    if (req.body.members) team.members = req.body.members;
    if (req.body.captain) team.captain = req.body.captain;

    const updatedTeam = await team.save();
    await updatedTeam.populate("members", "username email");
    res.status(200).json(updatedTeam);
  } catch (err) {
    next(err);
  }
};

// @desc Delete a team
// @route DELETE /api/teams/:id
// @access Private (team creator or admin)
const deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Check permission
    if (team.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Use deleteOne() instead of deprecated remove()
    await Team.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Team removed successfully" });
  } catch (err) {
    next(err);
  }
};

// @desc Register a team into a tournament
// @route POST /api/teams/tournament/:tournamentId/register
// @access Private
const registerTeamToTournament = async (req, res, next) => {
  try {
    const { tournamentId } = req.params;
    const { teamId } = req.body;

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    if (tournament.type !== "team") {
      return res.status(400).json({ message: "This tournament is not for teams" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Check if user is team captain or admin
    if (team.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only team creator can register the team" });
    }

    if (tournament.participants.includes(teamId)) {
      return res.status(400).json({ message: "Team already registered in this tournament" });
    }

    tournament.participants.push(teamId);
    await tournament.save();

    res.status(200).json({ message: "Team registered successfully", tournament });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  registerTeamToTournament,
};