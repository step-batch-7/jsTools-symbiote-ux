'use strict';
class StreamPicker {
  constructor(stdin, createReadStream) {
    this.stdin = stdin;
    this.createReadStream = createReadStream;
  }
  pick(filePath) {
    return filePath ? this.createReadStream(filePath) : this.stdin;
  }
}

module.exports = StreamPicker;
