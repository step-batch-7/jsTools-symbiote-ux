const loadLines = function(reader, path, encoding) {
  let fileContent = reader(path, encoding);
  fileContent = { lines: fileContent.split("\n") };
  return fileContent;
};

module.exports = { loadLines };
