const makeTree = require('./make-tree');

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

module.exports.makeTree = require('./make-tree');

module.exports.encode = (hashesOrTree, format = 'string') => {
  const tree = typeof hashesOrTree === 'object' ? hashesOrTree : makeTree(hashesOrTree);
  const output = [];
  encodeTravel(output, tree);

  switch (format.toLowerCase()) {
    case 'string':
      return output.join('');
    case 'buffer':
      return Buffer.from(output);
  }
  return output;
};

module.exports.decode = data => {
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
