const { addmodel, getallmodel, getmodelbyid, editmodel, deleteModel } = require("../Controllers/modelController")
const router = require("express").Router();
const upload = require("../Middleware/imageUploader")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");





router.post("/addmodel",verifyTokenwithAdmin, addmodel);
router.get("/getallmodel",verifyTokenwithAuthorization, getallmodel);
router.get("/getmodelbyid/:id",verifyTokenwithAuthorization, getmodelbyid);
router.put("/editmodel/:id",verifyTokenwithAdmin, editmodel);
router.delete("/deletemodel/:id",verifyTokenwithAdmin, deleteModel);



module.exports = router