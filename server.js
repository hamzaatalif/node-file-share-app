require("dotenv").config();
const express = require("express");
const path = require("path")
const ejs = require("ejs")

// local dependencies
const connectDB = require("./db/connect");
const fileRouter = require("./routes/file");
const showRouter = require("./routes/show");
const downloadRouter = require("./routes/download");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("views",path.join(__dirname,'/views'));
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,'/public')))

// middlewares
app.use("/api/file",fileRouter)
app.use("/files",showRouter)
app.use("/files/download",downloadRouter);




const start = async ()=> {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("DB Connected...")
        app.listen(PORT)
        console.log(`App is listening on port: ${PORT}...`)
    } catch (error) {
        console.error(error)
    }
}
start();

