const { stdout, stderr } = process;
const { head } = require("./src/headLib");

const main = function() {
  const usrArgs = process.argv;
  const outcome = head(usrArgs);
  outcome.lines && stdout.write(outcome.lines);
  outcome.error && stderr.write(outcome.error);
};

main();
