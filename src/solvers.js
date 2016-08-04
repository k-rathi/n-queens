/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var model = new Board({'n': n});
  var solution = undefined; //fixme
  for (var i = 0; i < n; i++) {
    model.togglePiece(i, i);
  }
  solution = model.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  solution = 1;
  for (var i = 1; i < n + 1; i++) {
    solution = solution * i;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
//http://www.cl.cam.ac.uk/~mr10/backtrk.pdf
//http://stackoverflow.com/questions/6719316/can-i-turn-negative-number-to-positive-with-bitwise-operations-in-actionscript-3#_=_
window.findNQueensSolution = function(n, pastVectors) {
  let matrix = new Board({n: n});
  //debugger;
  if (n === 0 || n === 2 || n === 3) {
    //do nothing for it shall fail
  } else if (n === 1) {
    matrix.get(0)[0] = 1;
  } else {
    let queenVectors = [];
    (function setAttacks (rowIndex) {
      //insert queen
      //check next row
      //if a queen passes, do next check, then keep going
      //if fail, pass up false
      //if false, reset current index from 1 to 0 and move to next entry
      //if no next entry, pass false
      //if pass on last level return matrix
      let row = matrix.get(rowIndex);
      let height = matrix.rows().length;
      let width = row.length;
      for (var i = 0; i < width; i++) {
        if (!matrix.hasAnyQueenConflictsOn(rowIndex, i)) {
          row[i] = 1;
          if (matrix.get(rowIndex + 1) && !setAttacks(rowIndex + 1)) {
            row[i] = 0;
          } else {
            return true;
          }
        }
      } if (row.indexOf(1) === -1) {
        return false;
      }
    })(0);
  }

  solution = matrix.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme
  if (n < 4) {
    return 0;
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};






      // for (let i = 0; i < width; i++) {
      //   if (!row[i]) {
      //     for (let j = i; j < width; j++) {
      //       row[i] = 1; 
      //     }
      //     let offset = 1;
      //     for (let j = rowIndex; j < height; j++) {
      //       let row = matrix.get(j);
      //       row[i] = 1; 
      //       if (i - offset >= 0) {
      //         row[i - offset] = 1; 
      //       } 
      //       if (i + offset < row.length) {
      //         row[i + offset] = 1;
      //       }
      //       offset++;
      //     }
      //     row[i] = 2; //set as queen
      //   }

      // }
      // return setAttacks(matrix, rowIndex + 1);