const router = require('express').Router();
const { /* testcar, */addcar,Getallcar,GetCarbyUserID,DeleteCar,GetCarbyID } = require("../Controllers/carController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
const upload = require("../uploads/imageUploader")





router.post('/addcar', upload.array('carimage', 4), addcar)
router.get('/viewcars', Getallcar)
router.get('/GetCarbyUserID/:user_id', GetCarbyUserID);
router.delete('/deletecar/:id', DeleteCar);
router.get('/getcarbyid/:id', GetCarbyID);
/* router.post('/testcar', testcar); */



module.exports = router;
