const router = require('express').Router();
const { userregistration } = require("../Controllers/userController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");




router.post('/userregistration', userregistration);





module.exports = router;
