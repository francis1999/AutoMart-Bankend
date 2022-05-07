const mongoose = require("mongoose");



const modelSchema = mongoose.Schema({
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", index: true },
    modelname: { type: String },
    /* subcategoryimage: { type: String } */

}, { timestamps: true })
module.exports = mongoose.model("Model", modelSchema)