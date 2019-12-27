const assert = require("chai").assert;
const { loadLines, head } = require("../src/headLib");

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
      error: `head : path : no such file or directory`,
      lines: ""
    });
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
      error: `head : path : no such file or directory`,
      lines: ""
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
    assert.deepStrictEqual(actual, { lines: "1\n2\n3\n4", error: "" });
  });
  it("should give error for the given userArgs ,if count value is invalid", () => {
    const userArgs = ["node", "head.js", "-n", "a", "path"];
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
    assert.deepStrictEqual(actual, { error: `head : a illegal count`, lines: "" });
  });
});
