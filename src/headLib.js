const { parseUserOptions } = require("./parseUserArgs");

const loadLines = function(read, isFileExists, filePath, encoding) {
  if (!isFileExists(filePath)) {
    return { error: `head : ${filePath} : no such file or directory`, lines: "" };
  }
  const fileContent = read(filePath, encoding);
  return { lines: fileContent.split("\n") };
};

const head = function(usrArgs, read, isFileExists) {
  const userOptions = parseUserOptions(usrArgs);
  if (userOptions.error) return userOptions;
  const fileContent = loadLines(read, isFileExists, userOptions.filePath, "utf8");
  if (fileContent.error) return fileContent;
  return { lines: fileContent["lines"].slice(0, userOptions.count).join("\n"), error: "" };
};

module.exports = { loadLines, head };
