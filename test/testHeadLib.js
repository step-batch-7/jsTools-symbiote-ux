const assert = require('chai').assert;
const sinon = require('sinon');
const { head, parseUserOptions } = require('../src/headLib');

describe('parseUserOptions', () => {
  it('give userArgs as objects,filePath & count(default) as key', () => {
    const actual = parseUserOptions(['file1']);
    const expected = { count: 10, filePath: 'file1' };
    assert.deepStrictEqual(actual, expected);
  });
  it('give userArgs as objects ,filePath and count as key', () => {
    const actual = parseUserOptions(['-n', '3', 'file1']);
    const expected = { count: '3', filePath: 'file1' };
    assert.deepStrictEqual(actual, expected);
  });
  it('give error message in object, if count value is not valid', () => {
    const actual = parseUserOptions(['-n', 'a', 'file1']);
    const expected = { error: 'head: illegal line count -- a' };
    assert.deepStrictEqual(actual, expected);
  });
  it('give error message in object,if count value is zero', () => {
    const actual = parseUserOptions(['-n', '0', 'file1']);
    const expected = { error: 'head: illegal line count -- 0' };
    assert.deepStrictEqual(actual, expected);
  });
  it('give userArgs as objects,if both(-n & count) are given together', () => {
    const actual = parseUserOptions(['-n5', 'file1']);
    const expected = { count: '5', filePath: 'file1' };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('head', () => {
  it('give error for given userArgs ,if count value is invalid', () => {
    const userArgs = ['-n', 'a', 'one.txt'];
    const read = sinon.fake();
    const write = {
      displayErrMsg: err => {
        assert.strictEqual(err, 'head: illegal line count -- a');
      }
    };
    head(userArgs, read, write);
    sinon.restore();
  });
  it('should give the content of file , if userOptions are valid', () => {
    const userArgs = ['-n', '5', 'one.txt'];
    const write = {
      displayHeadLines: function(data) {
        assert.strictEqual(data, 'abc');
      }
    };
    const read = sinon.fake();
    const fakeRead = sinon.fake.yieldsAsync(null, 'abc');
    read.readFile = fakeRead;
    read.readFile('someFile', (err, data) => {
      assert.strictEqual(err, null);
      assert.strictEqual(data, 'abc');
    });
    head(userArgs, read, write);
    sinon.restore();
  });
  it('should give error , if file is not present', () => {
    const userArgs = ['-n', '5', 'badFile.txt'];
    const write = {
      displayErrMsg: err => {
        assert.strictEqual(err, 'head: badFile.txt: No such file or directory');
      }
    };
    const read = sinon.fake();
    const fakeRead = sinon.fake.yieldsAsync('error', undefined);
    read.readFile = fakeRead;
    read.readFile('someFile', (err, data) => {
      assert.strictEqual(err, 'error');
      assert.strictEqual(data, undefined);
    });
    head(userArgs, read, write);
    sinon.restore();
  });
});
