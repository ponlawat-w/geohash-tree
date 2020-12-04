const decodeBinary = require('./decode-binary');
const base32 = require('./base32');
const MARKS = require('./marks');

/**
 * Decode geohash tree string to tree object
 * @param {string} str 
 * @returns {object}
 */
module.exports = str => {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ']') {
      bytes.push(MARKS.CLOSE_BYTE);
      continue;
    }

    let byte = base32.toNumber(str[i]) & MARKS.BASE32_MARK;
    if (i < str.length - 1) {
      if (str[i + 1] === '[') {
        byte |= MARKS.OPEN_MARK; i++;
      }
    }
    bytes.push(byte);
  }
  return decodeBinary(bytes);
};
