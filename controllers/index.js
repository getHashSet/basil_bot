const router = require("express").Router();
const exampleController = require("./example.controller");
const jimpController = require("./jimp.controller");

router.use("/api/example", exampleController);

router.use("/jimp", jimpController);

module.exports = router;