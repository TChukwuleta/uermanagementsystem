const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    name: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    comment: {
        type: String
    } 
}, {
    timestamps: true
})

const User = mongoose.model('todo', userSchema)
module.exports = User 