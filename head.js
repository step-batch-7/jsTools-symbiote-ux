const fs = require("fs");

const { stdout, stderr } = process;
const { head } = require("./src/headLib");

const main = function() {
  const usrArgs = process.argv;
  const outcome = head(usrArgs, fs.readFileSync, fs.existsSync);
  outcome.lines && stdout.write(outcome.lines);
  outcome.error && stderr.write(outcome.error);
};

main();
