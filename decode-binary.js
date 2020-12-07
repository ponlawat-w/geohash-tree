const base32 = require('./base32');
const MARKS = require('./marks');

/**
 * Decode geohash tree binary to tree object
 * @param {Buffer|number[]} data 
 * @returns {object}
 */
module.exports = data => {
  data = Array.isArray(data) ? data : Array.from(data);
  const tree = {};
  const stack = [];
  let subTree = tree;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === MARKS.CLOSE_BYTE) {
      subTree = stack.pop();
      continue;
    }
    const char = base32.toChar(data[i] & MARKS.BASE32_MARK);
    if (data[i] & MARKS.OPEN_MARK) {
      if (!subTree[char] || subTree[char] === 1) {
        subTree[char] = {};
      }
      stack.push(subTree);
      subTree = subTree[char];
      continue;
    }

    subTree[char] = 1;
  }
  return tree;
};
