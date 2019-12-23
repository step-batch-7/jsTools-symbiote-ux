const loadLines = function(reader, isFileExists, path, encoding) {
  if (isFileExists(path)) {
    let fileContent = reader(path, encoding);
    fileContent = { lines: fileContent.split("\n") };
    return fileContent;
  }
  return { error: `head: ${path}: No such file or directory` };
};

module.exports = { loadLines };
