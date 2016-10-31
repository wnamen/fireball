// Matrix Search: Given an array of arrays (called a matrix) that is sorted from the top left to the bottom right, find a given value within the matrix. Return a pair of numbers that indicate the value's row and column. If the value is not present, return [-1, -1]. Can you use the idea of binary search to do it quickly?
//
var matrix = [
  [  1,  3,  6,  9 ],
  [ 10, 14, 18, 20 ],
  [ 28, 30, 34, 37 ]
];
matrixSearch(matrix, 18)
// // [1,2]
matrixSearch(matrix, 17)
// // [-1,-1]

function matrixSearch (matrix, key) {
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === key) {
        return [i, j];
      }
    }
  }

  return [-1,-1];
}
