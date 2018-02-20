var CopyWebpackPlugin = require('copy-webpack-plugin');
var Jimp = require("jimp");

module.exports = {
  plugins: [
    // new class {
    new Object({ // custom task: resize image and copy them
      apply(compiler) {
        compiler.plugin("emit", async function(compilation, callback) {
          var image = await Jimp.read('src/image.jpg');
          image.resize(500, Jimp.AUTO).write('dist/image-500.jpg');
          image.resize(256, Jimp.AUTO).write('dist/image-256.jpg');
          callback();
        });
      }
    })
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
    //
    //   }
    // ]),


  ]
};
