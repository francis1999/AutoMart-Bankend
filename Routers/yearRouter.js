const { addyear, getallyear, getyearbyid, edityear, deleteyear,GetYearbymodelID } = require("../Controllers/yearController")
const router = require("express").Router();
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
//const upload = require("../Middleware/imageUploader")




router.post("/addyear", addyear);
router.get("/getallyear", getallyear);
router.get("/getyearbyid/:id", getyearbyid);
router.put("/edityear/:id", edityear);
router.delete("/deleteyear/:id", deleteyear);
router.get("/getyearbymodelid/:modelId", GetYearbymodelID);



module.exports = router