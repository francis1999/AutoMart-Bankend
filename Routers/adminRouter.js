const router = require('express').Router();
const { adminregistration, authlogin } = require("../Controllers/authController")
const upload = require("../utils/multer")


router.post('/registration', upload.single('adminpicture'), adminregistration);
router.post('/adminlogin', authlogin);


module.exports = router;
