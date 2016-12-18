const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const ftpPath = process.argv[2]
const ext = process.argv[3]
const filesPath = `copy/${ftpPath}`
imagemin([`${filesPath}/*${ext}`], `optimized/${ftpPath}`, {
  plugins: [
    imageminMozjpeg(),
    imageminPngquant()
  ]
}).then(() => {
    console.log('Images optimized');
});
