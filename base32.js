const BASE32_TO_NUMBER = {
  '0': 0, '1': 1, '2': 2, '3': 3,
  '4': 4, '5': 5, '6': 6, '7': 7,
  '8': 8, '9': 9, 'b': 10, 'c': 11,
  'd': 12, 'e': 13, 'f': 14, 'g': 15,
  'h': 16, 'j': 17, 'k': 18, 'm': 19,
  'n': 20, 'p': 21, 'q': 22, 'r': 23,
  's': 24, 't': 25, 'u': 26, 'v': 27,
  'w': 28, 'x': 29, 'y': 30, 'z': 31
};

const BASE32_TO_CHAR = [
  '0',  '1',  '2',  '3',
  '4',  '5',  '6',  '7',
  '8',  '9',  'b',  'c',
  'd',  'e',  'f',  'g',
  'h',  'j',  'k',  'm',
  'n',  'p',  'q',  'r',
  's',  't',  'u',  'v',
  'w',  'x',  'y',  'z'
]

module.exports.toNumber = char => BASE32_TO_NUMBER[char];
module.exports.toChar = number => BASE32_TO_CHAR[number];
