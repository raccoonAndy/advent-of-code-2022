import { readFile } from '../readFile.ts';

const manhattanDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

class BeaconData {
  coordinates: number[];
  distance: number;
  length: number[];

  constructor(coords: number[], distance: number, length: number[]) {
    this.coordinates = coords;
    this.distance = distance;
    this.length = length;
  }
}

// const ROW = 10;
// const SQUARE = 20;
const FREQ = 4000000;
const ROW = 2000000;
const SQUARE = 4000000;
const parseInput = async () => {
  const data: Map<number[], BeaconData> = new Map();

  await readFile('input', (line: string) => {
    const splitLine = line.split(':');
    const regexpValueX = /x(=-|=)[0-9]*/g;
    const regexpValueY = /y(=-|=)[0-9]*/g;
    const sX = splitLine[0].search(regexpValueX);
    const sY = splitLine[0].search(regexpValueY);
    const bX = splitLine[1].search(regexpValueX);
    const bY = splitLine[1].search(regexpValueY);
    const sensorX = splitLine[0].substring(sX + 2, sY);
    const sensorY = splitLine[0].substring(sY + 2);
    const beaconX = splitLine[1].substring(bX + 2, bY);
    const beaconY = splitLine[1].substring(bY + 2);
    const sensor = [parseInt(sensorX, 10), parseInt(sensorY, 10)];
    const beacon = [parseInt(beaconX, 10), parseInt(beaconY, 10)];
    if (!data.has(sensor)) {
      data.set(sensor, new BeaconData(beacon, 0, []));
    }
  });

  return data;
};

const setDistance = (data: Map<number[], BeaconData>) => {
  data.forEach((beacon, sensor) => {
    const distance = manhattanDistance(
      sensor[0],
      sensor[1],
      beacon.coordinates[0],
      beacon.coordinates[1]
    );
    beacon.distance = distance;
  });
};

const getExistingBeaconsInRow = (data: Map<number[], BeaconData>) => {
  const setBeacons = new Set();
  data.forEach((beacon) => {
    if (beacon.coordinates[1] == ROW) {
      setBeacons.add(beacon.coordinates[0]);
    }
  });

  return setBeacons;
};

// Part 1
const setLengthManhattanDistance = (data: Map<number[], BeaconData>) => {
  data.forEach((beacon, sensor) => {
    const rowDiff = Math.abs(ROW - sensor[1]);
    if (rowDiff > beacon.distance) {
      data.delete(sensor);
    } else {
      const rest = beacon.distance - rowDiff;
      beacon.length.push(sensor[0] - rest, sensor[0] + rest);
    }
  });
};

const runPartOne = async () => {
  const data = await parseInput();
  setDistance(data);
  const setBeacons = getExistingBeaconsInRow(data);
  setLengthManhattanDistance(data);
  const result = new Set();
  data.forEach((beacon) => {
    for (let i = beacon.length[0]; i <= beacon.length[1]; i += 1) {
      if (setBeacons.has(i)) continue;
      result.add(i);
    }
  });

  console.log('Part 1: ', result.size);
};

runPartOne();

// Part 2
const setLengthManhattanDistance2 = (data: Map<number[], BeaconData>) => {
  for (let y = 0; y <= SQUARE; y += 1) {
    const len: number[][] = [];
    data.forEach((beacon, sensor) => {
      const rowDiff = Math.abs(y - sensor[1]);
      if (rowDiff <= beacon.distance) {
        const rest = beacon.distance - rowDiff;
        const start = sensor[0] - rest;
        const end = sensor[0] + rest;
        if (end >= 0 || start <= SQUARE) {
          len.push([start, end]);
        }
      }
    });
    const sortedLen = len.sort((a, b) => (a[0] > b[0] ? 1 : -1));
    let endCurr = sortedLen[0][1];
    for (let i = 0; i < sortedLen.length - 1; i += 1) {
      const startNext = sortedLen[i + 1][0];
      endCurr = Math.max(endCurr, sortedLen[i][1]);
      if (startNext <= endCurr) continue;
      return [startNext - 1, y];
    }
  }
  return [0, 0];
};
const runPartTwo = async () => {
  const data = await parseInput();
  setDistance(data);
  const coords: number[] = setLengthManhattanDistance2(data);
  const result = coords[0] * FREQ + coords[1];
  console.log('Part 2: ', result);
};

runPartTwo();
