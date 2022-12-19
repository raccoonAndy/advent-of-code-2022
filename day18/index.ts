import { readFile } from '../readFile.ts';

const parseInput = async () => {
  const coords: number[][] = [];
  await readFile('input', (line: string) => {
    const pointer = line.split(',').map((x) => parseInt(x, 10));
    coords.push(pointer);
  });

  return coords;
};

// Part 1
const runPartOne = async () => {
  const coords = await parseInput();
  const map: Map<string, number> = new Map();
  coords.forEach(([x, y, z]) => {
    const key = `${x},${y},${z}`;
    if (!map.has(key)) {
      map.set(key, 6);
      map.forEach((_, mKey) => {
        const point = mKey.split(',').map((x) => parseInt(x, 10));
        const diffX = Math.abs(x - point[0]);
        const diffY = Math.abs(y - point[1]);
        const diffZ = Math.abs(z - point[2]);
        const isLeft = diffX == 1 && diffY == 0 && diffZ == 0;
        const isRight = diffX == 0 && diffY == 1 && diffZ == 0;
        const isTop = diffX == 0 && diffY == 0 && diffZ == 1;
        if (isLeft || isRight || isTop) {
          map.set(mKey, map.get(mKey)! - 1);
          map.set(key, map.get(key)! - 1);
          return;
        }
      });
    }
  });
  const sides = [...map.values()].reduce((acc, curr) => acc + curr, 0);
  console.log('Part 1: ', sides);
};

runPartOne();

// Part 2
class Point {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toString() {
    return `${this.x},${this.y},${this.z}`;
  }
}
const runPartTwo = async () => {
  const coords = await parseInput();
  const coordsSet: Set<string> = new Set();
  coords.map(([x, y, z]) => coordsSet.add(`${x},${y},${z}`));
  const dirs = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, -1],
  ];

  function getAdjacent(point: Point) {
    return dirs.map(([dx, dy, dz]) => [point.x + dx, point.y + dy, point.z + dz]);
  }

  const startPoint = new Point(0, 0, 0);
  const r = new Set(startPoint.toString());
  const queue: Point[] = [startPoint];

  while (queue.length) {
    const curr = queue.pop()!;
    const currAdj = getAdjacent(curr);
    currAdj.map((p) => {
      const point = new Point(p[0], p[1], p[2]);
      if (
        p.every((b) => b >= -1 && b <= 23) &&
        !r.has(point.toString()) &&
        !coordsSet.has(point.toString())
      ) {
        r.add(point.toString());
        queue.push(point);
      }
    });
  }

  let sum = 0;
  coords.map((point) => {
    const pointAdj = getAdjacent(new Point(point[0], point[1], point[2]));
    let sumAdj = 0;
    pointAdj.map((p) => {
      sumAdj += r.has(`${p[0]},${p[1]},${p[2]}`) ? 1 : 0;
    });
    sum += sumAdj;
  });

  console.log('Part 2: ', sum);
};

runPartTwo();
