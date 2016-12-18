// node put.js www/wp-content/uploads/2016/01/ .png download
const ftpConfig = require('./config.json')
const Ftp = require('ftp')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const ftpPath = process.argv[2]
const ext = new RegExp(process.argv[3] + '$')
const download = process.argv[4]
const connection = new Ftp();
connection.on('ready', () => {
  connection.list(ftpPath, (err, list) => {
    if (err) throw err;
    let promiseChain = Promise.resolve()
    list.filter(o => ext.test(o.name))
    .forEach((o) => {
      promiseChain = promiseChain.then(() => {
        return new Promise((resolve) => {
          let file = `${filePath}${o.name}`
          if (download) {
              connection.get(`${ftpPath}${o.name}`, (err, stream) => {
                  if (err) {
                    console.log(err);
                    return resolve();
                  }
                  writableStream = fs.createWriteStream(file)
                  stream.pipe(writableStream)
                  writableStream.on('finish', (err) => {
                    if (err) throw err
                    console.log(o.name)
                    resolve()
                  });
              });
          } else {
            resolve()
            console.log(o.name)
          }
        })
      })
    })
    promiseChain
    .then(() => {
      connection.end();
    })
  })
})
const filePath = `copy/${ftpPath}`
mkp = new Promise((resolve) => {
  if (download) {
    mkdirp(filePath, (err) => {
      console.log(filePath)
      if (err) throw err
      resolve()
    })
  } else {
    resolve()
  }
})
mkp.then(() => {
  connection.connect(ftpConfig);
})
