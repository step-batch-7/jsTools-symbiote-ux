const fs = require('fs');
const { head } = require('./src/headLib');

const displayHeadLines = data => process.stdout.write(data);
const displayErrMsg = err => process.stderr.write(err);

const main = function() {
  const [, , ...usrArgs] = process.argv;
  const write = { displayHeadLines, displayErrMsg };
  head(usrArgs, fs, write);
};

main();
