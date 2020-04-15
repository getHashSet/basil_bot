require("dotenv").config();
const jimp = require("jimp");
const tinify = require("tinify");
const path = require("path");
tinify.key = process.env.TINY_PNG_API_KEY;

function editController(obj) {
  console.log("jimp started");

  jimp.read(obj.url).then((image) => {
    image.cover(1600, 1000, function () {});
    image.quality(70);
    image.write(`./temp/${obj.name}_lg.jpg`, function () {
      console.log(`Created ${obj.name}_lg.jpg`);
        const source = tinify.fromFile(`./temp/${obj.name}_lg.jpg`);
        source.toFile(`./temp/${obj.name}_lg.jpg`);

      jimp
        .read(path.join(__dirname, `../temp/${obj.name}_lg.jpg`))
        .then((image) => {
          image.cover(1000, 1000, function () {});
          image.quality(70);
          image.write(
            path.join(__dirname, `../temp/${obj.name}_md.jpg`),
            function () {
              console.log(`Created ${obj.name}_md.jpg`);
              const source = tinify.fromFile(`./temp/${obj.name}_md.jpg`);
              source.toFile(`./temp/${obj.name}_md.jpg`);
            }
          );
        });

        jimp
        .read(path.join(__dirname, `../temp/${obj.name}_lg.jpg`))
        .then((image) => {
          image.cover(1000, 1000, function () {});
          image.quality(70);
          image.blur(50);
          image.write(
            path.join(__dirname, `../temp/${obj.name}_md_ph.jpg`),
            function () {
              console.log(`Created ${obj.name}_md_ph.jpg`);
            }
          );
        });
    });
  });

    jimp.read(obj.url).then((image) => {
      image.cover(1600, 1000, function () {});
      image.quality(70);
      image.blur(50);
      image.write(`./temp/${obj.name}_lg_ph.jpg`, function () {
        console.log(`Created ${obj.name}_lg_ph.jpg`);
      });
    });

    jimp.read(obj.url).then((image) => {
      image.cover(375, 667, function () {});
      image.quality(70);
      image.write(`./temp/${obj.name}_sm.jpg`, function () {
        console.log(`Created ${obj.name}_sm.jpg`);
        const source = tinify.fromFile(`./temp/${obj.name}_sm.jpg`);
        source.toFile(`./temp/${obj.name}_sm.jpg`);
      });
    });

    jimp.read(obj.url).then((image) => {
      image.cover(357, 667, function () {});
      image.quality(70);
      image.blur(50);
      image.write(`./temp/${obj.name}_sm_ph.jpg`, function () {
        console.log(`Created ${obj.name}_sm_ph.jpg`);
      });
    });

  return;
}

module.exports = editController;

/*

lg - 1600 x 1000px
md - 1100 x autopx (of lg)
sm - 900 x 1000px (of lg)

*/
