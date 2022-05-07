const { addmodel, getallmodel, getmodelbyid, editmodel, deleteModel } = require("../Controllers/modelController")
const router = require("express").Router();
const upload = require("../Middleware/imageUploader")




router.post("/addmodel", addmodel);
router.get("/getallmodel", getallmodel);
router.get("/getmodelbyid/:id", getmodelbyid);
router.put("/editmodel/:id", editmodel);
router.delete("/deletemodel/:id", deleteModel);



module.exports = router