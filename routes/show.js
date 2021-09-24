const express = require("express");
const router = express.Router();
const {showFile} = require("../controllers/show")

router.route("/:uuid").get(showFile);

module.exports = router;