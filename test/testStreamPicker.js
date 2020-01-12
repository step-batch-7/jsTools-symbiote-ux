const assert = require('chai').assert;
const sinon = require('sinon');
const StreamPicker = require('../src/streamPicker');

describe('StreamPicker', () => {
  describe('pick', () => {
    const stdin = sinon.fake();
    const createReadStream = sinon.fake.returns('one.txt');
    const stream = new StreamPicker(stdin, createReadStream);
    it('gives readStream if fileName is present', () => {
      assert.strictEqual(stream.pick('one.txt'), 'one.txt');
    });
    it('gives stdin if fileName is not present', () => {
      assert.strictEqual(stream.pick(), stdin);
    });
  });
});
