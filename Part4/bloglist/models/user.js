const { transform } = require('lodash')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    name: String,
    passwordHash: {
        type: String,
        require: true
    }
}, {
    toJSON: {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }}
})


module.exports = mongoose.model('User', userSchema)