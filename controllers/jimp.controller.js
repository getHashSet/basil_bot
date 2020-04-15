const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const editController = require('./edit.controller');
require("dotenv").config();

let imageName = "image";

// GET
router.route("/:fileName").get((req, res) => {
  req.params.fileName
    ? (imageName = req.params.fileName)
    : (imageName = `image${Date.now()}`);
  res.send(`Collected: ${imageName}`);
});

// POST
router.route("/").post((req, res) => {
  const storage = multer.diskStorage({
    destination: `${__dirname}/temp`,
    filename: function (req, file, cb) {
      cb(null, file.fieldname + path.extname(file.originalname));
    },
  });

  function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Please upload a jpg or png.");
    }
  }

  let upload = multer({
    storage: storage,
    limits: { fileSize: 80000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single(imageName);

  upload(req, res, (err) => {
    // from here you may use jimp
    let fileLocation = path.join(__dirname, `./temp/${req.file.filename}`);

    console.log('next step')
    editController({name: imageName, dir: `${__dirname}/temp`, url: fileLocation});
    
      res.json({
        large: `${imageName}_lg.jpg`,
        largePh: `${imageName}_lg_ph.jpg`,
        medium: `${imageName}_md.jpg`,
        mediumPh: `${imageName}_md_ph.jpg`,
        small: `${imageName}_sm.jpg`,
        smallPh: `${imageName}_sm_ph.jpg`,
      });

  });
});

module.exports = router;
