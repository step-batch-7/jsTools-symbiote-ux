const assert = require("chai").assert;
const { parseUserOptions } = require("../src/parseUserOptions");

describe("parseUserOptions", () => {
  it("it gives userOptions in the form of objects ,filePath as key and default value of count", () => {
    const actual = parseUserOptions(["node", "head.js", "file1"]);
    const expected = { count: 10, filePath: "file1" };
    assert.deepStrictEqual(actual, expected);
  });
  it("it gives userOptions in the form of objects ,filePath and count as key", () => {
    const actual = parseUserOptions(["node", "head.js", "-n", "3", "file1"]);
    const expected = { count: "3", filePath: "file1" };
    assert.deepStrictEqual(actual, expected);
  });
});
