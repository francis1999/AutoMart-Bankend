const Model = require("../Models/modelModel")
const Brand = require("../Models/brandModel")




module.exports.addmodel = async (req, res) => {
    var { brandId, modelname } = req.body
    if (brandId == '') {
        res.status(500).json({
            status: "Failed",
            message: "Brand Id Is Required"
        })
    } else if (modelname == '') {
        res.status(500).json({
            status: "Failed",
            message: "Model Name is Required"
        })
    } else {

        Model.find({ modelname })
            .then((result) => {
                if (result.length) {
                    res.status(500).json({
                        status: "Failed",
                        message: "Model Name Already Exist"
                    })
                } else {
                    const newmodel = new Model({
                        brandId,
                        modelname,
                        //subcategoryimage: req.file.path
                    })

                    const modelsender = newmodel.save();

                    if (modelsender) {
                        res.status(201).json({
                            code:201,
                            status: "success",
                            data: newmodel
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

module.exports.editmodel = ("/:id", async (req, res) => {

    var id = req.params.id
    var modelname_modelname = req.body.modelname
    var brandId_brandId = req.body.brandId
    //var subcategoryimage_subcategoryimage = req.file.path
    Model.findById(id, function (err, data) {
        data.modelname = modelname_modelname ? modelname_modelname : data.modelname;
        data.brandId = brandId_brandId ? brandId_brandId : data.brandId;
        //data.subcategoryimage = subcategoryimage_subcategoryimage ? subcategoryimage_subcategoryimage : data.subcategoryimage;
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Brand Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

})


//DELETE TYPE
module.exports.deleteModel = ("/:id", async (req, res) => {
    try {
        await Model.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Model Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});

//GET SINGLE TYPE BY USERS AND ADMIN
module.exports.getmodelbyid = ("/:id", async (req, res) => {
    try {
        const singlemodel = await Model.findById(req.params.id)
        .populate("brandId")
        res.status(200).json({
            message: "success",
            data: singlemodel
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

//GET ALL TYPE
module.exports.getallmodel = ("/", async (req, res) => {
    try {
        const allmodel = await Model.find()
            .populate("brandId")
            //console.log(allsubCategory._id)
        res.status(200).json({
            message: "success",
            no_of_Model: allmodel.length,
            data: allmodel,
            //subcategoryid:_id
        });
    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})

/* module.exports = router */