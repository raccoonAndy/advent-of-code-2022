import { readFile } from '../readFile.ts';

// Part 1
const runPartOne = async () => {
  let sum = 0;
  let max = Number.MIN_VALUE;
  await readFile('input', (line: string) => {
    if (line !== '') {
      const current = parseInt(line);
      sum += current;
    } else {
      max = Math.max(sum, max);
      sum = 0;
    }
  });
  if (sum != 0) {
    max = Math.max(sum, max);
  }
  console.log('Part 1: ', max);
};

runPartOne();

// Part 2
const runPartTwo = async () => {
  let sum = 0;
  const allSums: number[] = [];
  await readFile('input', (line: string) => {
    if (line !== '') {
      const current = parseInt(line);
      sum += current;
    } else {
      allSums.push(sum);
      sum = 0;
    }
  });
  if (sum != 0) {
    allSums.push(sum);
  }
  const sorted = allSums.sort((a, b) => (a < b ? 1 : -1));
  console.log('Part 2: ', sorted[0] + sorted[1] + sorted[2]);
};

runPartTwo();
