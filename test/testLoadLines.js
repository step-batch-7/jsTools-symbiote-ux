const assert = require("chai").assert;
const { loadLines } = require("../src/loadLines");

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
    assert.isNull(
      loadLines(reader, isFileExists, { filePath: "path" }, "utf8")
    );
  });
});
