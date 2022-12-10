import { readFile } from '../readFile.ts';

// Part 1
const runPartOne = async () => {
  let signal = 0;
  let xValue = 1;
  let sum = 0;
  let prev = 0;
  await readFile('input', (line: string) => {
    const command = line.split(' ');
    const steps = command[0] == 'addx' ? 2 : 1;
    for (let i = 0; i < steps; i += 1) {
      signal += 1;
      if (signal == 20 || signal - prev == 40) {
        prev = signal;
        sum += signal * xValue;
      }
    }
    if (command[0] == 'addx') {
      xValue += parseInt(command[1], 10);
    }
  });
  console.log('Part 1: ', sum);
};

runPartOne();

// Part 2
const runPartTwo = async () => {
  let signal = 0;
  let spriteAtIndex = 0;
  let result = '';
  await readFile('input', (line: string) => {
    const command = line.split(' ');
    const steps = command[0] == 'addx' ? 2 : 1;
    for (let i = 0; i < steps; i += 1) {
      if (signal >= spriteAtIndex && signal < spriteAtIndex + 3) {
        result += '#';
      } else {
        result += '.';
      }
      signal += 1;
      if (signal == 40) {
        signal = 0;
        result += '\n';
      }
    }
    if (command[0] == 'addx') {
      spriteAtIndex += parseInt(command[1], 10);
    }
  });
  console.log('Part 2:');
  console.log(result);
};

runPartTwo();
