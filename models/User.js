const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email Required"],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
