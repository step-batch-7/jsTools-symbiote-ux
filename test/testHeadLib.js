const assert = require("chai").assert;
const {
  parseUserOptions,
  loadLines,
  giveHeadLines,
  head
} = require("../src/headLib");

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
    const actual = loadLines(
      reader,
      isFileExists,
      { count: 10, filePath: "path" },
      "utf8"
    );
    const expected = {
      count: 10,
      filePath: "path",
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
    const actual = loadLines(
      reader,
      isFileExists,
      { filePath: "path" },
      "utf8"
    );
    assert.deepStrictEqual(actual, {
      error: `head : path : no such file or directory`
    });
  });
});

describe("giveHeadLines", () => {
  it("gives the starting ten lines of the file if file contains more than ten lines as text ", () => {
    const actual = giveHeadLines({
      count: 10,
      filePath: "path",
      lines: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
    });
    const expected = { lines: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10" };
    assert.deepStrictEqual(actual, expected);
  });
  it("gives the whole lines of the file if file contains less than ten lines", () => {
    const actual = giveHeadLines({ lines: ["1", "2", "3", "4"] });
    const expected = { lines: "1\n2\n3\n4" };
    assert.deepStrictEqual(actual, expected);
  });
  it("should print error message if fileContent contains error Text", () => {
    const actual = giveHeadLines({
      error: `head : noPath : no such file or directory`
    });
    const expected = { error: `head : noPath : no such file or directory` };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("head", () => {
  it("should give error for the given userArgs ,if file is not present", () => {
    const userArgs = ["node", "head.js", "-n", "4", "path"];
    const reader = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return;
    };

    const isFileExists = function(path) {
      assert.strictEqual(path, "path");
      return false;
    };
    const actual = head(userArgs, reader, isFileExists);
    assert.deepStrictEqual(actual, {
      error: `head : path : no such file or directory`
    });
  });
  it("should give error for the given userArgs ,if file is not present", () => {
    const userArgs = ["node", "head.js", "-n", "4", "path"];
    const reader = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11";
    };

    const isFileExists = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const actual = head(userArgs, reader, isFileExists);
    assert.deepStrictEqual(actual, { lines: "1\n2\n3\n4" });
  });
});
