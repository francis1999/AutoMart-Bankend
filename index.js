
const express = require("express")
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");






//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));








app.get("/", (req, res) => {
    res.send("This is Auto Mart Application");
})

const port = process.env.PORT || 8084;

app.listen(port, () => {
    console.log(`We are running on port ${port}`);
})
