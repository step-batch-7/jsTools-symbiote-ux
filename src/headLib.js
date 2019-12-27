const isIntegerNotZero = function(count) {
  return Number.isInteger(+count) && +count != 0;
};
const isCountValid = function(option, count) {
  return option.includes("-n") && isIntegerNotZero(count);
};

const parseUserOptions = function(usrArgs) {
  const userOptions = { count: 10, filePath: usrArgs.slice(-1) };
  const [option, count] = [...usrArgs];
  if (option.includes("-") && !option.slice(1).includes("n"))
    return { count: option.slice(1), filePath: usrArgs.slice(-1) };
  if (!option.includes("-n")) return userOptions;
  userOptions.count = option.slice(2) || count;
  if (isCountValid(option, userOptions.count)) return userOptions;
  return { error: `head: illegal line count -- ${userOptions.count}`, lines: "" };
};

const loadLines = function(read, isFileExists, filePath, encoding) {
  if (!isFileExists(filePath)) {
    return { error: `head: ${filePath}: No such file or directory`, lines: "" };
  }
  const fileContent = read(filePath, encoding);
  return { lines: fileContent.split("\n") };
};

const head = function(usrArgs, read, isFileExists) {
  const userOptions = parseUserOptions(usrArgs);
  if (userOptions.error) return userOptions;
  const fileContent = loadLines(read, isFileExists, userOptions.filePath[0], "utf8");
  if (fileContent.error) return fileContent;
  return { lines: fileContent["lines"].slice(0, +userOptions.count).join("\n"), error: "" };
};

module.exports = { loadLines, head, parseUserOptions };
