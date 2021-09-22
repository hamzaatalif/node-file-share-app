const uploadFile = (req,res,next)=>{
    res.send("Hello from upload file controller")
    next();
}

module.exports = {
    uploadFile
}