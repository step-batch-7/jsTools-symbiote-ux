const { readFile } = require('fs');
const { stdout, stderr, stdin } = process;
const { head } = require('./src/headLib');

const displayHeadLines = data => stdout.write(data);
const displayErrMsg = err => stderr.write(err);

const main = function() {
  const [, , ...usrArgs] = process.argv;
  const write = { displayHeadLines, displayErrMsg };
  const headTools = { read: readFile, stream: stdin };
  head(usrArgs, headTools, write);
};

main();
