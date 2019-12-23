const giveHeadLines = function(fileContent) {
  if (fileContent == null) return `head : no such file or directory`;
  if (fileContent["lines"].length <= 10)
    return fileContent["lines"].join("\n");
  return fileContent["lines"].slice(0, fileContent.count).join("\n");
};

module.exports = { giveHeadLines };
