const parseUserOptions = function(usrArgs) {
  return { filePath: usrArgs[2] };
};

module.exports = { parseUserOptions };
