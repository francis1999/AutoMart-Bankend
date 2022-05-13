const router = require('express').Router();
/* const {addcar,Getallcar,GetCarbyUserID,DeleteCar,GetCarbyID } = require("../Controllers/carController") */
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
const upload=require("../utils/multer")





/* router.post('/addcar', upload.array('carimage', 4), addcar)
router.get('/viewcars', Getallcar)
router.get('/GetCarbyUserID/:user_id', GetCarbyUserID);
router.delete('/deletecar/:id', DeleteCar);
router.get('/getcarbyid/:id', GetCarbyID); */




module.exports = router;
