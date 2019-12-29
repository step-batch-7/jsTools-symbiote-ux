const isIntegerNotZero = function(count) {
  return Number.isInteger(+count) && +count !== 0;
};
const isCountValid = function(option, count) {
  return option.includes('-n') && isIntegerNotZero(count);
};

const parseUserOptions = function(usrArgs) {
  const userOptions = { count: 10, filePath: usrArgs.slice(-1) };
  const [option, count] = [...usrArgs];
  if (option.includes('-') && !option.slice(1).includes('n')) {
    return { count: option.slice(1), filePath: usrArgs.slice(-1) };
  }
  if (!option.includes('-n')) {
    return userOptions;
  }
  userOptions.count = option.slice(2) || count;
  if (isCountValid(option, userOptions.count)) {
    return userOptions;
  }
  return { error: `head: illegal line count -- ${userOptions.count}` };
};

const sortLines = function(lines, count) {
  lines = lines.split('\n');
  return lines.slice(0, +count).join('\n');
};

const filterHeadLines = function(userOptions, err, data) {
  if (err) {
    this.displayErrMsg(
      `head: ${userOptions.filePath[0]}: No such file or directory`
    );
    return;
  }
  const headLines = sortLines(data, userOptions.count);
  this.displayHeadLines(headLines);
};

const head = function(usrArgs, read, write) {
  const userOptions = parseUserOptions(usrArgs);
  if (userOptions.error) {
    return write.displayErrMsg(userOptions.error);
  }
  read.readFile(
    userOptions.filePath[0],
    'utf8',
    filterHeadLines.bind(write, userOptions)
  );
};

module.exports = { head, parseUserOptions };
