const assert = require('chai').assert;
const sinon = require('sinon');
const fs = require('fs');
const { head, parseUserOptions } = require('../src/headLib');

describe('parseUserOptions', () => {
  it('it gives userOptions in the form of objects ,filePath as key and default value of count', () => {
    const actual = parseUserOptions(['file1']);
    const expected = { count: 10, filePath: ['file1'] };
    assert.deepStrictEqual(actual, expected);
  });
  it('it gives userOptions in the form of objects ,filePath and count as key', () => {
    const actual = parseUserOptions(['-n', '3', 'file1']);
    const expected = { count: '3', filePath: ['file1'] };
    assert.deepStrictEqual(actual, expected);
  });
  it('it gives the error message in object, error as key , if count value is not valid', () => {
    const actual = parseUserOptions(['-n', 'a', 'file1']);
    const expected = { error: `head: illegal line count -- a` };
    assert.deepStrictEqual(actual, expected);
  });
  it('it gives the error message in object, error as key , if count value is zero', () => {
    const actual = parseUserOptions(['-n', '0', 'file1']);
    const expected = { error: `head: illegal line count -- 0` };
    assert.deepStrictEqual(actual, expected);
  });
  it('it gives userOptions in the form of objects ,filePath and count as key,if option and count value is given as a string', () => {
    const actual = parseUserOptions(['-n5', 'file1']);
    const expected = { count: '5', filePath: ['file1'] };
    assert.deepStrictEqual(actual, expected);
  });
  it('it gives userOptions in the form of objects ,filePath and count as key,if only count is given', () => {
    const actual = parseUserOptions(['-5', 'file1']);
    const expected = { count: '5', filePath: ['file1'] };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('head', () => {
  it('should give error for the given userArgs ,if count value is invalid', () => {
    const userArgs = ['-n', 'a', 'path'];
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
    const userArgs = ['-n', '5', 'path'];
    const write = {
      displayHeadLines: function(data) {
        assert.strictEqual(data, 'fileContent');
      }
    };
    const read = fs;
    const fakeRead = sinon.fake.yieldsAsync(null, 'fileContent');
    sinon.replace(read, 'readFile', fakeRead);
    read.readFile('someFile', (err, data) => {
      assert.strictEqual(err, null);
      assert.strictEqual(data, 'fileContent');
    });
    head(userArgs, read, write);
    sinon.restore();
  });
  it('should give error , if file is not present', () => {
    const userArgs = ['-n', '5', 'noPath'];
    const write = {
      displayErrMsg: err => {
        assert.strictEqual(err, `head: noPath: No such file or directory`);
      }
    };
    const read = fs;
    const fakeRead = sinon.fake.yieldsAsync('error', undefined);
    sinon.replace(read, 'readFile', fakeRead);
    read.readFile('someFile', (err, data) => {
      assert.strictEqual(err, 'error');
      assert.strictEqual(data, undefined);
    });
    head(userArgs, read, write);
    sinon.restore();
  });
});