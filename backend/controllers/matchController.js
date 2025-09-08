const Match = require("../models/Match");
const Tournament = require("../models/Tournament");

exports.createMatch = async (req, res, next) => {
  try {
    const { tournament, type, participants, scheduledAt } = req.body;

    // Validate tournament exists
    const tournamentExists = await Tournament.findById(tournament);
    if (!tournamentExists) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // Set participantsModel based on type
    const participantsModel = type === "solo" ? "User" : "Team";

    const match = await Match.create({
      tournament,
      type,
      participants,
      participantsModel,
      scheduledAt: scheduledAt || new Date(),
      status: "pending"
    });

    await match.populate("tournament", "name type");
    await match.populate("participants");

    res.status(201).json(match);
  } catch (err) { 
    next(err); 
  }
};

exports.getMatches = async (req, res, next) => {
  try {
    const matches = await Match.find()
      .populate("tournament", "name type")
      .populate("participants");
    res.json(matches);
  } catch (err) { 
    next(err); 
  }
};

exports.getMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("tournament", "name type")
      .populate("participants");
    
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    
    res.json(match);
  } catch (err) { 
    next(err); 
  }
};

exports.updateMatch = async (req, res, next) => {
  try {
    const { scores, status, scheduledAt } = req.body;
    
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    // Update fields
    if (scores) match.scores = scores;
    if (status) match.status = status;
    if (scheduledAt) match.scheduledAt = scheduledAt;

    const updated = await match.save();
    await updated.populate("tournament", "name type");
    await updated.populate("participants");

    res.json(updated);
  } catch (err) { 
    next(err); 
  }
};

exports.deleteMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    await Match.findByIdAndDelete(req.params.id);
    res.json({ message: "Match deleted" });
  } catch (err) { 
    next(err); 
  }
};