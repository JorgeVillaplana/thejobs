const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    surname: String,
    role: {
        type: String,
        enum: ['user', 'company']
    },
    phone: String,
    email: String,
    password: String,
    savedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

UserSchema.pre('save', async function(next) {
    try {
        const user = this
        const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
        user.password = hash
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function(password) {
    const compare = await bcrypt.compare(password, this.password)
    return compare
}

module.exports = mongoose.model("user", UserSchema)