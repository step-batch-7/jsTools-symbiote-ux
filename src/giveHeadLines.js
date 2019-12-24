const giveHeadLines = function(fileContent) {
  if (fileContent.hasOwnProperty("error")) return fileContent;
  // if (fileContent["lines"].length <= 10) return fileContent["lines"].join("\n");
  return { lines: fileContent["lines"].slice(0, fileContent.count).join("\n") };
};

module.exports = { giveHeadLines };
