import { readFile } from '../readFile.ts';

const ADD_SPACE = 11;
// const ADD_SPACE = 100;

class Coords {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class MaxCoords {
  maxX: number;
  maxY: number;
  constructor(x: number, y: number) {
    this.maxX = x;
    this.maxY = y;
  }
}

const getOffsetX = async () => {
  let minX = Number.MAX_SAFE_INTEGER;
  await readFile('test', (line: string) => {
    const coordinates = line.split(' -> ').map((xy) => xy.split(',').map((v) => parseInt(v, 10)));
    for (let i = 0; i < coordinates.length; i += 1) {
      minX = coordinates[i][0] < minX ? coordinates[i][0] : minX;
    }
  });

  return minX;
};

const getMaxCoords = async (offset: number) => {
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  await readFile('test', (line: string) => {
    const coordinates = line.split(' -> ').map((xy) => xy.split(',').map((v) => parseInt(v, 10)));
    for (let i = 0; i < coordinates.length; i += 1) {
      maxX = coordinates[i][0] > maxX ? coordinates[i][0] : maxX;
      maxY = coordinates[i][1] > maxY ? coordinates[i][1] : maxY;
    }
  });

  return new MaxCoords(maxX - offset, maxY);
};

const drawMap = (map: string[][]) => {
  let stdout = '';
  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[0].length; j += 1) {
      stdout += map[i][j];
    }
    stdout += '\n';
  }
  console.log(stdout);
};

const parseInput = async (offset: number, maxCoords: MaxCoords) => {
  const map: string[][] = [...new Array(maxCoords.maxY + 3)].map(() =>
    [...new Array(maxCoords.maxX + ADD_SPACE * 2)].map(() => '.')
  );
  await readFile('test', (line: string) => {
    const coordinates = line.split(' -> ').map((xy) => xy.split(',').map((v) => parseInt(v, 10)));
    for (let i = 0; i < coordinates.length; i += 1) {
      coordinates[i][0] = coordinates[i][0] - offset;
    }
    for (let i = 0; i < coordinates.length - 1; i += 1) {
      const currX = coordinates[i][0];
      const currY = coordinates[i][1];
      const nextX = coordinates[i + 1][0];
      const nextY = coordinates[i + 1][1];
      const diffX = nextX - currX;
      const diffY = nextY - currY;
      for (let y = 0; y <= Math.abs(diffY); y += 1) {
        for (let x = 0; x <= Math.abs(diffX); x += 1) {
          const indexX = currX + Math.sign(diffX) * x;
          const indexY = currY + Math.sign(diffY) * y;
          map[indexY][indexX] = '#';
        }
      }
    }
  });

  return map;
};

// Part 1
const getCountGrainOfSand = (map: string[][], start: Coords) => {
  function addSand(): boolean {
    let x = start.x;
    let y = start.y;
    while (true) {
      if (y + 1 == map.length) {
        return false;
      }
      if (map[y + 1][x] == '.') {
        y++;
      } else if (map[y + 1][x - 1] == '.') {
        x--;
        y++;
      } else if (map[y + 1][x + 1] == '.') {
        x++;
        y++;
      } else {
        if (x < 1 || x >= map[0].length - 1) throw Error('map is too small');
        map[y][x] = 'o';
        return y != 0;
      }
    }
  }
  let res = 0;
  while (addSand()) res++;

  return res;
};
const runPartOne = async () => {
  const offsetX = await getOffsetX();
  const sandCoords = new Coords(500 - offsetX + 1, 0);
  const maxCoords: MaxCoords = await getMaxCoords(offsetX);
  const map = await parseInput(offsetX - 1, maxCoords);
  map[sandCoords.y][sandCoords.x] = '+';
  const result = getCountGrainOfSand(map, sandCoords);
  drawMap(map);

  console.log('Part 1: ', result);
};

runPartOne();

// Part 2
const runPartTwo = async () => {
  const offsetX = await getOffsetX();
  const sandCoords = new Coords(500 - offsetX + ADD_SPACE, 0);
  const maxCoords: MaxCoords = await getMaxCoords(offsetX);
  const map = await parseInput(offsetX - ADD_SPACE, maxCoords);
  for (let x = 0; x < map[0].length; x += 1) {
    map[maxCoords.maxY + 2][x] = '#';
  }
  map[sandCoords.y][sandCoords.x] = '+';
  const result = getCountGrainOfSand(map, sandCoords);
  drawMap(map);

  console.log('Part 2: ', result + 1);
};

runPartTwo();
