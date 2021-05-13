const mongoose = require('mongoose')
const Schema = new SchemaMongo

const JobSchema = new Schema({
    name: String,
    surname: String,
    role: {
        type: String,
        enum: ['user', 'company']
    },
    phonenumber: Number,
    email: String
})

module.exports = mongoose.model("user", Schema)