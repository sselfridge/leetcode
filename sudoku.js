// https://leetcode.com/problems/sudoku-solver/
// Write a program to solve a Sudoku puzzle by filling the empty cells.

// A sudoku solution must satisfy all of the following rules:

// Each of the digits 1-9 must occur exactly once in each row.
// Each of the digits 1-9 must occur exactly once in each column.
// Each of the the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
// Empty cells are indicated by the character '.'.


// Note:

// The given board contain only digits 1-9 and the character '.'.
// You may assume that the given Sudoku puzzle will have a single unique solution.
// The given board size is always 9x9.

var solveSudoku = function(board) {
  console.log("Start");
  const orginalBoard = board;
  let poss = []; // keep track of possibilities for each square
  for (let i = 0; i < 9; i++) {
    poss[i] = [];
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === ".") {
        const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        poss[i][j] = numList.slice();
      } else {
        poss[i][j] = [];
      }
    }
  }

  function removeNumber(n, y, x) {
    const index = poss[y][x].indexOf(n);
    // if(poss[y][x].length === 1 && n === poss[y][x][0]) throw `removing last element. Elm:${poss[y][x][0]} ${y},${x}`
    if (index === -1) return;
    poss[y][x].splice(index, 1);
  }

  function scanRow(y, x) {
    if (board[y][x] !== ".") return; //this square is filled in already
    for (let i = 0; i < 9; i++) {
      let val = board[y][i];
      if (val === ".") continue; //skip empty squares
      val = parseInt(val);
      removeNumber(val, y, x); //found number in row, remove from possibility
    }
  }

  function scanColumn(y, x) {
    if (board[y][x] !== ".") return; //this square is filled in already
    for (let i = 0; i < 9; i++) {
      let val = board[i][x];
      if (val === ".") continue; //skip empty squares
      val = parseInt(val);
      removeNumber(val, y, x); //found number in column, remove from possibility
    }
  }

  function getBoxLimits(n) {
    const boxNum = Math.floor(n / 3);
    switch (boxNum) {
      case 0:
        return { low: 0, high: 2 };
      case 1:
        return { low: 3, high: 5 };
      case 2:
        return { low: 6, high: 8 };
      default:
        console.error("Shouldn't happen, something unexpected happend");
        break;
    }
  }

  function scanBox(y, x) {
    yLimit = getBoxLimits(y);
    xLimit = getBoxLimits(x);

    for (let i = yLimit.low; i <= yLimit.high; i++) {
      for (let j = xLimit.low; j <= xLimit.high; j++) {
        let val = board[i][j];
        if (val === ".") continue; //skip empty squares
        val = parseInt(val);
        removeNumber(val, y, x);
      }
    }
  }

  function fillSingles() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (poss[i][j].length === 1) {
          const newVal = poss[i][j].pop();
          if (board[i][j] !== ".")
            throw `Already have:${board[i][j]} trying to put ${newVal} in ${i},${j}`;
          if (!checkIfValid(newVal, i, j)) throw new Error("Invalid Board");
          board[i][j] = `${newVal}`;
          //   console.log(`Filled ${i},${j} with ${newVal}`);
          return true;
        }
      }
    }
    return false;
  }

  //fill in number when a number is in that row/column poss only once
  function fillSoloRowColumn() {
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

  function checkIfValid(n, y, x) {
    for (let i = 0; i < 9; i++) {
      if (board[y][i] === `${n}`) {
        // console.log(`Invalid Row: ${n} exists in ${y},${i}`);
        return false;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (board[i][x] === `${n}`) {
        // console.log(`Invalid Column: ${n} exists in ${y},${i}`);
        return false;
      }
    }
    yLimit = getBoxLimits(y);
    xLimit = getBoxLimits(x);

    for (let i = yLimit.low; i <= yLimit.high; i++) {
      for (let j = xLimit.low; j <= xLimit.high; j++) {
        let val = board[i][j];
        if (val === `${n}`) {
          // console.log(`Invalid Box: ${n} exists in ${y},${i}`);
          return false;
        }
      }
    }
    return true;
  }

  function areWeDone() {
    let countObj = {};
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === ".") return false;
        curr = parseInt(board[i][j]);
        countObj[curr] = countObj[curr] ? ++countObj[curr] : 1;
      }
    }

    //Are there 9 of every number?
    if (Object.values(countObj).filter(n => n != 9).length !== 0) {
      throw `Invalid board - incorrect number count:\n
        ${Object.keys(countObj)}\n
        ${Object.values(countObj)}\n${boardToString()}`;
    }
    return true;
  }

  let didFillASquare = true;
  while (didFillASquare) {
    didFillASquare = false;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        scanColumn(i, j);
        scanRow(i, j);
        scanBox(i, j);
      }
    }

    didFillASquare = fillSingles() 
    // didFillASquare = didFillASquare || fillSoloRow();
  }
  if (areWeDone()) return "Found it without guessing";

  //BackTracking Helper functions
  function copyPoss(oldPoss) {
    const newPoss = [];
    for (let i = 0; i < 9; i++) {
      newPoss.push([]);
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        newPoss[i][j] = oldPoss[i][j].slice();
      }
    }
    return newPoss;
  }
  function copyBoard(oldBoard) {
    const newBoard = [];
    oldBoard.forEach(element => {
      newBoard.push(element.slice());
    });
    return newBoard;
  }

  function getNthGuess(n) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (poss[i][j].length === 2) {
          if (n > 2) {
            n -= 2;
            continue;
          } else {
            //n is 1 or 2 here
            const arr = poss[i][j];
            return {
              num: arr[n - 1],
              y: i,
              x: j
            };
          }
        }
      }
    }
    return null; //no more 2 array possiblities
  }

  function setOrginalBoard(newBoard) {
    for (let i = 0; i < 9; i++) {
      orginalBoard[i] = newBoard[i].slice();
    }
  }

  function getTotalEmptySquares() {
    let count = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === ".") count++;
      }
    }
    return count;
  }

  function getTotalPossibleSquares() {
    let count = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (poss[i][j].length > 0) count++;
      }
    }
    return count;
  }

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

  const pastGuesses = {};
  function seenGuessBefore(id, num) {
    let uniqueStr = boardToString() + possToString() + num;
    if (pastGuesses[uniqueStr]) {
      // console.log(`Current : ID${id} - subGuess Num:${num}`);
      // console.log("Past    :", pastGuesses[uniqueStr]);
      // console.log(uniqueStr);
      // throw new Error("Repeat Board Found")
      return true;
    } else {
      pastGuesses[uniqueStr] = `ID${id} - subGuess Num:${num}`;
    }
    return false;
  }

  function checkForValidPossibles(){
    return boxesValid() && columnsValid() && rowsValid();
  }

  function boxesValid() {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        yLimit = getBoxLimits(y * 3);
        xLimit = getBoxLimits(x * 3);
        let possCount = 0;
        let uniqueNum = new Set();
        for (let i = yLimit.low; i <= yLimit.high; i++) {
          for (let j = xLimit.low; j <= xLimit.high; j++) {
            if (poss[i][j].length > 0) {
              possCount++;
              poss[i][j].forEach(n => {
                uniqueNum.add(n);
              });
            }
          }
        }
        if (possCount > uniqueNum.size) {
          return false;
        }
      }
    }
    return true;
  }
  function columnsValid(){
    for (let j = 0; j < 9; j++) {
      let possCount = 0;
      let uniqueNum = new Set();
      for (let i = 0; i < 9; i++) {
        if (poss[i][j].length > 0) {
          possCount++;
          poss[i][j].forEach(n => {
            uniqueNum.add(n);
          });
        }
      }
      if (possCount > uniqueNum.size) {
        return false;
      }
    }
    return true;
  }
  function rowsValid() {
    for (let i = 0; i < 9; i++) {
      let possCount = 0;
      let uniqueNum = new Set();
      for (let j = 0; j < 9; j++) {
        if (poss[i][j].length > 0) {
          possCount++;
          poss[i][j].forEach(n => {
            uniqueNum.add(n);
          });
        }
      }
      if (possCount > uniqueNum.size) {
        return false;
      }
    }
    return true;
  }



  //Start Backtracking Work
  let prevGuessID = 0;
  const firstGuess = {
    board: copyBoard(board),
    poss: copyPoss(poss),
    subGuesscount: 0,
    uniqueGuessID: prevGuessID++
  };

  //current guess will be at top of stack
  const guessStack = [firstGuess];

  while (guessStack.length > 0) {
    // console.log('Start While Loop');
    currentGuess = guessStack[guessStack.length - 1];
    console.log(
      `Guess Number: ${currentGuess.uniqueGuessID} - Tries on this guess: ${currentGuess.subGuesscount}`
    );
    board = copyBoard(currentGuess.board);
    poss = copyPoss(currentGuess.poss);
    subGuesscount = ++currentGuess.subGuesscount;

    if (seenGuessBefore(currentGuess.uniqueGuessID, subGuesscount)) {
      // console.log(`Repeat Board / poss combo StackSize:${guessStack.length}`);
      guessStack.pop();
      continue;
    }

    console.log(currentGuess.uniqueGuessID);
    console.log(boardToString());
    console.log(possToString());


    //check if there are any more doubles to guess with
    subGuess = getNthGuess(subGuesscount);

    if (subGuess === null) {
      //remove state from Stack if so
      // console.log(`Ran out of doubles - Done with guess:${currentGuess.uniqueGuessID}`);
      guessStack.pop();
      continue;
    }

    // console.log(`Removing ${subGuess.num} from ${subGuess.y},${subGuess.x}`);
    removeNumber(subGuess.num, subGuess.y, subGuess.x);

    //run through normal until stuck or done
    try {
      let didFillASquare = true;
      while (didFillASquare) {
        didFillASquare = false;
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            scanColumn(i, j);
            scanRow(i, j);
            scanBox(i, j);
          }
        }

        didFillASquare = fillSingles() 
        didFillASquare = didFillASquare || fillSoloRowColumn();
      }

      if (areWeDone()) {
        // Set orginal board if done
        setOrginalBoard(board);
        console.log(boardToString());
        // console.log(possToString());
        return "DONE";
      }
    } catch (error) {
      //This never seems to trigger in the current infinite loop
      console.error("Invalid Board:", error);
      return "ERROR ERROR DURING BOARD FILLING";
      continue;
    }
    // console.log("Board Not Full");
    // console.log(boardToString());
    // console.log(possToString());

    // check if board is in a valid state
    if (getTotalEmptySquares() !== getTotalPossibleSquares()) {    
      continue;
    }

    // push state on to Q
    if (getTotalPossibleSquares() > 1 && checkForValidPossibles()) {
      // console.log("Adding new Guess to Stack");
      const newGuess = {
        board: copyBoard(board),
        poss: copyPoss(poss),
        subGuesscount: 0,
        uniqueGuessID: prevGuessID++
      };
      guessStack.push(newGuess);
  //  console.log("Board Pushed to Stack");
  //   console.log(boardToString());
  //   console.log(possToString());
    }
    guessStack.forEach(g =>{console.log(g.uniqueGuessID);})
    // console.log("End of while loop");
  }

  return "Error - While ended";
}; //solveSudoku

const guessBoard3 = [
  ["1", ".", ".", ".", "7", ".", ".", "3", "."],
  ["8", "3", ".", "6", ".", ".", ".", ".", "."],
  [".", ".", "2", "9", ".", ".", "6", ".", "8"],
  ["6", ".", ".", ".", ".", "4", "9", ".", "7"],
  [".", "9", ".", ".", ".", ".", ".", "5", "."],
  ["3", ".", "7", "5", ".", ".", ".", ".", "4"],
  ["2", ".", "3", ".", ".", "9", "1", ".", "."],
  [".", ".", ".", ".", ".", "2", ".", "4", "3"],
  [".", "4", ".", ".", "8", ".", ".", ".", "9"]
];

const guessBoard2 = [
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

const guessBoard = [
  [".", ".", "9", "7", "4", "8", ".", ".", "."],
  ["7", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", "2", ".", "1", ".", "9", ".", ".", "."],
  [".", ".", "7", ".", ".", ".", "2", "4", "."],
  [".", "6", "4", ".", "1", ".", "5", "9", "."],
  [".", "9", "8", ".", ".", ".", "3", ".", "."],
  [".", ".", ".", "8", ".", "3", ".", "2", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "6"],
  [".", ".", ".", "2", "7", "5", "9", ".", "."]
];
const straightForward = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];

// out = solveSudoku(straightForward);
// out = solveSudoku(guessBoard);
out = solveSudoku(guessBoard2);
console.log(out);

guessboardAnswswer = [
  ["5", "1", "9", "7", "4", "8", "6", "3", "2"],
  ["7", "8", "3", "6", "5", "2", "4", "1", "9"],
  ["4", "2", "6", "1", "3", "9", "8", "7", "5"],
  ["3", "5", "7", "9", "8", "6", "2", "4", "1"],
  ["2", "6", "4", "3", "1", "7", "5", "9", "8"],
  ["1", "9", "8", "5", "2", "4", "3", "6", "7"],
  ["9", "7", "5", "8", "6", "3", "1", "2", "4"],
  ["8", "3", "2", "4", "9", "1", "7", "5", "6"],
  ["6", "4", "1", "2", "7", "5", "9", "8", "3"]
];

guessboard2Answer = [
  ["8", "5", "4", "2", "1", "9", "7", "6", "3"],
  ["3", "9", "7", "8", "6", "5", "4", "2", "1"],
  ["2", "6", "1", "4", "7", "3", "9", "8", "5"],
  ["7", "8", "5", "1", "2", "6", "3", "9", "4"],
  ["6", "4", "9", "5", "3", "8", "1", "7", "2"],
  ["1", "3", "2", "9", "4", "7", "8", "5", "6"],
  ["9", "2", "6", "3", "8", "4", "5", "1", "7"],
  ["5", "1", "3", "7", "9", "2", "6", "4", "8"],
  ["4", "7", "8", "6", "5", "1", "2", "3", "9"]
];
