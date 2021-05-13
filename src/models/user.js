const mongoose = require('mongoose')
const Schema = new SchemaMongo

const UserSchema = new Schema({
    name: String,
    surname: String,
    role: {
        type: String,
        enum: ['user', 'company']
    },
    phone: String,
    email: String
})

module.exports = mongoose.model("user", Schema)