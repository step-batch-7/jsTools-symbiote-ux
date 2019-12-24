const fs = require("fs");
const { stdout, stderr } = process;
const { head } = require("./src/headLib");

const main = function() {
  const usrArgs = process.argv;
  const outcome = head(usrArgs, fs.readFileSync, fs.existsSync);
  stdout.write(outcome.lines);
  stderr.write(outcome.error);
};

main();
