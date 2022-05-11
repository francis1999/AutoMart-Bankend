const { addmodel, getallmodel, getmodelbyid, editmodel, deleteModel,GetModelbybrandID } = require("../Controllers/modelController")
const router = require("express").Router();
const upload = require("../Middleware/imageUploader")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");





router.post("/addmodel", addmodel);
router.get("/getallmodel", getallmodel);
router.get("/getmodelbyid/:id", getmodelbyid);
router.put("/editmodel/:id", editmodel);
router.delete("/deletemodel/:id", deleteModel);
router.get("/getmodelbybrandid/:brandId", GetModelbybrandID);



module.exports = router