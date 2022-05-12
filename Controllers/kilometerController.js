const Kilometer = require("../Models/kmadriven")




module.exports.addkilometer = async (req, res) => {
    var { kilometer } = req.body
    if (kilometer == '') {
        res.status(500).json({
            status: "Failed",
            message: "Kilometer Is Required"
        })
    } else {

        Kilometer.find({ kilometer })
            .then((result) => {
                if (result.length) {
                    res.status(500).json({
                        status: "Failed",
                        message: "Kilometer Name Already Exist"
                    })
                } else {
                    const newkilometer = new Kilometer({
                            kilometer,
                    })

                    const kilometersender = newkilometer.save();

                    if (kilometersender) {
                        res.status(201).json({
                            code:201,
                            status: "success",
                            data: newkilometer
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
                res.status(500).json({
                    status: "Failed",
                    message: "error",
                })
            })

    }





}


//Edit Product code

module.exports.editkilometer = ("/:id", async (req, res) => {

    var id = req.params.id
    var kilometer_kilometer = req.body.kilometer
    Kilometer.findById(id, function (err, data) {
        data.kilometer = kilometer_kilometer ? kilometer_kilometer : data.kilometer;
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "kilometer Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

})


//DELETE TYPE
module.exports.deletekilometer = ("/:id", async (req, res) => {
    try {
        await Kilometer.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "kilometer Name Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});

//GET SINGLE TYPE BY USERS AND ADMIN
module.exports.getkilometerbyid = ("/:id", async (req, res) => {
    try {
        const singlekilometer = await Kilometer.findById(req.params.id)
        res.status(200).json({
            message: "success",
            data: singlekilometer
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

//GET ALL TYPE
module.exports.getallkilometer = ("/", async (req, res) => {
    try {
        const allKilometer = await Kilometer.find()
        res.status(200).json({
            message: "success",
            no_of_Kilometer: allKilometer.length,
            data: allKilometer,
            //subcategoryid:_id
        });
    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})

/* module.exports = router */