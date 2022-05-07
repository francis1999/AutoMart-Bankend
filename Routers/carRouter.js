const router = require('express').Router();
const { addcar,Getallcar,GetCarbyUserID } = require("../Controllers/carController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
const upload = require("../Middleware/imageUploader")



router.post('/addcar', upload.upload.array('carimage', 4), addcar)
router.get('/viewcars', Getallcar)
router.get('/GetCarbyUserID/:user_id', GetCarbyUserID);



module.exports = router;
