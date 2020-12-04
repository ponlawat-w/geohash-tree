const base32 = require('./base32');
const MARKS = require('./marks');

module.exports = (data, printFunction = line => { console.log(line) }) => {
  let level = 0;
  const print = msg => {
    printFunction(' '.repeat(level * 2) + msg);
  };

  let line = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i] === MARKS.CLOSE_BYTE) {
      if (line.length) {
        print(`${line}`);
      }
      level--;
      print(']');

      line = '';
      continue;
    }

    const char = base32.toChar(data[i] & MARKS.BASE32_MARK);
    if (data[i] & MARKS.OPEN_MARK) {
      print(`${char} [`);
      level++;
      continue;
    }
    line += char;
  }
};
