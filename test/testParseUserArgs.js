const assert = require("chai").assert;
const { parseUserOptions } = require("../src/parseUserArgs");

describe("parseUserOptions", () => {
  it("it gives userOptions in the form of objects ,filePath as key and default value of count", () => {
    const actual = parseUserOptions(["node", "head.js", "file1"]);
    const expected = { count: 10, filePath: "file1" };
    assert.deepStrictEqual(actual, expected);
  });
  it("it gives userOptions in the form of objects ,filePath and count as key", () => {
    const actual = parseUserOptions(["node", "head.js", "-n", "3", "file1"]);
    const expected = { count: 3, filePath: "file1" };
    assert.deepStrictEqual(actual, expected);
  });
  it("it gives the error message in object, error as key , if count value is not valid", () => {
    const actual = parseUserOptions(["node", "head.js", "-n", "a", "file1"]);
    const expected = { error: `head : a illegal count`, lines: "" };
    assert.deepStrictEqual(actual, expected);
  });
  it("it gives the error message in object, error as key , if count value is zero", () => {
    const actual = parseUserOptions(["node", "head.js", "-n", "0", "file1"]);
    const expected = { error: `head : 0 illegal count`, lines: "" };
    assert.deepStrictEqual(actual, expected);
  });
  it("it gives userOptions in the form of objects ,filePath and count as key if num is given with '-' ", () => {
    const actual = parseUserOptions(["node", "head.js", "-1", "file1"]);
    const expected = { count: 1, filePath: "file1" };
    assert.deepStrictEqual(actual, expected);
  });
  it("it gives userOptions in the form of objects ,filePath and count as key,if option and count value is given as a string", () => {
    const actual = parseUserOptions(["node", "head.js", "-n5", "file1"]);
    const expected = { count: 5, filePath: "file1" };
    assert.deepStrictEqual(actual, expected);
  });
});
