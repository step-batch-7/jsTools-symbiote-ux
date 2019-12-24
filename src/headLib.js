const parseUserOptions = function(usrArgs) {
  if (usrArgs[2] == "-n") {
    if (!(Number.isInteger(+usrArgs[3]) && +usrArgs[3] > 0)) {
      return { error: `head : ${usrArgs[3]} illegal count` };
    }
    return { count: +usrArgs[3], filePath: usrArgs[4] };
  }
  return { count: 10, filePath: usrArgs[2] };
};

const loadLines = function(read, isFileExists, userOptions, encoding) {
  if (!isFileExists(userOptions.filePath)) {
    return {
      error: `head : ${userOptions.filePath} : no such file or directory`
    };
  }
  const fileContent = read(userOptions.filePath, encoding);
  return { lines: fileContent.split("\n") };
};

const head = function(usrArgs, read, isFileExists) {
  const userOptions = parseUserOptions(usrArgs);
  if (userOptions.error) return userOptions;
  const fileContent = loadLines(read, isFileExists, userOptions, "utf8");
  if (fileContent.error) return fileContent;
  return { lines: fileContent["lines"].slice(0, userOptions.count).join("\n") };
};

module.exports = { parseUserOptions, loadLines, head };