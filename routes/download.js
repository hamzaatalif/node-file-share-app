const express = require("express");
const downloadRouter = express.Router();
const {downloadFile} = require("../controllers/download");

downloadRouter.route("/:uuid").get(downloadFile);

module.exports = downloadRouter;