const fs = require('fs');
const { stdout, stderr } = process;
const { head } = require('./src/headLib');

const displayHeadLines = data => stdout.write(data);
const displayErrMsg = err => stderr.write(err);

const main = function() {
  const [, , ...usrArgs] = process.argv;
  const write = { displayHeadLines, displayErrMsg };
  head(usrArgs, fs, write);
};

main();
