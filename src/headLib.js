const isIntegerNotZero = function(count) {
  const illegalCount = 0;
  return Number.isInteger(+count) && +count !== illegalCount;
};
const isCountValid = function(option, count) {
  return option.includes('-n') && isIntegerNotZero(count);
};

const isNotOffset = function(length, option) {
  return length === 0 || !option.includes('-n');
};

const parseUserOptions = function(usrArgs) {
  const idx = 1;
  const userOptions = { count: 10, filePath: usrArgs[usrArgs.length - idx] };
  const [option, count] = [...usrArgs];
  if (isNotOffset(usrArgs.length, option)) {
    return userOptions;
  }
  const optionSeparator = 2;
  userOptions.count = option.slice(optionSeparator) || count;
  if (isCountValid(option, userOptions.count)) {
    return userOptions;
  }
  return { error: `head: illegal line count -- ${userOptions.count}` };
};

const giveStartingLines = function(content, count) {
  let lines = content;
  const startingIndex = 0;
  lines = lines.split('\n');
  return lines.slice(startingIndex, +count).join('\n');
};

const onHeadComplete = function(userOptions, err, data) {
  const filePath = userOptions.filePath;
  if (err) {
    this.displayErrMsg(`head: ${filePath}: No such file or directory`);
    return;
  }
  const headLines = giveStartingLines(data, userOptions.count);
  this.displayHeadLines(headLines);
};

const head = function(usrArgs, read, write) {
  const { error, count, filePath } = parseUserOptions(usrArgs);
  if (error) {
    return write.displayErrMsg(error);
  }
  if (filePath) {
    read.readFile(
      filePath,
      'utf8',
      onHeadComplete.bind(write, { count, filePath })
    );
  }
};
module.exports = { head, parseUserOptions };
