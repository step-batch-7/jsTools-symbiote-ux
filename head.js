const fs = require('fs');
const { head } = require('./src/headLib');

const displayHeadLines = data => process.stdout.write(data);
const displayErrMsg = err => process.stderr.write(err);

const main = function() {
  const write = { displayHeadLines, displayErrMsg };
  head(process.argv.slice(2), fs, write);
};

main();
