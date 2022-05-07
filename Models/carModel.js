const mongoose = require("mongoose");
require('mongoose-double')(mongoose);



var SchemaTypes = mongoose.Schema.Types;
const CarSchema = mongoose.Schema({
    description: { type: String },

    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        index: true
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model',
        index: true
    },
    year: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Year',
        index: true
    },
    varient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Varient',
        index: true
    },
    kms: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kilometer',
        index: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        index: true
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    carimage: { type: Array },
    condition: { type: String },
    price: { type: SchemaTypes.Double },
    status: { type: String, default: "Available" }
}, { timestamps: true });
module.exports = mongoose.model("Car", CarSchema)