const mongoose = require("mongoose");



const yearSchema = mongoose.Schema({
    modelId: { type: mongoose.Schema.Types.ObjectId, ref: "Model", index: true },
    year: { type: String },
    /* subcategoryimage: { type: String } */

}, { timestamps: true })
module.exports = mongoose.model("Year", yearSchema)