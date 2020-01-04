const sinon = require('sinon');
const assert = require('chai').assert;
const {
  head,
  parseUserOptions,
  getFirstNLines,
  readStdin
} = require('../src/headLib');

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
    const readFile = sinon.fake();
    const onComplete = sinon.fake();
    const stdinReader = {};
    head(userArgs, {readFile, stdinReader}, onComplete);
    assert.ok(onComplete.calledWith('head: illegal line count -- a', ''));
    done();
  });
  it('should give the content of file , if userOptions are valid', done => {
    const userArgs = ['-n', '5', 'one.txt'];
    const onComplete = function (error, content) {
      assert.strictEqual(error, '');
      assert.strictEqual(content, 'abc');
      done();
    };
    const readFile = sinon.fake();
    head(userArgs, { readFile }, onComplete);
    assert.strictEqual(readFile.firstCall.args[0], 'one.txt');
    assert.strictEqual(readFile.firstCall.args[1], 'utf8');
    readFile.firstCall.args[2](null, 'abc');
    sinon.restore();
  });
  it('should give error , if bad file is given', done => {
    const userArgs = ['-n', '5', 'badFile.txt'];
    const onComplete = function (error, content) {
      assert.strictEqual(error, 'head: badFile.txt: No such file or directory');
      assert.strictEqual(content, '');
      done();
    };
    const readFile = sinon.fake();
    head(userArgs, { readFile }, onComplete);
    assert.strictEqual(readFile.firstCall.args[0], 'badFile.txt');
    assert.strictEqual(readFile.firstCall.args[1], 'utf8');
    readFile.firstCall.args[2]('error', undefined);
    sinon.restore();
  });
  it('give content from stdin, if file is not given', done => {
    const stdin = { setEncoding: sinon.fake(), on: sinon.fake() };
    const onComplete = function (error, content) {
      assert.strictEqual(error, '');
      assert.strictEqual(content, 'abc');
      done();
    };
    head([], { stdinReader: () => stdin }, onComplete);
    assert(stdin.setEncoding.calledWith('utf8'));
    assert.strictEqual(stdin.on.firstCall.args[0], 'data');
    stdin.on.firstCall.args[1]('abc');
    sinon.restore();
  });
});

describe('getFirstNLines', () => {
  it('give starting ten lines of the content ,if given count is 10', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    const actual = getFirstNLines(content, 10);
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    assert.strictEqual(actual, expected);
  });
  it('give all lines of content,if lines are less than given count, 10', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9';
    const actual = getFirstNLines(content, 10);
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9';
    assert.strictEqual(actual, expected);
  });
  it('give starting three lines of content ,if given count is 3', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    const actual = getFirstNLines(content, 3);
    const expected = '1\n2\n3';
    assert.strictEqual(actual, expected);
  });
  it('gives empty if content has nothing ,if given count is 10', () => {
    const content = '';
    const actual = getFirstNLines(content, 10);
    const expected = '';
    assert.strictEqual(actual, expected);
  });
});

describe('readStdin', () => {
  it('give content from stdin when option is not given', done => {
    const stream = {
      setEncoding: sinon.fake(),
      on: sinon.fake(),
      destroy: sinon.fake()
    };
    const onComplete = sinon.fake();
    readStdin(1, () => stream, onComplete);
    assert(stream.setEncoding.calledWith('utf8'));
    assert.ok(stream.on.firstCall.calledWith('data'));
    stream.on.firstCall.lastArg('abc');
    assert.ok(onComplete.calledWith('', 'abc'));
    assert.ok(stream.on.calledOnce);
    assert.ok(stream.destroy.calledOnce);
    done();
  });
});
