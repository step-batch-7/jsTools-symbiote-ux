const giveHeadLines = function(fileContent) {
  if (fileContent["lines"].length <= 10) return fileContent["lines"].join("\n");
  return fileContent["lines"].slice(0, 10).join("\n");
};

module.exports = { giveHeadLines };
