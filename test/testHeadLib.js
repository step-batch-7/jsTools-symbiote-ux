const assert = require('chai').assert;
const sinon = require('sinon');
const { head, parseUserOptions } = require('../src/headLib');

describe('parseUserOptions', () => {
  it('give userArgs as objects,filePath & count(default) as key', () => {
    const actual = parseUserOptions(['file1']);
    const expected = { count: '10', filePath: 'file1' };
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
  it('give filePath as undefined with count, if no args are given', () => {
    const actual = parseUserOptions([]);
    const expected = { count: '10', filePath: undefined };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('head', () => {
  it('give error for given userArgs ,if count value is invalid', done => {
    const userArgs = ['-n', 'a', 'one.txt'];
    const read = sinon.fake();
    const write = {
      displayErrMsg: err => {
        assert.strictEqual(err, 'head: illegal line count -- a');
        done();
      }
    };
    head(userArgs, { read }, write);
    sinon.restore();
  });
  it('should give the content of file , if userOptions are valid', done => {
    const userArgs = ['-n', '5', 'one.txt'];
    const write = {
      displayHeadLines: function(data) {
        assert.strictEqual(data, 'abc');
        done();
      }
    };
    const read = sinon.fake();
    head(userArgs, { read }, write);
    assert.strictEqual(read.firstCall.args[0], 'one.txt');
    assert.strictEqual(read.firstCall.args[1], 'utf8');
    read.firstCall.args[2](null, 'abc');
    sinon.restore();
  });
  it('should give error , if bad file is given', done => {
    const userArgs = ['-n', '5', 'badFile.txt'];
    const write = {
      displayErrMsg: err => {
        assert.strictEqual(err, 'head: badFile.txt: No such file or directory');
        done();
      }
    };
    const read = sinon.fake();
    head(userArgs, { read }, write);
    assert.strictEqual(read.firstCall.args[0], 'badFile.txt');
    assert.strictEqual(read.firstCall.args[1], 'utf8');
    read.firstCall.args[2]('error', undefined);
    sinon.restore();
  });
  it('give content from stdin, if file is not given', done => {
    const stream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const write = {
      displayHeadLines: function(data) {
        assert.strictEqual(data, 'abc');
        done();
      }
    };
    head([], { stream }, write);
    assert(stream.setEncoding.calledWith('utf8'));
    assert.strictEqual(stream.on.firstCall.args[0], 'data');
    assert.strictEqual(stream.on.secondCall.args[0], 'end');
    stream.on.firstCall.args[1]('abc');
    sinon.restore();
  });
});
