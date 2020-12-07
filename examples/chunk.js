const fs = require('fs');
const geohashTree = require('../index');

const hashes = JSON.parse(fs.readFileSync('./examples/data/hashes.json'));

const encoded = geohashTree.encodeBinary(hashes, 'array');
const chunks = geohashTree.chunkbinary(encoded, 256);

for (let i = 0; i < chunks.length; i++) {
  console.log(`Chunk #${i} size = ${chunks[i].length}`);
  geohashTree.explainBinary(chunks[i]);
}

const encodedString = geohashTree.encode(hashes);
console.log(`Original: ${encodedString}`);

const joinedChunks = chunks.reduce((data, chunk) => [...data, ...chunk], []);
const encodedFromChunks = geohashTree.encode(geohashTree.decodeBinary(joinedChunks));
console.log(`From chunks: ${encodedFromChunks}`);

console.log(`Identical: ${encodedString === encodedFromChunks ? 'Yes': 'No'}`);
