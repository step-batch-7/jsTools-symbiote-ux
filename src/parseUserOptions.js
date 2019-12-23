const parseUserOptions = function(usrArgs) {
  if (usrArgs.includes("-n")) {
    return { count: usrArgs[3], filePath: usrArgs[4] };
  }
  return { count: 10, filePath: usrArgs[2] };
};

module.exports = { parseUserOptions };
