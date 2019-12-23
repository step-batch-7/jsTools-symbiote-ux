const loadLines = function(reader, isFileExists, userOptions, encoding) {
  if (!isFileExists(userOptions.filePath)) return null;
  const fileContent = reader(userOptions.filePath, encoding);
  userOptions.lines = fileContent.split("\n");
  return userOptions;
};

module.exports = { loadLines };
