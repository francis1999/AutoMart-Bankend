const { Schema, model } = require("mongoose")

module.exports.AdminAuth = model('AdminAuth', Schema({
    fullname: { type: String,required:true },
    isAdmin: { type: String, default: true },
    number: { type: String, required:true},
    email: { type: String,unique:true },
    password: { type: String, required:true },
    adminpicture: { type: String }
}, { timestamps: true }))