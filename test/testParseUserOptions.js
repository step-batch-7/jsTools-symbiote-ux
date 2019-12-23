const assert = require("chai").assert;
const { parseUserOptions } = require("../src/parseUserOptions");

describe("parseUserOptions", () => {
  it("it gives userOptions in the form of objects ,filePath as key", () => {
    const actual = parseUserOptions(["node", "head.js", "file1"]);
    const expected = { filePath: "file1" };
    assert.deepStrictEqual(actual, expected);
  });
});
