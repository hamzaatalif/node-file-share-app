const express = require("express");
const Router = express.Router();
const {uploadFile} = require("../controllers/file");

Router.route("/").post(uploadFile)

module.exports = Router;