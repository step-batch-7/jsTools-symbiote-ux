const fs = require("fs");

const parseUserOptions = function(usrArgs) {
  if (usrArgs.includes("-n")) {
    return { count: usrArgs[3], filePath: usrArgs[4] };
  }
  return { count: 10, filePath: usrArgs[2] };
};

const loadLines = function(reader, isFileExists, userOptions, encoding) {
  if (!isFileExists(userOptions.filePath)) {
    return {
      error: `head : ${userOptions.filePath} : no such file or directory`
    };
  }
  const fileContent = reader(userOptions.filePath, encoding);
  userOptions.lines = fileContent.split("\n");
  return userOptions;
};

const giveHeadLines = function(fileContent) {
  if (fileContent.hasOwnProperty("error")) return fileContent;
  return { lines: fileContent["lines"].slice(0, fileContent.count).join("\n") };
};

const head = function(usrArgs) {
  const reader = fs.readFileSync;
  const isFileExists = fs.existsSync;
  const userOptions = parseUserOptions(usrArgs);
  const fileContent = loadLines(reader, isFileExists, userOptions, "utf8");
  return giveHeadLines(fileContent);
};

module.exports = { parseUserOptions, loadLines, giveHeadLines, head };
