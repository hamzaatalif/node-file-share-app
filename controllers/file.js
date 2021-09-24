const multer = require("multer");
const path = require("path");
const {v4: uuidv4} = require("uuid");
const File = require("../db/File");
const sendMail = require("../services/email");

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


const uploadFile = (req,res) => {
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
}

const sendFile = async (req,res) => {
    const { uuid, emailTo, emailFrom } = req.body;
    if (!uuid || !emailTo || !emailFrom) {
        return res.status(422).send({error: "All fields are required."})
    }
    const file = await File.findOne({
        uuid: uuid
    });
    if (file.sender) {
        return res.status(420).send({error: "Email already sent."})
    }
    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();

    const sendMail = require("../services/email");

    sendMail({
        from: emailFrom,
        to: emailTo,
        subject: "pkshare file sharing",
        text: `${emailFrom} has shared a file with you`,
        html: require("../services/emailTemplate")({
            emailFrom: emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: parseInt(file.size/1000)+ ' kb',
            expires: '24 hours'
        }),
    });

    return res.send({success: true})
}


module.exports = {
    uploadFile,
    sendFile
}