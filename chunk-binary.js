const MARKS = require('./marks');

module.exports = (data, chunkSize) => {
  const chunks = [];
  let chunk = [];
  let prefixes = [];
  for (let i = 0; i < data.length; i++) {
    const datum = data[i];

    if (prefixes.length >= chunkSize) {
      throw 'Level is deeper than chunk size';
    }

    if (chunk.length + prefixes.length + 1 >= chunkSize) {
      for (let j = 0; j < prefixes.length; j++) {
        chunk.push(MARKS.CLOSE_BYTE);
      }
      chunks.push(chunk);
      chunk = prefixes.map(p => p);
    }

    if (datum & MARKS.OPEN_MARK) {
      prefixes.push(datum);
    } else if (datum === MARKS.CLOSE_BYTE) {
      prefixes.pop();
    }
    chunk.push(datum);
  }

  if (chunk.length) {
    chunks.push(chunk);
  }

  return chunks;
};
