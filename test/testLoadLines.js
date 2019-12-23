const assert = require("chai").assert;
const { loadLines } = require("../src/loadLines");

describe("loadLines", () => {
  it("should load the content of the file give in the form of array", () => {
    const reader = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11";
    };
    const actual = loadLines(reader, "path", "utf8");
    const expected = {
      lines: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
    };
    assert.deepStrictEqual(actual, expected);
  });
});
