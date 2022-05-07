const mongoose = require("mongoose");



const varientSchema = mongoose.Schema({
    yearId: { type: mongoose.Schema.Types.ObjectId, ref: "Year", index: true },
    varientname: { type: String },
    /* subcategoryimage: { type: String } */

}, { timestamps: true })
module.exports = mongoose.model("Varient", varientSchema)