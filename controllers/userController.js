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
    const users = await User.find().populate("thoughts").populate("friends");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params._id }).select("-__v");
  } catch (err) {
    res.status();
  }
};
