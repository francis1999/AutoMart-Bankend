const router = require('express').Router();
const { addvarient, editvarient, deletevarient, getvarientbyid, getallvarient, } = require("../Controllers/varientController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
//const upload = require("../Middleware/imageUploader")

router.post('/addvarient', addvarient)
router.get('/getallvarient', getallvarient);
router.get('/singlevarient/:id', getvarientbyid);
router.delete('/deletevarient/:id', deletevarient);
router.put('/editvarient/:id', editvarient);

module.exports = router;
