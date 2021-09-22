const multer = require("multer");
const path = require("path")


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"../uploads/")
    },
    filename: (req,file,cb)=>{
        
    }
})

const uploadFile = (req,res,next)=>{
    if (!req.file) {
        return res.json({error: "All feilds are required."})
    }
    res.send("Hello from upload file controller")
    next();
}

module.exports = {
    uploadFile
}