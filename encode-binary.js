const base32 = require('./base32');
const MARKS = require('./marks');

const encodeBinaryTravel = (output, tree) => {
  const keys = Object.keys(tree);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    let keyBytes = base32.toNumber(keys[i]) & MARKS.BASE32_MARK;
    if (typeof tree[key] === 'object') {
      output.push(keyBytes | MARKS.OPEN_MARK);
      encodeBinaryTravel(output, tree[key]);
      output.push(MARKS.CLOSE_BYTE);
      continue;
    }
    output.push(keyBytes);
  }
};

/**
 * Encode geohash tree to binary format
 * @param {string[]|object} hashesOrTree 
 * @param {'array'|'buffer'} format 
 * @returns {number[]|Buffer}
 */
module.exports = (hashesOrTree, format = 'array') => {
  const tree = Array.isArray(hashesOrTree) ? require('./make-tree')(hashesOrTree) : hashesOrTree;
  const output = [];
  encodeBinaryTravel(output, tree);

  switch (format.toLowerCase().trim()) {
    case 'array':
      return output;
    case 'buffer':
      return Buffer.from(output);
  }
  return output;
};
