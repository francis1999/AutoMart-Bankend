const router = require('express').Router();
const { userregistration, Userlogin, getsingleuser,getallusers,deleteuserbyid } = require("../Controllers/userController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");




router.post('/userregistration', userregistration);
router.post('/userlogin', Userlogin);
router.get('/singleuser/:id', getsingleuser);
router.get('/getallusers', getallusers);
router.delete('/deleteuserbyid/:id', deleteuserbyid);





module.exports = router;
