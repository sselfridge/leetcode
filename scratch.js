poss = [
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [2, 6], [2, 6], [1, 6], [], [2, 6]],
  [[], [], [], [], [], [], [2, 6], [], [2, 6]],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [2, 6], [8, 6], [2, 6], [], []],
  [[], [], [], [], [2, 5], [], [], [], [2, 6]]
];

function possToString() {
  let out = "";
  for (let i = 0; i < 9; i++) {
    if (i % 3 === 0) out = out + "\n";
    for (let j = 0; j < 9; j++) {
      if (j % 3 === 0) out = out + " ";
      let val;
      let len = poss[i][j].length;
      if (len === 2) {
        val = poss[i][j];
      } else if (len === 0) {
        val = "---";
      } else {
        val = "xMx";
      }
      out = out + val + " ";
    }
    out = out + "\n";
  }
  return out;
}
function boardToString() {
  let out = "";
  for (let i = 0; i < 9; i++) {
    if (i % 3 === 0) out = out + "\n";
    for (let j = 0; j < 9; j++) {
      if (j % 3 === 0) out = out + " ";
      let val = board[i][j];
      out = out + val + " ";
    }
    out = out + "\n";
  }
  return out;
}

const board = [
  [".", ".", ".", "2", ".", ".", ".", "6", "3"],
  ["3", ".", ".", ".", ".", "5", "4", ".", "1"],
  [".", ".", "1", ".", ".", "3", "9", "8", "."],
  [".", ".", ".", ".", ".", ".", ".", "9", "."],
  [".", ".", ".", "5", "3", "8", ".", ".", "."],
  [".", "3", ".", ".", ".", ".", ".", ".", "."],
  [".", "2", "6", "3", ".", ".", "5", ".", "."],
  ["5", ".", "3", "7", ".", ".", ".", ".", "8"],
  ["4", "7", ".", ".", ".", "1", ".", ".", "."]
];

console.log(possToString());
console.log(boardToString());

function fillSoloRow() {
  let flag = false;
  for (let j = 0; j < 9; j++) {
    for (let i = 0; i < 9; i++) {
      const arr = poss[i][j];
      // arr.forEach(num => { console.log(`Count of: ${num} in row:${i}: ${possCountInRow(num,i,j)}`);})
      arr.forEach(num => {
        if(possCountInColumn(num, i, j) === 1 || possCountInRow(num, i, j) === 1){
          poss[i][j] = []
          board[i][j] = `${num}`
          flag = true;
        };
      });
    }
  }
  return flag;
}

function possCountInRow(n, y, x) {
  let count = 0;
  for (let j = 0; j < 9; j++) {
    const arr = poss[y][j];
    arr.forEach(num => {
      if (num === n) count++;
    });
  }
  return count;
}
function possCountInColumn(n, y, x) {
  let count = 0;
  for (let i = 0; i < 9; i++) {
    const arr = poss[i][x];
    arr.forEach(num => {
      if (num === n) count++;
    });
  }
  return count;
}

fillSoloRow();


console.log(possToString());
console.log(boardToString());