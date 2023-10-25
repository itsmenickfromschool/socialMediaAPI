const {model, Schema} = require('mongoose')
const userSchema = require('./User')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            Type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            Type: 
        }
    }
)