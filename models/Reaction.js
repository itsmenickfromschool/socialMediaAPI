const {Schema} = require('mongoose')

const reactionSchema = new Schema(
    {
        // reactionId: {
        //     type: Schema.Types.ObjectId,
        //     default: () => new Schema.Types.ObjectId(),
        // },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default:Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleDateString(),
        }, 
        updatedAt: {
            type: Date,
            default:Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleDateString(),
        }, 
    },
    {
        toJSON: {
          getters: true,
          virtuals: true,
        },
        timestamps: true,
      },  
    
)

module.exports = reactionSchema;