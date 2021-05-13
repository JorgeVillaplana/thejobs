const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfferSchema = new Schema({
    job: { type: Schema.Types.ObjectId, ref: "job" },
    candidate: { type: Schema.Types.ObjectId, ref: "user" },
    cvlink: String,
    savedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("offer", OfferSchema)