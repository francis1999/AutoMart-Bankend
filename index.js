
const express = require("express")
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path")
const bodyParser=require("body-parser")
const upload=require("./utils/multer")
dotenv.config();

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(bodyParser.json())

// This is my Router Declaration
const adminAuthRouter = require("./Routers/adminRouter")
const userRouter = require("./Routers/userRouter");
const stateRouter = require("./Routers/stateRouter")
const modelRouter = require("./Routers/modelRouter")
const yearRouter = require("./Routers/yearRouter")
const varientRouter = require("./Routers/varientRouter")
const kilometerRouter = require("./Routers/kilometerRouter")
const brandRouter = require('./Routers/brandRouter');
const carRouter = require('./Routers/carRouter');
const multipleFileRouter = require('./Routers/multiplefileupload');

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled" })
})

mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected Successfuly")
}).catch(() => {
    console.log("Opps!!! Error in Connection");
}) 

// This is my routes
app.use("/api/admin", adminAuthRouter);
app.use("/api/user", userRouter);
app.use("/api/state", stateRouter);
app.use("/api/year", yearRouter);
app.use("/api/varient", varientRouter);
app.use("/api/kilometer", kilometerRouter);
app.use("/api/brand", brandRouter);
app.use("/api/model", modelRouter);
app.use("/api/car", carRouter);
app.use("/api/multiplefile", multipleFileRouter);

app.get("/", (req, res) => {
    res.send("This is Auto Mart Application");
})

/******** Add Car Route start */
app.use('/api/car/', require('./Controllers/carController'))
app.use('/api/Getallcar', require('./Controllers/carController'))
app.use('/api/getcarbyuserid', require('./Controllers/carController'))
app.use('/api/deletecar/:id', require('./Controllers/carController'))
app.use('/api/getcarbyid/:id', require('./Controllers/carController'))
/******** Add Car Route end */

app.use('/uploads', express.static('uploads'))
const port = process.env.PORT || 8084;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.listen(port, () => {
    console.log(`We are running on port ${port}`);
})
