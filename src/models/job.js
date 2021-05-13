const mongoose = require('mongoose')
const Schema = new SchemaMongo

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
    companyWeb: String
})


module.exports = mongoose.model("job", Schema)