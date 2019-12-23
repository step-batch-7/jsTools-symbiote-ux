const giveHeadLines = function(fileContent) {
  return fileContent["lines"].slice(0, 10).join("\n");
};

module.exports = { giveHeadLines };
