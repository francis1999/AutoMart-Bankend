
const express = require("express")
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path")
dotenv.config();



// This is my Router Declaration
const adminAuthRouter = require("./Routers/adminRouter")






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

app.get("/", (req, res) => {
    res.send("This is Auto Mart Application");
})

const port = process.env.PORT || 8084;

app.listen(port, () => {
    console.log(`We are running on port ${port}`);
})
