'use strict';
const isIntegerButNotZero = function(num) {
  const illegalCount = 0;
  return Number.isInteger(num) && num !== illegalCount;
};

const isCountValid = function(option, count) {
  return option.includes('-n') && isIntegerButNotZero(+count);
};

const isFilePathGiven = function(length, option) {
  const noArgsCount = 0;
  return length === noArgsCount || !option.includes('-n');
};

const isFilePath = function(option) {
  return !(option.includes('-n') || isIntegerButNotZero(+option));
};

const getDefaultOptions = function(usrArgs) {
  const [filePath] = usrArgs.filter(isFilePath);
  return {count: '10', filePath: filePath};
};

const parseUserOptions = function(usrArgs) {
  const userOptions = getDefaultOptions(usrArgs);
  const [option, count] = [...usrArgs];
  if (isFilePathGiven(usrArgs.length, option)) {
    return userOptions;
  }
  const optionSeparator = 2;
  userOptions.count = option.slice(optionSeparator) || count;
  if (isCountValid(option, userOptions.count)) {
    return userOptions;
  }
  return {error: `head: illegal line count -- ${userOptions.count}`};
};

const getFirstNLines = function(content, count) {
  let lines = content;
  const startingIndex = 0;
  lines = lines.split('\n');
  return lines.slice(startingIndex, +count).join('\n');
};

const readStdin = function(count, stdinReader, onComplete) {
  const stdin = stdinReader();
  let noOfLines = 1;
  stdin.setEncoding('utf8');
  stdin.on('data', userData => {
    const content = getFirstNLines(userData, count);
    if (noOfLines >= count) {
      stdin.destroy();
    }
    noOfLines++;
    onComplete('', content);
  });
};

const head = function(usrArgs, {readFile, stdinReader}, onComplete) {
  const {error, count, filePath} = parseUserOptions(usrArgs);
  if (error) {
    onComplete(error, '');
    return;
  }
  const extractHeadLines = function(error, content) {
    if (error) {
      onComplete(`head: ${filePath}: No such file or directory`, '');
      return;
    }
    const headLines = getFirstNLines(content, count);
    onComplete('', headLines);
  };
  const read = filePath
    ? () => readFile(filePath, 'utf8', extractHeadLines)
    : () => readStdin(count, stdinReader, onComplete);

  read();
};

module.exports = {
  head,
  parseUserOptions,
  getFirstNLines,
  readStdin
};
