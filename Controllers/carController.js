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


module.exports.Getallcar = ("/", async (req, res) => {

    let query = {};
    let qNew = req.query.new

    if (req.query.brand) {
        query.brand = req.query.brand
    } 

    let total = await Car.countDocuments(query);
    let page = (req.query.page) ? parseInt(req.query.page) : 1;
    let perPage = (req.query.perPage) ? parseInt(req.query.perPage) : 10;
    let skip = (page - 1) * perPage;

    query.push = ({
        $skip: skip
    });
    query.push = ({
        $limit: perPage
    })

    if (req.query.brand) {
        query.$or = [
            { "brand": { $regex: req.query.brand, $options: 'i' } },

        ]
    } else if (req.query.status) {
        query.$or = [
            { "status": { $regex: req.query.status, $options: 'i' } },

        ]
    }

    let diplayallCar = await Car.find(query)
        .populate('brand')
        .populate('model')
        .populate('year')
        .populate('user_id')
        .sort({ createdAt: -1 });
    if (qNew) {
        diplayallCar = await Car.find().sort({ createdAt: -1 })
        .populate('brand')
        .populate('model')
        .populate('year')
        .populate('user_id')
    }

    return res.status(200).json({
        message: "success",
        noofcars: diplayallCar.length,
        data: {

            data: diplayallCar,
            meta: {
                total: total,
                currentPage: page,
                perPage: perPage,
                totalPages: Math.ceil(total / perPage)
            }
        }
    })
   
})


module.exports.GetCarbyUserID = async (req, res) => {
    try {
        const singleCar = await Car.find({ user_id: req.params.user_id })
            .populate('brand')
            .populate('model')
            .populate('year')
        res.status(200).json({
            message: "success",
            noofadvert: singleCar.length,
            data: singleCar
        })
    }
    catch (err) {
        res.status(500).json({ error: "User Does not exit" })
    }
}








