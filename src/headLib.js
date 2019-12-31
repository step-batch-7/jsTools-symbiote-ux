const isIntegerButNotZero = function(num) {
  const illegalCount = 0;
  return Number.isInteger(num) && num !== illegalCount;
};

const isCountValid = function(option, count) {
  return option.includes('-n') && isIntegerButNotZero(+count);
};

const isNotOffset = function(length, option) {
  const noArgsCount = 0;
  return length === noArgsCount || !option.includes('-n');
};

const isFilePath = function(option) {
  return !(option.includes('-n') || isIntegerButNotZero(+option));
};

const getDefaultOptions = function(usrArgs) {
  const [filePath] = usrArgs.filter(isFilePath);
  return { count: '10', filePath: filePath };
};

const parseUserOptions = function(usrArgs) {
  const userOptions = getDefaultOptions(usrArgs);
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

const getFirstNLines = function(content, count) {
  let lines = content;
  const startingIndex = 0;
  lines = lines.split('\n');
  return lines.slice(startingIndex, +count).join('\n');
};

const readStdin = function(count, stream, onComplete) {
  let noOfLines = 0;
  stream.setEncoding('utf8');
  stream.on('data', userData => {
    noOfLines++;
    onComplete('', userData);
    if (noOfLines === +count) {
      stream.pause();
    }
  });
  stream.on('end', () => {});
};

const head = function(usrArgs, { readFile, stream }, onComplete) {
  const { error, count, filePath } = parseUserOptions(usrArgs);
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
    : () => readStdin(count, stream, onComplete);

  read();
};

module.exports = {
  head,
  parseUserOptions,
  getFirstNLines,
  readStdin
};
