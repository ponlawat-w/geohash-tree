const fs = require('fs');
const geohashTree = require('../index');

const geohashes = JSON.parse(fs.readFileSync('./examples/data/hashes.json'));

geohashTree.explainBinary(geohashTree.encodeBinary(geohashes));
