import { readFile } from '../readFile.ts';

// Part 1
// A - rock < B - paper < C - scissors
// X (1) - rock < Y (2) - paper < Z (3) - scissors
// lose - 0, draw - 3, win - 6
// AX, BY, CZ — draw
// AZ, BX, CY — win
// AY, BZ, CX — lose
const runPartOne = async () => {
  const combinations: Record<string, Record<string, number[]>> = {
    A: {
      X: [1, 3],
      Y: [2, 6],
      Z: [3, 0],
    },
    B: {
      X: [1, 0],
      Y: [2, 3],
      Z: [3, 6],
    },
    C: {
      X: [1, 6],
      Y: [2, 0],
      Z: [3, 3],
    },
  };
  let sum = 0;
  await readFile('input', (line: string) => {
    const game = line.split(' ');
    sum += combinations[game[0]][game[1]][0] + combinations[game[0]][game[1]][1];
  });
  console.log('Part 1: ', sum);
};

runPartOne();

// Part 2
// X - lose, Y - draw, Z - win
// A - rock < B - paper < C - scissors
const runPartTwo = async () => {
  const combinations: Record<string, Record<string, number[]>> = {
    A: {
      Y: [1, 3],
      Z: [2, 6],
      X: [3, 0],
    },
    B: {
      X: [1, 0],
      Y: [2, 3],
      Z: [3, 6],
    },
    C: {
      Z: [1, 6],
      X: [2, 0],
      Y: [3, 3],
    },
  };
  let sum = 0;
  await readFile('input', (line: string) => {
    const game: string[] = line.split(' ');
    sum += combinations[game[0]][game[1]][0] + combinations[game[0]][game[1]][1];
  });
  console.log('Part 2: ', sum);
};

runPartTwo();
