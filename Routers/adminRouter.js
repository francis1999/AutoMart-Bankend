const router = require('express').Router();
const { adminregistration } = require("../Controllers/authController")
const upload = require("../Middleware/imageUploader")


router.post('/registration', upload.upload.single('adminpicture'), adminregistration);





module.exports = router;
