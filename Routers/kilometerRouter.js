const router = require('express').Router();
const { addkilometer, editkilometer, deletekilometer, getkilometerbyid, getallkilometer, } = require("../Controllers/kilometerController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
//const upload = require("../Middleware/imageUploader")

router.post('/addkilometer',verifyTokenwithAdmin, addkilometer)
router.get('/getallkilometer',verifyTokenwithAuthorization, getallkilometer);
router.get('/singlekilometer/:id',verifyTokenwithAuthorization, getkilometerbyid);
router.delete('/deletekilometer/:id',verifyTokenwithAdmin, deletekilometer);
router.put('/editkilometer/:id',verifyTokenwithAdmin, editkilometer);

module.exports = router;
