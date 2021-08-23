const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    } 
})

const User = mongoose.model('user', userSchema)
module.exports = User 