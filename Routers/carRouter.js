const router = require('express').Router();
const { addcar } = require("../Controllers/carController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
const upload = require("../Middleware/imageUploader")



router.post('/addcar', upload.upload.array('carimage', 4), addcar)



module.exports = router;
