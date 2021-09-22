require("dotenv").config();

const express = require("express");

// local dependencies
const connectDB = require("./db/connect");
const fileRouter = require("./routes/file");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares

app.use("/api/file",fileRouter)



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

