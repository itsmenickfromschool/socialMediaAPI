const {model, Schema} = require('mongoose')
const reactionSchema = require('./Reaction')
const thoughtSchema = new Schema(
    {
        thoughtText: {
            Type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            Type: Date,
            default:Date.now(),
            get: (d) => new Date(d).toLocaleDateString(),
        },
        username: {
            type:String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          getters: true,
          virtuals: true,
        },
      },   
);
thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
})

const Thought = model("thought", thoughtSchema);

module.exports = Thought;