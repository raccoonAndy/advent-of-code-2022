import { readFile } from '../readFile.ts';

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x}, ${this.y}`;
  }
}

const parseInput = async (): Promise<number[][]> => {
  const map: number[][] = [];
  await readFile('input', (line: string) => {
    const mapLine = line.split('').map((letter) => {
      if (letter == 'S') {
        return 'a'.charCodeAt(0) - 'a'.charCodeAt(0) - 1;
      }
      if (letter == 'E') {
        return 'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
      }
      return letter.charCodeAt(0) - 'a'.charCodeAt(0);
    });
    map.push(mapLine);
  });

  return map;
};

function getNeighbors(map: number[][], p: Point, reverse = false): Point[] {
  const points: Point[] = [
    new Point(p.x - 1, p.y),
    new Point(p.x + 1, p.y),
    new Point(p.x, p.y - 1),
    new Point(p.x, p.y + 1),
  ];

  return points.filter(
    (point) =>
      point.y < map.length &&
      point.x < map[0].length &&
      point.x >= 0 &&
      point.y >= 0 &&
      (reverse
        ? map[p.y][p.x] - map[point.y][point.x] < 2
        : map[point.y][point.x] - map[p.y][p.x] < 2)
  );
}

// Dijkstra’s Algorithm
function searchPath(map: number[][], start: Point, reverse = false): Record<string, number> {
  const queue = [{ point: start, priority: 0 }];
  const cost_so_far: Record<string, number> = {};
  cost_so_far[start.toString()] = 0;
  while (queue.length) {
    const current = queue.shift()!.point;
    const neighbors = getNeighbors(map, current, reverse);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      const new_cost = cost_so_far[current.toString()] + 1;
      if (!cost_so_far[neighbor.toString()] || new_cost < cost_so_far[neighbor.toString()]) {
        cost_so_far[neighbor.toString()] = new_cost;
        const priority = new_cost;
        queue.push({ point: neighbor, priority });
        queue.sort((a, b) => (a.priority < b.priority ? -1 : 1));
      }
    }
  }
  return cost_so_far;
}

function startEndPoints(map: number[][], start = -1): { startPoint: Point; endPoint: Point } {
  let endPoint: Point = new Point(0, 0);
  let startPoint: Point = new Point(0, 0);
  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[0].length; x += 1) {
      const vertex = new Point(x, y);
      if (start == -1) {
        if (map[y][x] == 26) {
          endPoint = vertex;
        }
      }
      if (map[y][x] == start) {
        startPoint = vertex;
      }
    }
  }

  return {
    startPoint: startPoint,
    endPoint: endPoint,
  };
}

// Part 1
const runPartOne = async () => {
  const map = await parseInput();
  const points = startEndPoints(map);
  const cost_so_far = searchPath(map, points.startPoint);
  console.log('Part 1: ', cost_so_far[points.endPoint.toString()]);
};

runPartOne();

// Part 2
const runPartTwo = async () => {
  const map = await parseInput();
  const points = startEndPoints(map, 26); // 'E' = 26
  const cost_so_far = searchPath(map, points.startPoint, true);
  let minDistanceFromA = Number.MAX_SAFE_INTEGER;
  for (const key in cost_so_far) {
    if (minDistanceFromA > cost_so_far[key]) {
      const point = key.split(',').map((x) => parseInt(x.trim(), 10));
      const p = new Point(point[0], point[1]);
      if (map[p.y][p.x] == 0) {
        minDistanceFromA = cost_so_far[key];
      }
    }
  }
  console.log('Part 2: ', minDistanceFromA);
};

runPartTwo();
