
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








//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));



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

app.get("/", (req, res) => {
    res.send("This is Auto Mart Application");
})


/******** Add Car Route start */
app.use('/api/addcar', require('./Controllers/carController'))
/******** Add Car Route end */






app.use('/uploads', express.static('uploads'))
const port = process.env.PORT || 8084;

app.listen(port, () => {
    console.log(`We are running on port ${port}`);
})
