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

module.exports = { loadLines };
