const router = require('express').Router();
const { adminregistration, authlogin } = require("../Controllers/authController")
const upload = require("../uploads/imageUploader")


router.post('/registration', upload.single('adminpicture'), adminregistration);
router.post('/adminlogin', authlogin);


module.exports = router;
