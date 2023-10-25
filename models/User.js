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
      Unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Not a valid, email, please entere a valid email!",
      },
    },
    thoughts: [thoughtSchema],
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
    },
  }
);
userSchema.virtual("reactionCount").get(function () {
    return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
