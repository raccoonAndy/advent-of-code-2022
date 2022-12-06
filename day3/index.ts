import { readFile } from '../readFile.ts';

function getCode(symbol: string): number {
  let code = symbol.charCodeAt(0) - 'A'.charCodeAt(0);
  if (code > 25) {
    code = symbol.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  } else {
    code = code + 27;
  }
  return code;
}

// Part 1
const runPartOne = async () => {
  const repeatedSymbols = new Map();
  await readFile('input', (line: string) => {
    const left = line.slice(0, Math.ceil(line.length / 2));
    const right = line.slice(Math.ceil(line.length / 2), line.length);
    let code = 0;
    for (let i = 0; i < left.length; i += 1) {
      if (right.includes(left[i])) {
        code = getCode(left[i]);
        if (repeatedSymbols.has(left[i])) {
          repeatedSymbols.set(left[i], repeatedSymbols.get(left[i]) + code);
        } else {
          repeatedSymbols.set(left[i], code);
        }
        break;
      }
    }
  });
  let sum = 0;
  repeatedSymbols.forEach((value) => {
    sum += value;
  });
  console.log('Part 1: ', sum);
};

runPartOne();

// Part 2
const runPartTwo = async () => {
  const rucksacks: string[] = [];
  let count = 0;
  let sum = 0;
  await readFile('input', (line: string) => {
    rucksacks[count % 3] = line;
    if (count % 3 === 2) {
      const a = new Set(rucksacks[0]);
      const b = new Set(rucksacks[1]);
      const c = new Set(rucksacks[2]);
      const result = new Set([...a].filter((x) => b.has(x) && c.has(x)));
      sum += getCode(result.values().next().value);
    }
    count++;
  });
  console.log('Part 2: ', sum);
};

runPartTwo();
