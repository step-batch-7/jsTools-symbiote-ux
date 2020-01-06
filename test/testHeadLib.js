const sinon = require('sinon');
const assert = require('chai').assert;
const {
  head,
  pickStream,
  parseUserOptions,
  getFirstNLines,
  readFromStream
} = require('../src/headLib');

describe('parseUserOptions', () => {
  it('give userArgs as objects,filePath & count(default) as key', () => {
    const actual = parseUserOptions(['file1']);
    const expected = {count: '10', filePath: 'file1'};
    assert.deepStrictEqual(actual, expected);
  });
  it('give userArgs as objects ,filePath and count as key', () => {
    const actual = parseUserOptions(['-n', '3', 'file1']);
    const expected = {count: '3', filePath: 'file1'};
    assert.deepStrictEqual(actual, expected);
  });
  it('give error message in object, if count value is not valid', () => {
    const actual = parseUserOptions(['-n', 'a', 'file1']);
    const expected = {error: 'head: illegal line count -- a'};
    assert.deepStrictEqual(actual, expected);
  });
  it('give error message in object,if count value is zero', () => {
    const actual = parseUserOptions(['-n', '0', 'file1']);
    const expected = {error: 'head: illegal line count -- 0'};
    assert.deepStrictEqual(actual, expected);
  });
  it('give userArgs as objects,if both(-n & count) are given together', () => {
    const actual = parseUserOptions(['-n5', 'file1']);
    const expected = {count: '5', filePath: 'file1'};
    assert.deepStrictEqual(actual, expected);
  });
  it('give filePath as undefined with count, if no args are given', () => {
    const actual = parseUserOptions([]);
    const expected = {count: '10', filePath: undefined};
    assert.deepStrictEqual(actual, expected);
  });
});

describe('head', () => {
  it('give error for given userArgs ,if count value is invalid', done => {
    const userArgs = ['-n', 'a', 'one.txt'];
    const onComplete = sinon.fake();
    head(userArgs, {}, onComplete);
    assert.ok(onComplete.calledWith('head: illegal line count -- a', ''));
    done();
  });
  it('should give the content of file,if userOptions are valid', done => {
    const userArgs = ['-n', '5', 'one.txt'];
    const setEncoding = sinon.fake();
    const on = sinon.fake();
    const createReadStream = filePath => {
      assert.strictEqual(filePath, 'one.txt');
      return {setEncoding, on};
    };
    const onComplete = sinon.fake();
    const stdin = {};
    head(userArgs, {createReadStream, stdin}, onComplete);
    assert(setEncoding.calledWith('utf8'));
    assert.ok(on.firstCall.calledWith('data'));
    on.firstCall.lastArg('abc');
    assert.ok(onComplete.calledWith('', 'abc'));
    done();
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

describe('readFromStream', () => {
  it('give content from stdin when option is not given', done => {
    const setEncoding = sinon.fake();
    const on = sinon.fake();
    const destroy = sinon.fake();
    const stream = {setEncoding, on, destroy};
    const onComplete = sinon.fake();
    const count = 1;
    const filePath = undefined;
    readFromStream({count, filePath}, stream, onComplete);
    assert(setEncoding.calledWith('utf8'));
    assert.ok(on.firstCall.calledWith('data'));
    on.firstCall.lastArg('abc');
    assert.ok(onComplete.calledWith('', 'abc'));
    assert.ok(on.calledTwice);
    assert.ok(destroy.calledOnce);
    done();
  });
  it('give error when file is not present', done => {
    const setEncoding = sinon.fake();
    const on = sinon.fake();
    const stream = {setEncoding, on};
    const onComplete = sinon.fake();
    const count = 1;
    const filePath = 'filePath';
    readFromStream({count, filePath}, stream, onComplete);
    assert(setEncoding.calledWith('utf8'));
    assert.ok(on.firstCall.calledWith('data'));
    assert.ok(on.secondCall.calledWith('error'));
    on.secondCall.lastArg('error');
    assert.ok(
      onComplete.calledWith('head: filePath: No such file or directory', '')
    );
    assert.ok(on.calledTwice);
    done();
  });
});

describe('pickStream', () => {
  it('give createReadStream if filePath is given', () => {
    const createReadStream = sinon.fake.returns('createReadStream');
    const actual = pickStream('one.txt', createReadStream);
    assert.strictEqual(actual, 'createReadStream');
    assert.ok(createReadStream.calledWith('one.txt'));
  });
  it('give stdin if filePath is not given', () => {
    const createReadStream = 'createReadStream';
    const stdin = 'stdin';
    const actual = pickStream(undefined, createReadStream, stdin);
    assert.strictEqual(actual, stdin);
  });
});
