const { AdminAuth } = require("../Models/Adminauth");
const Validator = require('fastest-validator');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const _ = require("lodash")


module.exports.adminregistration = async (req, res) => {
    const { email } = req.body
    AdminAuth.findOne({ email }).exec((err, admin) => {
        if (admin) {
            return res.status(401).json("Email Already Exist");
        }

        const newAdmin = new AdminAuth({
            adminpicture: req.file.path,
            fullname: req.body.fullname,
            number: req.body.number,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORDECRPY).toString(),
        })
        try {
            const saveAdmin = newAdmin.save();
            res.status(201).json({
                message: "Success",
                data: newAdmin
            })
        } catch (err) {
            res.status(500).json(err)
        }
    })
}


