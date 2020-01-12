const assert = require('chai').assert;
const HeadLines = require('../src/headLines');

describe('Headline', () => {
  let content;
  let headLines;
  beforeEach(() => {
    content = 'a\nb\nc\nd\ne';
    headLines = new HeadLines(content, 3);
  });

  context('splitLines', () => {
    it('gives the headlines splitted by new lines', () => {
      assert.deepStrictEqual(headLines.splitLines, ['a', 'b', 'c', 'd', 'e']);
    });
  });

  context('getChunk', () => {
    it('gives the headlines according to the count', () => {
      assert.deepStrictEqual(headLines.getChunk, ['a', 'b', 'c']);
    });
  });

  context('firstNLines', () => {
    it('joins the headlines by new line', () => {
      assert.deepStrictEqual(headLines.firstNLines, 'a\nb\nc');
    });
  });
});
