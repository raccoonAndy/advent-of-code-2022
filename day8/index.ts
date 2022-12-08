import { readFile } from '../readFile.ts';

// Part 1
// start [1][1]
// end [len - 1][len - 1]
// i - row, j - col
interface ITallestTrees {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

function getTallestTree(matrix: number[][], i: number, j: number): ITallestTrees {
  let tallestTop = -1;
  let tallestLeft = -1;
  let tallestBottom = -1;
  let tallestRight = -1;
  for (let m = 0; m < i; m += 1) {
    tallestTop = Math.max(matrix[m][j], tallestTop);
  }
  for (let m = 0; m < j; m += 1) {
    tallestLeft = Math.max(matrix[i][m], tallestLeft);
  }
  for (let m = i + 1; m < matrix.length; m += 1) {
    tallestBottom = Math.max(matrix[m][j], tallestBottom);
  }
  for (let m = j + 1; m < matrix[i].length; m += 1) {
    tallestRight = Math.max(matrix[i][m], tallestRight);
  }

  return {
    bottom: tallestBottom,
    top: tallestTop,
    left: tallestLeft,
    right: tallestRight,
  } as ITallestTrees;
}
const runPartOne = async () => {
  const matrix: number[][] = [];
  let countVisible = 0;
  await readFile('input', (line: string) => {
    const row = line.split('').map((x) => parseInt(x, 10));
    matrix.push(row);
  });
  for (let i = 1; i < matrix.length - 1; i += 1) {
    for (let j = 1; j < matrix[i].length - 1; j += 1) {
      const current = matrix[i][j];
      const tallestTree = getTallestTree(matrix, i, j);
      if (
        tallestTree.bottom < current ||
        tallestTree.left < current ||
        tallestTree.right < current ||
        tallestTree.top < current
      ) {
        countVisible++;
      }
    }
  }
  const countEdges = (matrix.length + matrix[0].length) * 2 - 4;
  console.log('Part 1: ', countEdges + countVisible);
};

runPartOne();

// Part 2
const runPartTwo = async () => {
  const matrix: number[][] = [];
  let result: number = Number.MIN_VALUE;
  await readFile('input', (line: string) => {
    const row = line.split('').map((x) => parseInt(x, 10));
    matrix.push(row);
  });
  for (let i = 1; i < matrix.length - 1; i += 1) {
    for (let j = 1; j < matrix[i].length - 1; j += 1) {
      let multiplying = 1;
      const current = matrix[i][j];
      for (let m = i - 1; m >= 0; m -= 1) {
        if (current <= matrix[m][j] || m == 0) {
          multiplying *= i - m;
          break;
        }
      }
      for (let m = j - 1; m >= 0; m -= 1) {
        if (current <= matrix[i][m] || m == 0) {
          multiplying *= j - m;
          break;
        }
      }
      for (let m = i + 1; m < matrix.length; m += 1) {
        if (current <= matrix[m][j] || m == matrix.length - 1) {
          multiplying *= m - i;
          break;
        }
      }
      for (let m = j + 1; m < matrix[0].length; m += 1) {
        if (current <= matrix[i][m] || m == matrix[0].length - 1) {
          multiplying *= m - j;
          break;
        }
      }
      result = Math.max(result, multiplying);
    }
  }
  console.log('Part 2: ', result);
};

runPartTwo();
