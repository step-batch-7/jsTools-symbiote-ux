'use strict';
const StreamPicker = require('./streamPicker');

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

const readFromStream = function({count, filePath}, stream, onComplete) {
  let noOfLines = 1;
  stream.setEncoding('utf8');
  stream.on('data', userData => {
    const content = getFirstNLines(userData, count);
    if (noOfLines >= count) {
      stream.destroy();
    }
    noOfLines++;
    onComplete('', content);
  });
  stream.on('error', () => {
    onComplete(`head: ${filePath}: No such file or directory`, '');
  });
};

const head = function(usrArgs, {createReadStream, stdin}, onComplete) {
  const {error, count, filePath} = parseUserOptions(usrArgs);
  if (error) {
    onComplete(error, '');
    return;
  }
  const userOptions = {count, filePath};
  const stream = new StreamPicker(stdin, createReadStream);
  const reader = stream.pick(filePath);
  readFromStream(userOptions, reader, onComplete);
};

module.exports = {
  head,
  parseUserOptions,
  getFirstNLines,
  readFromStream
};
