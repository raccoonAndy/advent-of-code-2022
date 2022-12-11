import { readFile } from '../readFile.ts';

// Part 1
interface IOperation {
  operation: string;
  number: bigint;
}
interface INextMonkeys {
  true: string;
  false: string;
}

let multiplyDivs = BigInt(1);

interface IMonkey {
  items: bigint[];
  operation: IOperation;
  divisible: bigint;
  nextMonkey: INextMonkeys;
  sumItems: number;
}
const abs = (n: bigint) => (n < BigInt(0) ? -n : n);
const parseInput = async (): Promise<Map<string, IMonkey>> => {
  const monkeys: Map<string, IMonkey> = new Map();
  let currentMonkey = '';
  const commands = ['Starting items:', 'Operation:', 'Test:', 'If true', 'If false'];
  await readFile('input', (line: string) => {
    line = line.trim();
    if (line.startsWith('Monkey')) {
      monkeys.set(line, {} as IMonkey);
      currentMonkey = line;
    }
    const dataMonkey = monkeys.get(currentMonkey)!;
    dataMonkey.sumItems = 0;
    if (line.startsWith(commands[0])) {
      const items = line
        .slice(commands[0].length + 1)
        .replace(',', '')
        .split(' ')
        .map((x) => BigInt(parseInt(x, 10)));
      dataMonkey.items = items;
    }
    if (line.startsWith(commands[1])) {
      const cutString = `${commands[1]}: new = old`;
      const operation = line.slice(cutString.length).trim().split(' ');
      if (dataMonkey.operation == undefined) {
        dataMonkey.operation = {} as IOperation;
      }
      dataMonkey.operation.operation = operation[0];
      if (operation[1] == 'old') operation[1] = '-1';
      dataMonkey.operation.number = BigInt(parseInt(operation[1], 10));
    }
    if (line.startsWith(commands[2])) {
      const cutString = `${commands[2]}: divisible by`;
      const divisible = parseInt(line.slice(cutString.length).trim(), 10);
      dataMonkey.divisible = BigInt(divisible);
      multiplyDivs *= abs(dataMonkey.divisible);
    }
    if (line.startsWith(commands[3]) || line.startsWith(commands[4])) {
      const cutString = line.startsWith(commands[3])
        ? `${commands[3]}: throw to`
        : `${commands[4]}: throw to`;
      const string = line.slice(cutString.length).trim();
      const nextMonkey = string.charAt(0).toUpperCase() + string.slice(1) + ':';
      if (dataMonkey.nextMonkey == undefined) {
        dataMonkey.nextMonkey = {} as INextMonkeys;
      }
      if (line.startsWith(commands[3])) {
        dataMonkey.nextMonkey.true = nextMonkey;
      } else {
        dataMonkey.nextMonkey.false = nextMonkey;
      }
    }
  });

  return monkeys;
};

const runPartOne = async () => {
  const monkeys = await parseInput();
  for (let round = 1; round < 21; round += 1) {
    monkeys.forEach((value) => {
      value.sumItems += value.items.length;
      for (let i = 0; i < value.items.length; i += 1) {
        let item = value.items.shift() as bigint;
        if (!item) continue;
        i--;
        const operatorValue = value.operation.number == BigInt(-1) ? item : value.operation.number;
        switch (value.operation.operation) {
          case '*': {
            item *= operatorValue;
            break;
          }
          case '/': {
            item /= operatorValue;
            break;
          }
          case '-': {
            item -= operatorValue;
            break;
          }
          default: {
            item += operatorValue;
            break;
          }
        }
        item = BigInt(Math.floor(Number(item) / 3));
        const nextMonkey = value.nextMonkey[`${item % value.divisible == BigInt(0)}`];
        const dataNextMonkey = monkeys.get(nextMonkey);
        dataNextMonkey?.items.push(item);
      }
    });
  }
  const result: number[] = [];
  monkeys.forEach((value) => {
    result.push(value.sumItems);
  });
  result.sort((a, b) => (a > b ? 1 : -1));
  console.log('Part 1: ', result[result.length - 1] * result[result.length - 2]);
};

runPartOne();

// Part 2
const runPartTwo = async () => {
  const monkeys = await parseInput();
  for (let round = 1; round < 10001; round += 1) {
    monkeys.forEach((value) => {
      value.sumItems += value.items.length;
      for (let i = 0; i < value.items.length; i += 1) {
        let item = value.items.shift() as bigint;
        if (!item) continue;
        i--;
        const operatorValue = value.operation.number == BigInt(-1) ? item : value.operation.number;
        switch (value.operation.operation) {
          case '*': {
            item *= operatorValue;
            break;
          }
          case '/': {
            item /= operatorValue;

            break;
          }
          case '-': {
            item -= operatorValue;
            break;
          }
          default: {
            item += operatorValue;
            break;
          }
        }
        const isDivisible = BigInt(item) % BigInt(value.divisible) == BigInt(0);
        const nextMonkey = value.nextMonkey[`${isDivisible}`];
        const dataNextMonkey = monkeys.get(nextMonkey);
        dataNextMonkey?.items.push(item % multiplyDivs);
      }
    });
  }
  const result: number[] = [];
  monkeys.forEach((value) => {
    result.push(value.sumItems);
  });
  result.sort((a, b) => (a > b ? 1 : -1));
  console.log('Part 2: ', result[result.length - 1] * result[result.length - 2]);
};

runPartTwo();
