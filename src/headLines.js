'use strict';
const FirstIndex = 0;

class HeadLines {
  constructor(content, count) {
    this.content = content;
    this.count = count;
  }
  get splitLines() {
    return this.content.split('\n');
  }
  get getChunk() {
    return this.splitLines.slice(FirstIndex, this.count);
  }
  get firstNLines() {
    return this.getChunk.join('\n');
  }
}

module.exports = HeadLines;
