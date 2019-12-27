const fs = require("fs");
const { head } = require("./src/headLib");

const main = function() {
  const headOutcome = head(process.argv.slice(1), fs.readFileSync, fs.existsSync);
  process.stdout.write(headOutcome.lines);
  process.stderr.write(headOutcome.error);
};

main();
