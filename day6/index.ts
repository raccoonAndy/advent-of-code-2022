import { readFile } from '../readFile.ts';

// Part 1
const NUMBER_UNIQ_1 = 4;
const runPartOne = async () => {
  const counterSymbols: Map<string, number> = new Map();
  let count = 0;
  let result = 0;

  await readFile('input', (line: string) => {
    for (let i = 0; i < line.length; i += 1) {
      if (!counterSymbols.has(line[i])) {
        counterSymbols.set(line[i], 1);
        count += 1;
      } else {
        const value = counterSymbols.get(line[i]) as number;
        if (value === 0) {
          count += 1;
        }
        counterSymbols.set(line[i], value + 1);
      }
      if (i > NUMBER_UNIQ_1 - 1) {
        const symbolCount = counterSymbols.get(line[i - NUMBER_UNIQ_1]);
        if (symbolCount != undefined) {
          counterSymbols.set(line[i - NUMBER_UNIQ_1], symbolCount - 1);
          if (counterSymbols.get(line[i - NUMBER_UNIQ_1]) === 0) {
            count -= 1;
          }
        }
      }
      if (count === NUMBER_UNIQ_1) {
        result = i + 1;
        return result;
      }
    }
  });

  console.log('Part 1: ', result);
};

runPartOne();

// Part 2
const NUMBER_UNIQ_2 = 14;
const runPartTwo = async () => {
  const counterSymbols: Map<string, number> = new Map();
  let count = 0;
  let result = 0;

  await readFile('input', (line: string) => {
    for (let i = 0; i < line.length; i += 1) {
      if (!counterSymbols.has(line[i])) {
        counterSymbols.set(line[i], 1);
        count += 1;
      } else {
        const value = counterSymbols.get(line[i]) as number;
        if (value === 0) {
          count += 1;
        }
        counterSymbols.set(line[i], value + 1);
      }
      if (i > 13) {
        const symbolCount = counterSymbols.get(line[i - NUMBER_UNIQ_2]);
        if (symbolCount != undefined) {
          counterSymbols.set(line[i - NUMBER_UNIQ_2], symbolCount - 1);
          if (counterSymbols.get(line[i - NUMBER_UNIQ_2]) === 0) {
            count -= 1;
          }
        }
      }
      if (count === NUMBER_UNIQ_2) {
        result = i + 1;
        return result;
      }
    }
  });

  console.log('Part 2: ', result);
};

runPartTwo();
