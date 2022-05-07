const router = require('express').Router();
const { userregistration, Userlogin } = require("../Controllers/userController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");




router.post('/userregistration', userregistration);
router.post('/userlogin', Userlogin);




module.exports = router;
