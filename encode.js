const encodeTravel = (output, tree) => {
  const keys = Object.keys(tree);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    output.push(key);
    if (typeof tree[key] === 'object') {
      output.push('[');
      encodeTravel(output, tree[key]);
      output.push(']');
    }
  }
};

/**
 * Encode geohash tree from hash array string or tree object
 * @param {object|string[]} hashesOrTree 
 * @param {'string'|'buffer'} format
 * @returns {string|Buffer}
 */
module.exports = (hashesOrTree, format = 'string') => {
  const tree = Array.isArray(hashesOrTree) ? require('./make-tree')(hashesOrTree) : hashesOrTree;
  const output = [];
  encodeTravel(output, tree);

  switch (format.toLowerCase().trim()) {
    case 'string':
      return output.join('');
    case 'buffer':
      return Buffer.from(output);
  }
  return output;
};
