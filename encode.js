const encodeBinary = require('./encode-binary');
const base32 = require('./base32');
const MARKS = require('./marks');

/**
 * Encode geohash tree from hash array string or tree object
 * @param {object|string[]} hashesOrTree 
 * @param {'string'|'buffer'} format
 * @returns {string|Buffer}
 */
module.exports = (hashesOrTree, format = 'string') => {
  const data = encodeBinary(hashesOrTree, 'array');
  let output = '';

  for (let i = 0; i < data.length; i++) {
    if (data[i] === MARKS.CLOSE_BYTE)  {
      output += ']';
      continue;
    }
    output += base32.toChar(data[i] & MARKS.BASE32_MARK);
    if (data[i] & MARKS.OPEN_MARK) {
      output += '[';
    }
  }

  switch (format.toLowerCase().trim()) {
    case 'string':
      return output;
    case 'buffer':
      return Buffer.from(output, 'utf8');
  }
  return output;
};
