const assert = require("chai").assert;
const { loadLines, head, parseUserOptions } = require("../src/headLib");

describe("parseUserOptions", () => {
  it("it gives userOptions in the form of objects ,filePath as key and default value of count", () => {
    const actual = parseUserOptions(["file1"]);
    const expected = { count: 10, filePath: ["file1"] };
    assert.deepStrictEqual(actual, expected);
  });
  it("it gives userOptions in the form of objects ,filePath and count as key", () => {
    const actual = parseUserOptions(["-n", "3", "file1"]);
    const expected = { count: "3", filePath: ["file1"] };
    assert.deepStrictEqual(actual, expected);
  });
  it("it gives the error message in object, error as key , if count value is not valid", () => {
    const actual = parseUserOptions(["-n", "a", "file1"]);
    const expected = { error: `head: illegal line count -- a`, lines: "" };
    assert.deepStrictEqual(actual, expected);
  });
  it("it gives the error message in object, error as key , if count value is zero", () => {
    const actual = parseUserOptions(["-n", "0", "file1"]);
    const expected = { error: `head: illegal line count -- 0`, lines: "" };
    assert.deepStrictEqual(actual, expected);
  });
  it("it gives userOptions in the form of objects ,filePath and count as key,if option and count value is given as a string", () => {
    const actual = parseUserOptions(["-n5", "file1"]);
    const expected = { count: "5", filePath: ["file1"] };
    assert.deepStrictEqual(actual, expected);
  });
  it("it gives userOptions in the form of objects ,filePath and count as key,if only count is given", () => {
    const actual = parseUserOptions(["-5", "file1"]);
    const expected = { count: "5", filePath: ["file1"] };
    assert.deepStrictEqual(actual, expected);
  });
});
describe("loadLines", () => {
  it("should load the content of the file give in the form of array if file is present", () => {
    const reader = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11";
    };

    const isFileExists = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const actual = loadLines(reader, isFileExists, "path", "utf8");
    const expected = {
      lines: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should gives the error if file is not present", () => {
    const reader = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11";
    };

    const isFileExists = function(path) {
      assert.strictEqual(path, "path");
      return false;
    };
    const actual = loadLines(reader, isFileExists, "path", "utf8");
    assert.deepStrictEqual(actual, {
      error: `head: path: No such file or directory`,
      lines: ""
    });
  });
});

describe("head", () => {
  it("should give error for the given userArgs ,if count value is invalid", () => {
    const userArgs = ["-n", "a", "path"];
    const reader = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return;
    };

    const isFileExists = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const actual = head(userArgs, reader, isFileExists);
    assert.deepStrictEqual(actual, { error: `head: illegal line count -- a`, lines: "" });
  });
  it("should give error for the given userArgs ,if file is not present", () => {
    const userArgs = ["-n", "4", "path"];
    const reader = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11";
    };

    const isFileExists = function(path) {
      assert.strictEqual(path, "path");
      return false;
    };
    const actual = head(userArgs, reader, isFileExists);
    assert.deepStrictEqual(actual, { error: `head: path: No such file or directory`, lines: "" });
  });
  it("give the content of file , if the count value is valid and file is present", () => {
    const userArgs = ["-n", "4", "path"];
    const reader = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11";
    };

    const isFileExists = function(path) {
      assert.deepStrictEqual(path, "path");
      return true;
    };
    const actual = head(userArgs, reader, isFileExists);
    assert.deepStrictEqual(actual, { lines: "1\n2\n3\n4", error: "" });
  });
});
