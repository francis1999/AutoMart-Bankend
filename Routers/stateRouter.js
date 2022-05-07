const router = require('express').Router();
const {Addstate,Displayallstates,getsinglestate,deletestate,updatestate  } = require("../Controllers/stateController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");




router.post('/addstate',verifyTokenwithAdmin, Addstate)
router.get('/getallstate',verifyTokenwithAuthorization, Displayallstates);
router.get('/getsinglestate/:id',verifyTokenwithAuthorization, getsinglestate);
router.delete('/deletestate/:id',verifyTokenwithAdmin, deletestate);
router.put('/updatestate/:id',verifyTokenwithAdmin, updatestate);



module.exports = router;
