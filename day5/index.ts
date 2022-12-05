import { readFile } from '../readFile.ts';

// Part 1
const runPartOne = async () => {
  // const stacks = [['Z', 'N'], ['M', 'C', 'D'], ['P']];
  const stacks = [
    ['D', 'T', 'W', 'F', 'J', 'S', 'H', 'N'],
    ['H', 'R', 'P', 'Q', 'T', 'N', 'B', 'G'],
    ['L', 'Q', 'V'],
    ['N', 'B', 'S', 'W', 'R', 'Q'],
    ['N', 'D', 'F', 'T', 'V', 'M', 'B'],
    ['M', 'D', 'B', 'V', 'H', 'T', 'R'],
    ['D', 'B', 'Q', 'J'],
    ['D', 'N', 'J', 'V', 'R', 'Z', 'H', 'Q'],
    ['B', 'N', 'H', 'M', 'S'],
  ];
  await readFile('input', (line: string) => {
    const commands = line
      .split(' ')
      .filter((x) => x.match(/[0-9]/g))
      .map((x) => parseInt(x, 10));
    const move = commands[0];
    const from = commands[1];
    const to = commands[2];

    const stackFrom: string[] = stacks[from - 1];
    const stackTo: string[] = stacks[to - 1];

    for (let i = 0; i < move; i += 1) {
      const item = stackFrom.pop();
      if (item != undefined) {
        stackTo.push(item);
      }
    }
  });
  let result = '';
  for (let i = 0; i < stacks.length; i += 1) {
    const stack = stacks[i];
    result += stack.pop();
  }
  console.log('Part 1: ', result);
};

runPartOne();

// Part 2
const runPartTwo = async () => {
  // const stacks = [['Z', 'N'], ['M', 'C', 'D'], ['P']];
  const stacks = [
    ['D', 'T', 'W', 'F', 'J', 'S', 'H', 'N'],
    ['H', 'R', 'P', 'Q', 'T', 'N', 'B', 'G'],
    ['L', 'Q', 'V'],
    ['N', 'B', 'S', 'W', 'R', 'Q'],
    ['N', 'D', 'F', 'T', 'V', 'M', 'B'],
    ['M', 'D', 'B', 'V', 'H', 'T', 'R'],
    ['D', 'B', 'Q', 'J'],
    ['D', 'N', 'J', 'V', 'R', 'Z', 'H', 'Q'],
    ['B', 'N', 'H', 'M', 'S'],
  ];
  await readFile('input', (line: string) => {
    const commands = line
      .split(' ')
      .filter((x) => x.match(/[0-9]/g))
      .map((x) => parseInt(x, 10));
    const move = commands[0];
    const from = commands[1];
    const to = commands[2];

    const stackFrom: string[] = stacks[from - 1];
    const stackTo: string[] = stacks[to - 1];
    const boxes: string[] = [];
    for (let i = 0; i < move; i += 1) {
      const item = stackFrom.pop();
      if (item != undefined) {
        boxes.push(item);
      }
    }
    for (let i = 0; i < move; i += 1) {
      const item = boxes.pop();
      if (item != undefined) {
        stackTo.push(item);
      }
    }
  });
  let result = '';
  for (let i = 0; i < stacks.length; i += 1) {
    const stack = stacks[i];
    result += stack.pop();
  }
  console.log('Part 2: ', result);
};

runPartTwo();
