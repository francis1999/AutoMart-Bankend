const router = require('express').Router();
const { userregistration, Userlogin, getsingleuser,getallusers,deleteuserbyid,Logout } = require("../Controllers/userController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");




router.post('/userregistration', userregistration);
router.post('/userlogin', Userlogin);
router.get('/singleuser/me',verifyTokenwithAuthorization, getsingleuser);
router.get('/getallusers',verifyTokenwithAdmin, getallusers);
router.delete('/deleteuserbyid/:id',verifyTokenwithAdmin, deleteuserbyid);
router.post('/Logout', Logout);





module.exports = router;
