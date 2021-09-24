const express = require("express");
const Router = express.Router();
const {uploadFile,sendFile} = require("../controllers/file");

Router.route("/").post(uploadFile)
Router.route("/send").post(sendFile)

module.exports = Router;