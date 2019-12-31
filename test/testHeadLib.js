const sinon = require('sinon');
const assert = require('chai').assert;
const {
  head,
  parseUserOptions,
  giveStartingLines,
  loadStdinContent
} = require('../src/headLib');
const zero = 0;
const one = 1;
const two = 2;
const ten = 10;

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
    assert.strictEqual(read.firstCall.args[zero], 'one.txt');
    assert.strictEqual(read.firstCall.args[one], 'utf8');
    read.firstCall.args[two](null, 'abc');
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
    assert.strictEqual(read.firstCall.args[zero], 'badFile.txt');
    assert.strictEqual(read.firstCall.args[one], 'utf8');
    read.firstCall.args[two]('error', undefined);
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
    assert.strictEqual(stream.on.firstCall.args[zero], 'data');
    assert.strictEqual(stream.on.secondCall.args[zero], 'end');
    stream.on.firstCall.args[one]('abc');
    sinon.restore();
  });
});

describe('giveStartingLines', () => {
  it('give starting ten lines of the content ,if given count is 10', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    const actual = giveStartingLines(content, ten);
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    assert.strictEqual(actual, expected);
  });
  it('give all lines of content,if lines are less than given count, 10', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9';
    const actual = giveStartingLines(content, ten);
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9';
    assert.strictEqual(actual, expected);
  });
  it('give starting three lines of content ,if given count is 3', () => {
    const three = 3;
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    const actual = giveStartingLines(content, three);
    const expected = '1\n2\n3';
    assert.strictEqual(actual, expected);
  });
  it('gives empty if content has nothing ,if given count is 10', () => {
    const content = '';
    const actual = giveStartingLines(content, ten);
    const expected = '';
    assert.strictEqual(actual, expected);
  });
});

describe('loadStdinContent', () => {
  it('give content from stdin when option is not given', done => {
    const stream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const onComplete = {
      displayHeadLines: function(data) {
        assert.strictEqual(data, 'abc');
        done();
      }
    };
    loadStdinContent(ten, stream, onComplete);
    assert(stream.setEncoding.calledWith('utf8'));
    assert.strictEqual(stream.on.firstCall.args[zero], 'data');
    assert.strictEqual(stream.on.secondCall.args[zero], 'end');
    stream.on.firstCall.args[one]('abc');
    sinon.restore();
  });
});
