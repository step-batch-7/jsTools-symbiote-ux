const parseUserOptions = function(usrArgs) {
  const count = +usrArgs[3];
  const noOfLinesGiven = usrArgs[2] == "-n";
  const countIsInteger = Number.isInteger(count);
  const errorMsg = { error: `head : ${usrArgs[3]} illegal count`, lines: "" };
  const defaultOptions = { count: 10, filePath: usrArgs[2] };
  const userOptions = { count: count, filePath: usrArgs[4] };
  if (noOfLinesGiven) {
    if (!(countIsInteger && count > 0)) return errorMsg;
    return userOptions;
  }
  return defaultOptions;
};

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

module.exports = { parseUserOptions, loadLines, head };
