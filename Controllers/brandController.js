const { Brand } = require("../Models/brandModel");

module.exports.addbrand = ("/", async (req, res) => {
    const newBrand = await new Brand({
        brandname: req.body.brandname,
        brandimage: req.file.path
    });

    try {
        //generate bcrpyt password
        const brand = await newBrand.save();
        res.status(201).json({
            message: "Brand Addedd Successfully",
            data: brand
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})


//Edit Product code

module.exports.editBrand = ("/:id", async (req, res) => {

    var id = req.params.id
    var brand_image = req.file.path
    var brand_name = req.body.brandname

    Brand.findById(id, function (err, data) {
        data.brandimage = brand_image ? brand_image : data.brandimage;
        data.brandname = brand_name ? brand_name : data.brandname;
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "brand Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

})


//DELETE PRODUCT
module.exports.deletebrand = ("/:id", async (req, res) => {
    try {
        await Brand.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Brand Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});

//GET SINGLE PRODUCT BY USERS AND ADMIN
module.exports.getbrandbyid = ("/:id", async (req, res) => {
    try {
        const singleBrand = await Brand.findById(req.params.id)
        res.status(200).json({
            message: "success",
            data: singleBrand
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

//GET ALL CATEGPRIES
module.exports.getallbrand = ("/", async (req, res) => {

    try {
        const allbrands = await Brand.find();
        res.status(200).json({
            message: "success",
            data: allbrands
        });

    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})

/* module.exports = router */