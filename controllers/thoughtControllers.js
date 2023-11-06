const { User, Thought } = require("../models");

exports.createThought = async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json({ message: "Error creating thought", error: err });
    }
  };

exports.getThoughtbyId = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId).select("-__v").populate("reactions")
        res.status(200).json(thought)
    } catch (error) {
        res.status(500).json(error)
    }
} 
exports.getThoughts = async (req, res) => {
    try {
        const thought = await Thought.find({}).select("-__v").populate("reactions")
        res.status(200).json(thought)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updateThought = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.deleteThought = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  exports.addReaction = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      res.status(200).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.removeReaction = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      res.status(200).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  };