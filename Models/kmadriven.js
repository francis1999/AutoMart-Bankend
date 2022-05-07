const mongoose = require("mongoose");



const kilometerSchema = mongoose.Schema({
    kilometer: { type: String },

}, { timestamps: true })
module.exports = mongoose.model("Kilometer", kilometerSchema)