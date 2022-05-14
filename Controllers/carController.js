const router=require("express").Router();
const Car = require("../Models/carModel")
const cloudinary=require("../utils/cloudinary")
const upload=require("../utils/multer")
const path = require("path")


/*------------------------------ Add cars start------------------*/
/* router.post("/",upload.single('image'), async (req, res) => {   
    const {image,model,brand,description,year,kms,state,user_id,condition,price,status}=req.body;
    try{
        if(!image){
            const uploadimage=await cloudinary.uploader.upload(req.file.path,{upload_preset:"automart"});
            if(uploadimage){
                const newcar = await new Car({
                    image: uploadimage.secure_url,
                    model,
                    brand,
                    description,
                    year,
                    kms,
                    state,
                    user_id,
                    condition,
                    price,
                    status,
                });
                const savecars=await newcar.save();
                res.statusCode(200).json({
                    
                        message:"Car Uploaded Successfully",
                        data:newcar
                   
                })
            }else{
                res.status(500).json({
                    message:"Image Doesnt enter into cloudinary folder"
                })
            }
        }else{
            res.status(500).json({
                message:"Image Does not exist"
            })
        }
    }catch(err){
        res.status(500).json({
            err
        })
    }
   
}); */
router.post("/",upload.single('image'), async (req, res) => {   
    try {
        const result=await cloudinary.uploader.upload(req.file.path,{upload_preset:"automart"})      
        const newcar = await new Car({
            image: result.secure_url,
            model: req.body.model,
            brand: req.body.brand,
            description: req.body.description,
            year: req.body.year,
            kms: req.body.kms,
            state: req.body.state,
            user_id: req.body.user_id,
            condition: req.body.condition,
            price: req.body.price,
            status: req.body.status,
        });
        const carview = await newcar.save();
        res.status(200).json({
            message: "You have successfully Posted Car",
            data: newcar
        })
    } catch (err) {
        console.log(err)
    }
});
/*------------------------------ Add cars end------------------*/





/*------------------------------ Get all cars start------------------*/
router.get("/", async (req, res) => {

    let query = {};
    let qNew = req.query.new

    if (req.query.brand) {
        query.brand = req.query.brand
    } 

    let total = await Car.countDocuments(query);
    let page = (req.query.page) ? parseInt(req.query.page) : 1;
    let perPage = (req.query.perPage) ? parseInt(req.query.perPage) : 10;
    let skip = (page - 1) * perPage;

    query.push = ({
        $skip: skip
    });
    query.push = ({
        $limit: perPage
    })

    if (req.query.brand) {
        query.$or = [
            { "brand": { $regex: req.query.brand, $options: 'i' } },

        ]
    } else if (req.query.status) {
        query.$or = [
            { "status": { $regex: req.query.status, $options: 'i' } },

        ]
    }

    let diplayallCar = await Car.find(query)
        .populate('brand')
        .populate('model')
        .populate('year')
        .populate('user_id')
        .sort({ createdAt: -1 });
    if (qNew) {
        diplayallCar = await Car.find().sort({ createdAt: -1 })
        .populate('brand')
        .populate('model')
        .populate('year')
        .populate('user_id')
    }

    return res.status(200).json({
        message: "success",
        noofcars: diplayallCar.length,
        

            diplayallCar,
            meta: {
                total: total,
                currentPage: page,
                perPage: perPage,
                totalPages: Math.ceil(total / perPage)
            }
        
    })
   
})

/*------------------------------ Get all cars end------------------*/




/*------------------------------ Get car by User Id Start------------------*/
router.get("/", (req, res)=>{
    try {
        const singleCar =  Car.find({ user_id: req.params.user_id })
            .populate('brand')
            .populate('model')
            .populate('year')
        res.status(200).json({
            message: "success",
            noofadvert: singleCar.length,
            data: singleCar
        })
    }
    catch (err) {
        res.status(500).json({ error: "User Does not exit" })
    }
})
/*------------------------------ Get car by User Id end------------------*/





/*------------------------------ Delete car by Id Start------------------*/
router.delete("/", async (req, res) => {
    try {
        await Car.findOneAndRemove(req.params.id)
        res.status(200).json({ message: "Car Deleted Successfully" })
        console.log(res)
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});
/*------------------------------ Delete car by Id end------------------*/





/*------------------------------ Get car by Id Start------------------*/
router.get("/", async (req, res) => {
    try {
        const singleCar = await Car.findById(req.params.id)
          
        res.status(200).json({
            message: "success",
            noofadvert: singleCar.length,
            data: singleCar
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

/*------------------------------ Get car by Id end------------------*/

module.exports=router




