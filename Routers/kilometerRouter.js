const router = require('express').Router();
const { addkilometer, editkilometer, deletekilometer, getkilometerbyid, getallkilometer, } = require("../Controllers/kilometerController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
//const upload = require("../Middleware/imageUploader")

router.post('/addkilometer', addkilometer)
router.get('/getallkilometer', getallkilometer);
router.get('/singlekilometer/:id', getkilometerbyid);
router.delete('/deletekilometer/:id', deletekilometer);
router.put('/editkilometer/:id', editkilometer);

module.exports = router;
