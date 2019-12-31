const { readFile } = require('fs');
const { stdout, stderr, stdin } = process;
const { head } = require('./src/headLib');

const displayResult = function(error, content) {
  stdout.write(content);
  stderr.write(error);
};

const main = function() {
  const [, , ...usrArgs] = process.argv;
  const headTools = { readFile, stdin };
  head(usrArgs, headTools, displayResult);
};

main();
