const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        index: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: Number,
        default: 1,
    },
    lastSeenOnline: {
        type: Date,
    },
}, {
    collection: "users",
    timestamps: true
})


const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel