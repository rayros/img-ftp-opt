const ftpConfig = require('./config.json')
const Ftp = require('ftp')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const ftpPath = process.argv[2]
const ext = new RegExp(process.argv[3] + '$')
const connection = new Ftp();
connection.on('ready', () => {
  fs.readdir(`optimized/${ftpPath}`, (err, files) => {
    let promiseChain = Promise.resolve()
    files
    .filter(file => ext.test(file))
    .forEach(file => {
      promiseChain = promiseChain.then(() => {
        return new Promise((resolve) => {
          connection.put(`optimized/${ftpPath}${file}`, `${ftpPath}${file}`, (err) => {
            if (err) throw err
            console.log(`put ${file}`)
            resolve();
          })
        })
      })
    });
    promiseChain
    .then(() => {
      connection.end();
    })
  })
})
connection.connect(ftpConfig);
