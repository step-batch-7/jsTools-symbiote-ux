const parseUserOptions = function(userArgs) {
  const filePath = userArgs[userArgs.length - 1];
  if (userArgs.length == 3) count = 10;
  if (userArgs[2].slice(0, 1) == "-") count = userArgs[2].slice(1);
  if (userArgs[2].slice(0, 2) == "-n") count = userArgs[2].slice(2);
  if (userArgs[2] == "-n") count = userArgs[3];
  if (Number.isInteger(+count) && +count != 0) return { count: +count, filePath };
  return { error: `head : ${count} illegal count`, lines: "" };
};

module.exports = { parseUserOptions };
