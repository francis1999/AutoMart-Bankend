const router = require('express').Router();
const { addcar,Getallcar,GetCarbyUserID,DeleteCar,GetCarbyID } = require("../Controllers/carController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
const upload = require("../Middleware/imageUploader")



router.post('/addcar',verifyTokenwithAuthorization, upload.upload.array('carimage', 4), addcar)
router.get('/viewcars',verifyTokenwithAuthorization, Getallcar)
router.get('/GetCarbyUserID/:user_id',verifyToken, GetCarbyUserID);
router.delete('/deletecar/:id',verifyTokenwithAuthorization, DeleteCar);
router.get('/getcarbyid/:id',verifyTokenwithAuthorization, GetCarbyID);



module.exports = router;
