const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('user')

const JobSchema = new Schema({
    companyName: String,
    name: String,
    description: String,
    location: String,
    type: {
        type: String,
        enum: ["fulltime", "freelancer", "partial", "project", "internship"]
    },
    photo: String,
    companyWeb: String,
    publisher: { type: Schema.Types.ObjectId, ref: "user" },
    savedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model("job", JobSchema)