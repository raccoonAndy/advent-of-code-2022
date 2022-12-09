import { readFile } from '../readFile.ts';

// Part 1
const runPartOne = async () => {
  const visitedCoordinates: Set<string> = new Set();
  visitedCoordinates.add('0, 0');
  const head = [0, 0];
  const tail = [0, 0];
  await readFile('input', (line: string) => {
    const move = parseInt(line.split(' ')[1], 10);
    for (let i = 0; i < move; i += 1) {
      if (line.startsWith('R')) {
        head[0] += 1;
      } else if (line.startsWith('L')) {
        head[0] -= 1;
      } else if (line.startsWith('D')) {
        head[1] -= 1;
      } else {
        head[1] += 1;
      }
      const xDiff = head[0] - tail[0];
      const yDiff = head[1] - tail[1];
      if (Math.abs(xDiff) > 1) {
        tail[0] += Math.sign(xDiff);
        if (Math.abs(yDiff) == 1) {
          tail[1] += Math.sign(yDiff);
        }
      }
      if (Math.abs(yDiff) > 1) {
        tail[1] += Math.sign(yDiff);
        if (Math.abs(xDiff) == 1) {
          tail[0] += Math.sign(xDiff);
        }
      }
      visitedCoordinates.add(`${tail[0]}, ${tail[1]}`);
    }
  });
  console.log('Part 1: ', visitedCoordinates.size);

  // draw result
  for (let i = 0; i < 6; i++) {
    let s = '';
    for (let j = 0; j < 6; j++) {
      const f = `${j}, ${i}`;
      if (visitedCoordinates.has(f)) {
        s += '#';
      } else {
        s += '.';
      }
    }
    // console.log(s);
  }
};

runPartOne();

// Part 2
const runPartTwo = async () => {
  const visitedCoordinates: Set<string> = new Set();
  visitedCoordinates.add('0, 0');
  const coords = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  await readFile('input', (line: string) => {
    const move = parseInt(line.split(' ')[1], 10);
    for (let i = 0; i < move; i += 1) {
      if (line.startsWith('R')) {
        coords[0][0] += 1;
      } else if (line.startsWith('L')) {
        coords[0][0] -= 1;
      } else if (line.startsWith('D')) {
        coords[0][1] -= 1;
      } else {
        coords[0][1] += 1;
      }
      let prev = coords[0];
      for (let j = 1; j <= 9; j += 1) {
        const xDiff = prev[0] - coords[j][0];
        const yDiff = prev[1] - coords[j][1];
        if (Math.abs(xDiff) > 1) {
          coords[j][0] += Math.sign(xDiff);
          if (Math.abs(yDiff) == 1) {
            coords[j][1] += Math.sign(yDiff);
          }
        }
        if (Math.abs(yDiff) > 1) {
          coords[j][1] += Math.sign(yDiff);
          if (Math.abs(xDiff) == 1) {
            coords[j][0] += Math.sign(xDiff);
          }
        }
        prev = coords[j];
      }
      visitedCoordinates.add(`${coords[9][0]}, ${coords[9][1]}`);
    }
  });
  console.log('Part 2: ', visitedCoordinates.size);

  // draw result
  for (let i = -15; i < 15; i++) {
    let s = '';
    for (let j = -15; j < 15; j++) {
      const f = `${j}, ${i}`;
      if (visitedCoordinates.has(f)) {
        s += '#';
      } else {
        s += '.';
      }
    }
    // console.log(s);
  }
};

runPartTwo();
