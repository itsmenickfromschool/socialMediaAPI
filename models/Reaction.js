const {Schema} = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            Type: Date,
            default:Date.now(),
            get: (d) => new Date(d).toLocaleDateString(),
        },
    },
)

module.exports = reactionSchema;