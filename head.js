const { stdout, stderr } = process;
const fs = require("fs");
const { parseUserOptions, loadLines, giveHeadLines } = require("./src/headLib");

const main = function() {
  const usrArgs = process.argv;
  const reader = fs.readFileSync;
  const isFileExists = fs.existsSync;
  const userOptions = parseUserOptions(usrArgs);
  const fileContent = loadLines(reader, isFileExists, userOptions, "utf8");
  const outcome = giveHeadLines(fileContent);
  outcome.lines && stdout.write(outcome.lines);
  outcome.error && stderr.write(outcome.error);
};

main();
