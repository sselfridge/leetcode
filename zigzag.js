/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  if(numRows === 1 ) return s;
    const grid = [];
  let count = numRows;
  while (count > 0) {
    const newArray = [];
    grid.push(newArray);
    count--;
  }
  let x = 0,
    y = 0,
    i = 0; //pointers for our place in the grid

  while (s[i]) {
    //print down the row
    while (y < numRows && s[i]) {
      y;
      grid[y][x] = s[i];
      y++;
      i++;
    }
    y = numRows - 1;

    //return to top
    if (numRows > 2) {
      do {
        if (s[i] === undefined) break;

        x++;
        y--;
        grid[y][x] = s[i];

        i++;
      } while (y > 1);
    }

    x++;
    y--;
    // break;
  }
  let resultString = "";
  for (let i = 0; i < numRows; i++) {
    const array = grid[i];
    array.forEach(letter => {
      resultString = resultString + letter;
    });
  }

  return resultString;
};

const string = "ABCD";
out = convert(string, 2);

console.log(out);
