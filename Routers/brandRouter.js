const router = require('express').Router();
const { addbrand, editBrand, deletebrand, getbrandbyid, getallbrand, } = require("../Controllers/brandController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
const upload = require("../utils/multer")

router.post('/addbrand', upload.single('brandimage'), addbrand)
router.get('/getallbrand', getallbrand);
router.get('/singlebrand/:id', getbrandbyid);
router.delete('/deletebrand/:id', deletebrand);
router.put('/editbrand/:id', upload.single('brandimage'), editBrand);

module.exports = router;
