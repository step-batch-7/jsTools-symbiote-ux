const fs = require("fs");
const { parseUserOptions } = require("./src/parseUserOptions");
const { loadLines } = require("./src/loadLines");
const { giveHeadLines } = require("./src/giveHeadlines");

const main = function() {
  const usrArgs = process.argv;
  const reader = fs.readFileSync;
  const isFileExists = fs.existsSync;
  const userOptions = parseUserOptions(usrArgs);
  const path = userOptions["filePath"];
  const fileContent = loadLines(reader, isFileExists, path, "utf8");
  console.log(giveHeadLines(fileContent));
};

main();
