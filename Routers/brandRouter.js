const router = require('express').Router();
const { addbrand, editBrand, deletebrand, getbrandbyid, getallbrand, } = require("../Controllers/brandController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
const upload = require("../Middleware/imageUploader")

router.post('/addbrand',verifyTokenwithAdmin, upload.upload.single('brandimage'), addbrand)
router.get('/getallbrand', getallbrand);
router.get('/singlebrand/:id',verifyTokenwithAuthorization, getbrandbyid);
router.delete('/deletebrand/:id',verifyTokenwithAdmin, deletebrand);
router.put('/editbrand/:id',verifyTokenwithAdmin, upload.upload.single('brandimage'), editBrand);

module.exports = router;
