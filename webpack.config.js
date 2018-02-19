var CopyWebpackPlugin = require('copy-webpack-plugin');
var Jimp = require("jimp");

module.exports = {
  plugins: [
    // new CopyWebpackPlugin([
    //   {
    //     from: 'src/image.jpg',
    //     to: 'dist/',
    //     // transform (content, path) {
    //     //   // return content;
    //     //   console.log(content, "content");
    //     //   return Jimp.read(content)
    //     //   .then(function(image) {
    //     //     console.log(image, "image");
    //     //     return
    //     //     return image.resize(256, Jimp.AUTO)     // resize
    //     //     // .quality(60)                 // set JPEG quality
    //     //     // .greyscale()                 // set greyscale
    //     //     // .write(); // save
    //     //     .getBuffer(Jimp.MIME_JPEG, function(err, buff) {
    //     //       console.log(buff, "bufff");
    //     //     }); // save
    //     //   })
    //     //   .then(function(buf) {
    //     //     console.log(buf, "buf");
    //     //   })
    //     //   .catch(function (err) {
    //     //     console.error(err, "err");
    //     //   });
    //     // }
    //   }
    // ]),
    function() {
      Jimp.read('src/image.jpg')
      .then(function(image) {
        image.resize(500, Jimp.AUTO)     // resize
        .write('dist/image-500.jpg'); // save

        return image.resize(256, Jimp.AUTO)     // resize
        // .quality(60)                 // set JPEG quality
        // .greyscale()                 // set greyscale
        .write('dist/image-256.jpg'); // save
      });
    }
  ],
};
