const fs = require('fs');
const geohashTree = require('../index');

const geohashes = JSON.parse(fs.readFileSync('./examples/data/hashes.json'));

const tree = geohashTree.makeTree(geohashes);
const encoded = geohashTree.encode(tree);

console.log(`JSONLength = ${Buffer.from(JSON.stringify(tree), 'utf8').byteLength} bytes`);
console.log(`Length = ${encoded.byteLength} bytes`);

console.log('');

const decoded = geohashTree.decode(encoded);

treeStr = JSON.stringify(tree);
decodedStr = JSON.stringify(decoded);

console.log(`ENCODED: ${encoded}`);
console.log(`ORIGIN: ${treeStr}`);
console.log(`DECODED: ${decodedStr}`);
console.log(`IDENTICAL: ${treeStr === decodedStr ? 'Yes' : 'No'}`);
