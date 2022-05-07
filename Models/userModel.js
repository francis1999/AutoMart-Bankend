const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    verified: { type: Boolean },
    number: { type: String },
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    location: { type: String, default: null },
    

    


}, { timestamps: true })
module.exports = mongoose.model("User", UserSchema)