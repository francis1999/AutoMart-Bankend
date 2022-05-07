const router = require("express").Router();
const Car = require("../Models/carModel")





module.exports.addcar = ("/", async (req, res) => {
    const newcar = await new Car({
        carimage: req.files,
        model: req.body.model,
        brand: req.body.brand,
        description: req.body.description,
        year: req.body.year,
        varient: req.body.varient,
        kms: req.body.kms,
        state: req.body.state,
        user_id: req.body.user_id,
        condition: req.body.condition,
        price: req.body.price,
        status: req.body.status,
    });
    try {
        //generate bcrpyt password
        const carview = await newcar.save();
        res.status(200).json({
            message: "You have successfully Posted Car",
            data: newcar
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});





