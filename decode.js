/**
 * Decode geohash tree string to tree object
 * @param {string} data 
 * @returns {object}
 */
module.exports = data => {
  const tree = {};
  const stack = [];
  let subTree = tree;
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    const nextChar = data[i + 1];
    if (char === ']') {
      subTree = stack.pop();
    } else {
      if (nextChar === '[') {
        stack.push(subTree);
        subTree[char] = {};
        subTree = subTree[char];
        i++;
      } else {
        subTree[char] = 1;
      }
    }
  }
  return tree;
};
