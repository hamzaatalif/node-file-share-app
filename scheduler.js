require("dotenv").config();
const File = require("./db/File");
const fs = require("fs");
const connectDB = require("./db/connect");
connectDB(process.env.MONGO_URI)
console.log("DB Connected...")
async function fetchData() {
    const pastDate = new Date(Date.now() - (24 * 60 * 60 * 1000));
    const files = await File.find({
        createdAt: {$lt: pastDate}
    })
    if (files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path)
                await file.remove();
                console.log(`Successfully deleted ${file.filename}...`);
            } catch (error) {
                console.error(error)
            }
        }
    }
}

fetchData().then(()=>{
    console.log("Job Done Successfully!")
    process.exit();
});