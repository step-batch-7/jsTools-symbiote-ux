const giveHeadLines = function(fileContent) {
  return fileContent["lines"].slice(0, 11).join("\n");
};

module.exports = { giveHeadLines };
