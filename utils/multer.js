

const multer=require("multer")


const storage=multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
    
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype==='image/jpeg' || 'image/jpg' || 'image/png'){
        cb(null, true)
    }else{
        cb({message:"unsupported File Format"},false);
    }
}

const upload=multer({
    storage:storage,
    limits:{fileSize:1024 * 1024},
    fileFilter:fileFilter
})

module.exports=upload;















/*  const multer = require('multer');
const router = require("express").Router();
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname))
        //cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jfif') {
        cb(null, true);
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits:
    {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});


function errhandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.status(501).json({
            success: 0,
            message: err.message
        })
    }
}

router.use(errhandler);



module.exports = {
    upload: upload
} 
 */


/* const multer=require("multer")


const storage=multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
    
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype==='image/jpeg' || 'image/jpg' || 'image/png'){
        cb(null, true)
    }else{
        cb({message:"unsupported File Format"},false);
    }
}

const upload=multer({
    storage:storage,
    limits:{fileSize:1024 * 1024},
    fileFilter:fileFilter
})

module.exports=upload; */

/* const multer = require("multer")
const path = require("path") */

/* module.exports=multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let ext = path.extname(file.originalname);
        if(ext !==".jpg" && ext !==".jpeg" && ext !==".png"){
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true)
    },
}); */
