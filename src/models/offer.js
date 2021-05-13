const mongoose = require('mongoose')
const Schema = new SchemaMongo

const OfferSchema = new Schema({
    job: { type: Schema.Types.ObjectId, ref: "job" },
    candidate: { type: Schema.Types.ObjectId, ref: "user" }
})

module.exports = mongoose.model("offer", Schema)