const { Schema, model } = require("mongoose");
module.exports.Brand = model('Brand', Schema({
    brandname: { type: String, required: true, unique: true },
    brandimage: { type: String }
}, { timestamps: true }));