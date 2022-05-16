const router = require('express').Router();
const multipleFileUpload = require("../Controllers/multipleupload")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
const upload = require("../utils/multer")



router.post('/addmultiplefile', upload.array('image'), multipleFileUpload)




module.exports = router;
