# `geohash-tree`

Covnert and encode array of geohashes into hierarchical tree format.

## Examples

Data
```
ezpg0
ezpg1
ezpg2
ezpg3e
ezpg3f
ezpgb
ezpgc
ezpgd
ezph
ezpj
```

### Make Tree
```js
const geohashTree = require('geohash-tree');
const tree = geohashTree.makeTree(data);
```
```json
{"e":{"z":{"p":{"g":{"0":1,"1":1,"2":1,"3":{"e":1,"f":1},"b":1,"c":1,"d":1},"h":1,"j":1}}}}
```

### Encode
```js
const geohashTree = require('geohash-tree');
const encodedTree = geohashTree.encode(data);
```
```
e[z[p[g[0123[ef]bcd]hj]]]
```

### Decode
```js
const geohashTree = require('geohash-tree');
const tree = geohashTree.decode('e[z[p[g[0123[ef]bcd]hj]]]');
```
