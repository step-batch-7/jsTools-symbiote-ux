const { parseUserOptions } = require("./parseUserOptions");

const main = function() {
  const usrArgs = process.argv;
  const userOptions = parseUserOptions(usrArgs);
};

main();
