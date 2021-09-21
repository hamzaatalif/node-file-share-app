const mongoose = require("mongoose");

async function connectDB(url){
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
    console.log("DB Connected...");
}

module.exports = {
    connectDB
}