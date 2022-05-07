const router = require('express').Router();
const { addcar,Getallcar } = require("../Controllers/carController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
const upload = require("../Middleware/imageUploader")



router.post('/addcar', upload.upload.array('carimage', 4), addcar)
router.get('/viewcars', Getallcar)



module.exports = router;
