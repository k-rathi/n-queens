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
    return matrix.rows();
  } else if (n === 1) {
    matrix.get(0)[0] = 1;
    return matrix.rows();
  } else {
    var setQueen = function (rowIndex) {
      //insert queen
      //check next row
      //if a queen passes, do next check, then keep going
      //if fail, pass up false
      //if false, reset current index from 1 to 0 and move to next entry
      //if no next entry, pass false
      //if pass on last level return matrix
      let row = matrix.get(rowIndex);
      let width = row.length;
      for (var i = 0; i < width; i++) { //traverse row
        row[i] = 1; //add queen
        if (matrix.hasAnyQueenConflictsOn(rowIndex, i)) { //if conflict
          row[i] = 0; //remove queen, and continue to next index
        } else { //if no conflict
          if (rowIndex + 1 < n) { //and there is a next row
            let pass = setQueen(rowIndex + 1); //perform setQueen on next row(s)
            if (pass) {
              return true;
            } else {
              row[i] = 0;
            }
          } else { //there is no next row, and we have a queen
            return true;
          }
        } 
      } 
      return false; //if no queen was set in row
    };
    return setQueen(0) ? matrix.rows() : false;
  }
  // solution = matrix.rows();
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
};

// window.countNQueensSolutions = function(n) {
//   let all = (1<<n)-1; //set matrix space to 1 bitshifted left n spaces, less 1 to remove the most significant bit and set all preceeding bits to 1 (both setting the range to n and making all first-row positions considered possible)
//   let solutionCount = 0;
//   let _try = (ld,cols,rd) => {
//     let possible = ~(ld | cols | rd) & all; //left diagonal, columns, and right diagonal OR together to find all taken spaces, complemented to get the open spaces, then AND with all to compare open spaces to possibilities from first row
//     while (possible) { //while there is at least one possibility
//       let bit = possible & -possible; //set bit to be the least significant bit out of the possibilities by performing AND on possible and -possible (two's complement)
//       possible ^= bit; //XOR equals to remove queen placement bit from possibilities
        
//       _try ( //look ahead at next row placement:
//         (ld | bit) << 1, //left diagonal attacks on next row (left bitshifted to continue down diagonal) + queen
//         cols | bit, //occupied columns
//         (rd | bit) >> 1) //taken right diagonal attacks (right bitshifted to continue down diagonal) + queen
//     }
//     solutionCount += cols === all; //if a valid solution was reached (columns filled is equal to all the columns)
//   }
//   _try(0, 0, 0); // 0 left diagonal collisions, 0 column collisions, 0 right diagonal collisions
//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };
 
 countNQueensSolutions = q=n=>{a=(1<<n)-1,s=0,t=(l,c,r)=>{let p=~(l|c|r)&a;while(p){b=p&-p;p^=b;t((l|b)<<1,c|b,(r|b)>>1)}s+=c===a};t(0,0,0);return s}

 