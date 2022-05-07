const router = require('express').Router();
const { addvarient, editvarient, deletevarient, getvarientbyid, getallvarient, } = require("../Controllers/varientController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
//const upload = require("../Middleware/imageUploader")

router.post('/addvarient',verifyTokenwithAdmin, addvarient)
router.get('/getallvarient',verifyTokenwithAuthorization, getallvarient);
router.get('/singlevarient/:id',verifyTokenwithAuthorization, getvarientbyid);
router.delete('/deletevarient/:id',verifyTokenwithAdmin, deletevarient);
router.put('/editvarient/:id',verifyTokenwithAdmin, editvarient);

module.exports = router;
