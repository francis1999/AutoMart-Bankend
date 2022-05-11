const mongoose = require("mongoose");
require('mongoose-double')(mongoose);



var SchemaTypes = mongoose.Schema.Types;
const CarSchema = mongoose.Schema({
    description: { type: String },

    brand: { type: String },
    model: { type: String },
    year: { type: String },
    kms: { type: String },
    state: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    carimage: { type: Array },
    condition: { type: String },
    price: { type: SchemaTypes.Double },
    status: { type: String, default: "Available" }
}, { timestamps: true });
module.exports = mongoose.model("Car", CarSchema)