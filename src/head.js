const { fs } = require("fs");
const { parseUserOptions } = require("./parseUserOptions");
const { loadLines } = require("./loadLines");
const { giveHeadLines } = require("./giveHeadlines");

const main = function() {
  const usrArgs = process.argv;
  const reader = fs.readFileSync;
  const userOptions = parseUserOptions(usrArgs);
  const path = userOptions["filePath"];
  const fileContent = loadLines(reader, path, "utf8");
  const headLines = giveHeadLines(fileContent);
};

main();
