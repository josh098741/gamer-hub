const Match = require("../models/Match");

exports.createMatch = async (req, res, next) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (err) { next(err); }
};

exports.getMatches = async (req, res, next) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) { next(err); }
};

exports.getMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id).populate("participants");
    res.json(match);
  } catch (err) { next(err); }
};

exports.updateMatch = async (req, res, next) => {
  try {
    const updated = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteMatch = async (req, res, next) => {
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.json({ message: "Match deleted" });
  } catch (err) { next(err); }
};