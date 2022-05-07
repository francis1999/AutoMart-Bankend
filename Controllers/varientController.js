const Varient = require("../Models/varientModel")
const Year = require("../Models/yearModel")




module.exports.addvarient = async (req, res) => {
    var { yearId, varientname } = req.body
    if (yearId == '') {
        res.status(500).json({
            status: "Failed",
            message: "Year Id Is Required"
        })
    } else if (varientname == '') {
        res.status(500).json({
            status: "Failed",
            message: "varient Name is Required"
        })
    } else {

        Varient.find({ varientname })
            .then((result) => {
                if (result.length) {
                    res.status(500).json({
                        status: "Failed",
                        message: "varient Name Already Exist for this model"
                    })
                } else {
                    const newvarient = new Varient({
                        yearId,
                        varientname,
                        //subcategoryimage: req.file.path
                    })

                    const varientsender = newvarient.save();

                    if (varientsender) {
                        res.status(201).json({
                            code:201,
                            status: "success",
                            data: newvarient
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

module.exports.editvarient = ("/:id", async (req, res) => {

    var id = req.params.id
    var varientname_varientname = req.body.varientname
    var yearId_yearId = req.body.yearId
    //var subcategoryimage_subcategoryimage = req.file.path
    Varient.findById(id, function (err, data) {
        data.varientname = varientname_varientname ? varientname_varientname : data.varientname;
        data.yearId = yearId_yearId ? yearId_yearId : data.yearId;
        //data.subcategoryimage = subcategoryimage_subcategoryimage ? subcategoryimage_subcategoryimage : data.subcategoryimage;
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Varient Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

})


//DELETE TYPE
module.exports.deletevarient = ("/:id", async (req, res) => {
    try {
        await Varient.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Varient Name Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});

//GET SINGLE TYPE BY USERS AND ADMIN
module.exports.getvarientbyid = ("/:id", async (req, res) => {
    try {
        const singlevarient = await Varient.findById(req.params.id)
        .populate("yearId")
        res.status(200).json({
            message: "success",
            data: singlevarient
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

//GET ALL TYPE
module.exports.getallvarient = ("/", async (req, res) => {
    try {
        const allvarient = await Varient.find()
            .populate("yearId")
            //console.log(allsubCategory._id)
        res.status(200).json({
            message: "success",
            no_of_varient: allvarient.length,
            data: allvarient,
            //subcategoryid:_id
        });
    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})

/* module.exports = router */