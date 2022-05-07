const { addyear, getallyear, getyearbyid, edityear, deleteyear } = require("../Controllers/yearController")
const router = require("express").Router();
//const upload = require("../Middleware/imageUploader")




router.post("/addyear", addyear);
router.get("/getallyear", getallyear);
router.get("/getyearbyid/:id", getyearbyid);
router.put("/edityear/:id", edityear);
router.delete("/deleteyear/:id", deleteyear);



module.exports = router