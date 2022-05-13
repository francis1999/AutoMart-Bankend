const router=require("express").Router();
const Car = require("../Models/carModel")
const cloudinary=require("../utils/cloudinary")
const upload=require("../utils/multer")
const path = require("path")

/* 

module.exports.testcar=('/', (req, res)=>{
    const uploader = async(path)=> cloudinary.uploads(path)
    if(req.method==='POST'){
        const urls=[]
        const files=req.files
        for(const file of files){
            const {path}=file
            const newpath = uploader(path)
            urls.push(newpath)
            fs.unlinkSync(path)
        }
        res.status(201).json({
            message:"Images uploaded successfully",
            data:urls
        })
    }else{
        res.status(405).json({
            message:"Not Successful"
        })
    }
})



 */



/*------------------------------ Add cars start------------------*/
router.post("/",upload.array('image'), async (req, res) => {
   
    try {
        const result=await cloudinary.uploader.upload(req.file.path)
        const result2=result.secure_url
        
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
        /* res.send(result) */
        
        const carview = await newcar.save();
        res.status(200).json({
            message: "You have successfully Posted Car",
            data: newcar
        })
    } catch (err) {
        console.log(err)
       /*  res.status(500).json({
            error: err
        }) */
    }
});
/*------------------------------ Add cars end------------------*/





/*------------------------------ Get all cars start------------------*/
module.exports.Getallcar = ("/", async (req, res) => {

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
module.exports.GetCarbyUserID = async (req, res) => {
    try {
        const singleCar = await Car.find({ user_id: req.params.user_id })
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
}
/*------------------------------ Get car by User Id end------------------*/





/*------------------------------ Delete car by Id Start------------------*/
module.exports.DeleteCar = ("/:id", async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Car Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});
/*------------------------------ Delete car by Id end------------------*/





/*------------------------------ Get car by Id Start------------------*/
module.exports.GetCarbyID = ("/:id", async (req, res) => {
    try {
        const singleCar = await Car.findById(req.params.id)
            .populate('brand')
            .populate('model')
            .populate('year')
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




