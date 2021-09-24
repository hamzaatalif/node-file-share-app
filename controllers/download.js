const File = require("../db/File");

const downloadFile = async (req,res) => {
    try {
        const file = await File.findOne({
            uuid: req.params.uuid
        })
        if (!file) {
            return res.render("download",{error: "File not found."})
        }
        const filePath = `${__dirname}/../${file.path}`;
        res.download(filePath);
    } catch (error) {
        console.error(error)
    }
}


module.exports = {
    downloadFile
}