const fs = require('fs');
const geohashTree = require('../index');

const geohashes = JSON.parse(fs.readFileSync('./examples/data/hashes.json'));

const tree = geohashTree.makeTree(geohashes);
const encodedByHashes = geohashTree.encode(geohashes);
const encodedByTree = geohashTree.encode(tree);

console.log(`JSONLength = ${Buffer.from(JSON.stringify(tree), 'utf8').byteLength} bytes`);
console.log(`Length = ${encodedByHashes.byteLength} bytes`);

console.log('');

const decoded = geohashTree.decode(encodedByHashes);

treeStr = JSON.stringify(tree);
decodedStr = JSON.stringify(decoded);

console.log(`ENCODED: ${encodedByHashes}`);
console.log(`ORIGIN: ${treeStr}`);
console.log(`DECODED: ${decodedStr}`);
console.log(`IDENTICAL: ${treeStr === decodedStr ? 'Yes' : 'No'}`);
console.log(`IDENTICAL2: ${encodedByHashes === encodedByTree ? 'Yes' : 'No'}`);
