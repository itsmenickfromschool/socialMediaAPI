const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
// getUsers,
// createUser,
// getUser,
// updateUser,
// deleteUser,
// addFriend,
// removeFriend,

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("thoughts").populate("friends").select("-__v");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error during getUsers:", err);
    res.status(500).json(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (!user) res.status(404).json({message: "No User created"})
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-__v").populate('thoughts').populate('friends');
    if (!user) res.status(404).json({message: "No User found"})
    res.status(200).json(user)

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true, runValidators: true,} )
        if (!user) return res.status(404).json({message: "User not found"})
        res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err);
    }
}

exports.deleteUser = async (req, res) => {
  try {
    await Thought.deleteMany({ username: req.params.userId });
    const user = await User.findByIdAndDelete(req.params.userId)
    if (!user) return res.status(404).json({message: "User not found"})
    res.status(200).json({ message: "User and their thoughts deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.addFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
       req.params.userId,
       {$addToSet: {friends: req.params.friendId}},
       {new: true},
       );
       res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
}


exports.removeFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
       req.params.userId,
       {$pull: {friends: req.params.friendId}},
       {new: true},
       );
       res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
}
