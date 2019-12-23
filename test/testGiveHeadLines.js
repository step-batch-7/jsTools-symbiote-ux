const assert = require("chai").assert;
const { giveHeadLines } = require("../src/giveHeadLines");

describe("giveHeadLines", () => {
  it("gives the starting ten lines of the file if file contains more than ten lines as text ", () => {
    const actual = giveHeadLines({
      count: 10,
      filePath: "path",
      lines: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
    });
    const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    assert.strictEqual(actual, expected);
  });
  it("gives the whole lines of the file if file contains less than ten lines", () => {
    const actual = giveHeadLines({ lines: ["1", "2", "3", "4"] });
    const expected = "1\n2\n3\n4";
    assert.strictEqual(actual, expected);
  });
  it("should print error message if fileContent contains error Text", () => {
    assert.deepStrictEqual(
      giveHeadLines(null),
      `head : no such file or directory`
    );
  });
});
