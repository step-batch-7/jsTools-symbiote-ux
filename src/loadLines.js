const loadLines = function(reader, path, encoding) {
  const fileContent = reader(path, encoding);
  return fileContent.split("\n");
};

module.exports = { loadLines };
