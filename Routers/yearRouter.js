const { addyear, getallyear, getyearbyid, edityear, deleteyear,GetYearbymodelID } = require("../Controllers/yearController")
const router = require("express").Router();
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
//const upload = require("../Middleware/imageUploader")




router.post("/addyear",verifyTokenwithAdmin, addyear);
router.get("/getallyear",verifyTokenwithAuthorization, getallyear);
router.get("/getyearbyid/:id",verifyTokenwithAuthorization, getyearbyid);
router.put("/edityear/:id",verifyTokenwithAdmin, edityear);
router.delete("/deleteyear/:id",verifyTokenwithAdmin, deleteyear);
router.get("/getyearbymodelid/:modelId", GetYearbymodelID);



module.exports = router