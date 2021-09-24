const express = require("express");
const multer = require("multer");
const Router = express.Router();

const path = require("path")
const File = require("../db/File");
const {v4: uuidv4} = require("uuid");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/")
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    },
})

const upload = multer({
    storage,
    limits: {fileSize: 1000000 * 10}
}).single('myfile')



Router.route("/").post((req,res)=>{
    upload (req, res, async (err)=>{
    
        if (err) {
            return res.status(500).send({error: err.message});
        }
        const file = new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        })
        const response = await file.save();
        return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
    
    })
})

module.exports = Router;