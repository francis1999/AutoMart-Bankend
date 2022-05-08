const Year = require("../Models/yearModel")
const Model = require("../Models/modelModel")




module.exports.addyear = async (req, res) => {
    var { modelId, year } = req.body
    if (modelId == '') {
        res.status(500).json({
            status: "Failed",
            message: "Brand Id Is Required"
        })
    } else if (year == '') {
        res.status(500).json({
            status: "Failed",
            message: "Year is Required"
        })
    } else {

        Year.find({ year })
            .then((result) => {
                if (result.length) {
                    res.status(500).json({
                        status: "Failed",
                        message: "Year Already Exist for this model"
                    })
                } else {
                    const newyear = new Year({
                        modelId,
                        year,
                        //subcategoryimage: req.file.path
                    })

                    const yearsender = newyear.save();

                    if (yearsender) {
                        res.status(201).json({
                            code:201,
                            status: "success",
                            data: newyear
                        })
                    } else {
                        res.status(500).json({
                            status: "Failed",
                            message: "Something went Wrong While trying to enter data into database"
                        })
                    }



                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    status: "Failed",
                    message: "error",
                })
            })

    }





}


//Edit Product code

module.exports.edityear = ("/:id", async (req, res) => {

    var id = req.params.id
    var year_year = req.body.year
    var modelId_modelId = req.body.modelId
    //var subcategoryimage_subcategoryimage = req.file.path
    Year.findById(id, function (err, data) {
        data.year = year_year ? year_year : data.year;
        data.modelId = modelId_modelId ? modelId_modelId : data.modelId;
        //data.subcategoryimage = subcategoryimage_subcategoryimage ? subcategoryimage_subcategoryimage : data.subcategoryimage;
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Year Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

})


//DELETE TYPE
module.exports.deleteyear = ("/:id", async (req, res) => {
    try {
        await Year.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Year Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});

//GET SINGLE TYPE BY USERS AND ADMIN
module.exports.getyearbyid = ("/:id", async (req, res) => {
    try {
        const singleyear = await Year.findById(req.params.id)
        .populate("modelId")
        res.status(200).json({
            message: "success",
            data: singleyear
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

//GET ALL TYPE
module.exports.getallyear = ("/", async (req, res) => {
    try {
        const allyear = await Year.find()
            .populate("modelId")
            //console.log(allsubCategory._id)
        res.status(200).json({
            message: "success",
            no_of_years: allyear.length,
            data: allyear,
            //subcategoryid:_id
        });
    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})


module.exports.GetYearbymodelID = async (req, res) => {
    try {
        const singleyear = await Year.find({ modelId: req.params.modelId })
        res.status(200).json({
            message: "success",
            noofyear: singleyear.length,
            data: singleyear
        })
    }
    catch (err) {
        res.status(500).json({ error: "Year Does not exit" })
    }
}

/* module.exports = router */