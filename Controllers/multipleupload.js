'use strict';
const Car = require("../Models/carModel")

    const multipleFileUpload= async(req, res, next)=>{
        try {
            let fileArray=[]
            req.files.forEach(element=>{
                const file ={
                    fileName:element.originalname,
                    filePath:element.path,
                    fileType:element.mimetype,
                    //fileSize:fileSizeFormatter(element.size, 2)
                }
                fileArray.push(file);
            })
            const multipleFiles=new Car({
                image: fileArray,
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
            await multipleFiles.save();
            res.status(201).send("file uploaded successfully")
        } 
        catch(error) {
                res.status(400).send(error.message)
        }
    }
   

module.exports=multipleFileUpload
