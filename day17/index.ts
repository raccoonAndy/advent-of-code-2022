import { readFile } from '../readFile.ts';

const rocks = [
  [['#', '#', '#', '#']],
  [
    ['.', '#', '.'],
    ['#', '#', '#'],
    ['.', '#', '.'],
  ],
  [
    ['#', '#', '#'],
    ['.', '.', '#'],
    ['.', '.', '#'],
  ],
  [['#'], ['#'], ['#'], ['#']],
  [
    ['#', '#'],
    ['#', '#'],
  ],
];

const parseInput = async () => {
  const commands: number[] = [];
  await readFile('input', (line: string) => {
    for (let i = 0; i < line.length; i += 1) {
      if (line[i] == '<') {
        commands.push(-1);
      } else {
        commands.push(1);
      }
    }
  });

  return commands;
};

const COUNT_ROCKS_1 = 2022;
const COUNT_ROCKS_2 = 1000000000000;
const task = async () => {
  const jets = await parseInput();
  let j = 0;
  let maxY = 0;
  const fillChamber = new Set();
  const period = 1700;
  const samples: [number, number][] = [];
  for (let rock = 0; rock < COUNT_ROCKS_1 * 2 + 1; ) {
    const shape = rocks[rock % rocks.length];
    const coords: number[][] = [];
    shape.map((item, y) =>
      item.map((sign, x) => {
        if (sign == '#') {
          coords.push([x, y]);
        }
      })
    );
    const initCoords = coords.map(([x, y]) => [x + 2, y + maxY + 4]);
    rock++;
    while (true) {
      const dir = jets[j++ % jets.length];
      const canMoveX = initCoords.every(([x, y]) => {
        const newX = x + dir;
        return newX >= 0 && newX <= 6 && !fillChamber.has(newX + y * 7);
      });
      if (canMoveX) {
        initCoords.forEach((point) => (point[0] += dir));
      }
      const canMoveY = initCoords.every(([x, y]) => {
        const newY = y - 1;
        return newY >= 1 && !fillChamber.has(x + newY * 7);
      });
      if (canMoveY) {
        initCoords.forEach((point) => (point[1] -= 1));
      } else {
        break;
      }
    }

    const maxCoordY = initCoords
      .map(([_, y]) => y)
      .reduce((a, b) => Math.max(a, b), Number.MIN_SAFE_INTEGER);
    maxY = Math.max(maxY, maxCoordY);
    initCoords.map(([x, y]) => fillChamber.add(x + y * 7));

    if (rock == COUNT_ROCKS_1) console.log('Part 1: ', maxY);

    if (rock % period == COUNT_ROCKS_2 % period) {
      if (rock > period) {
        samples.push([rock, maxY]);
      }
    }
  }

  const [a, b] = samples;
  console.log('Part 2: ', ((COUNT_ROCKS_2 - a[0]) / period) * (b[1] - a[1]) + a[1]);
};

task();
