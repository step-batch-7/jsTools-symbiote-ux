const assert = require("chai").assert;
const { giveHeadLines } = require("../src/giveHeadLines");

describe("giveHeadLines", () => {
  it("gives the starting ten lines of the file", () => {
    const actual = giveHeadLines({
      lines: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
    });
    const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11";
    assert.strictEqual(actual, expected);
  });
});
