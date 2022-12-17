import { readFile } from '../readFile.ts';

class Vertex {
  flow: number;
  adjacent: string[];

  constructor(flow: number, adjacent: string[]) {
    this.flow = flow;
    this.adjacent = adjacent;
  }
}

type Graph = Map<string, Vertex>;

const parseInput = async () => {
  const valves: Graph = new Map();
  await readFile('input', (line: string) => {
    const splitLine = line.split(';');
    const nodeString = splitLine[0].split(' ');
    const name = nodeString[1];
    const value = parseInt(nodeString[4].split('=')[1], 10);
    const vertexes = splitLine[1].trim().split(' ').slice(4).join('').split(',');
    if (!valves.has(name)) {
      valves.set(name, new Vertex(value, vertexes));
    }
  });
  return valves;
};

// Floyd-Warshall algorithm
function getDist(data: Graph): Map<string, number> {
  const dist: Map<string, number> = new Map();
  const valves: string[] = [...data.keys()];

  valves.map((a) => valves.map((b) => dist.set(a + b, a === b ? 0 : Infinity)));
  data.forEach((vertex, valve) => {
    vertex.adjacent.forEach((adjValve) => {
      if (dist.has(valve + adjValve)) {
        dist.set(valve + adjValve, 1);
      }
    });
  });

  for (let k = 0; k < valves.length; k += 1) {
    for (let i = 0; i < valves.length; i += 1) {
      for (let j = 0; j < valves.length; j += 1) {
        const ij = dist.get(valves[i] + valves[j]) as number;
        const ik = dist.get(valves[i] + valves[k]) as number;
        const kj = dist.get(valves[k] + valves[j]) as number;

        if (ij > ik + kj) {
          dist.set(valves[i] + valves[j], ik + kj);
        }
      }
    }
  }

  return dist;
}

// Part 1
const runPartOne = async () => {
  const data = await parseInput();
  const dist = getDist(data);

  class QueueItem {
    pos: string;
    rate: number;
    rest: string[];
    r_so_far: number;
    t_left: number;

    constructor(pos: string, rate: number, rest: string[], r_so_far: number, t_left: number) {
      this.pos = pos;
      this.rate = rate;
      this.rest = rest;
      this.r_so_far = r_so_far;
      this.t_left = t_left;
    }
  }
  // BFS
  function bfs(time: number) {
    let result = Number.MIN_SAFE_INTEGER;
    const vertexesWithFlow: string[] = [];
    data.forEach((vertex, valve) => {
      if (vertex.flow > 0) {
        vertexesWithFlow.push(valve);
      }
    });

    function releasePressure(v: QueueItem) {
      return v.r_so_far + v.rate * v.t_left;
    }

    const queue: QueueItem[] = [];
    queue.push(new QueueItem('AA', data.get('AA')!.flow, vertexesWithFlow, 0, time));

    const costFromDist = (i: string, j: string) => dist.get(i + j) ?? Infinity;

    while (queue.length) {
      const currentVertex = queue.shift()!;
      result = Math.max(result, releasePressure(currentVertex));
      currentVertex.rest.forEach((vertex, i) => {
        const t_new = costFromDist(currentVertex.pos, vertex) + 1;
        const item = new QueueItem(
          vertex,
          currentVertex.rate + data.get(vertex)!.flow,
          currentVertex.rest.slice(0, i).concat(currentVertex.rest.slice(i + 1)),
          currentVertex.r_so_far + currentVertex.rate * t_new,
          currentVertex.t_left - t_new
        );
        if (t_new <= currentVertex.t_left) {
          queue.push(item);
          queue.sort((a, b) => (a.r_so_far > b.r_so_far ? -1 : 1));
        }
      });
    }

    return result;
  }

  const result = bfs(30);

  console.log('Part 1: ', result);
};

runPartOne();

// Part 2
const runPartTwo = async () => {
  const data = await parseInput();
  const dist = getDist(data);

  class QueueItem {
    elfPos: string;
    elephantPos: string;
    rate: number;
    rest: string[];
    r_so_far: number;
    t_left: number;
    t_earned_elf: number;
    t_earned_eleph: number;

    constructor(
      elfPos: string,
      elephantPos: string,
      rate: number,
      rest: string[],
      r_so_far: number,
      t_left: number,
      t_earned_elf: number,
      t_earned_eleph: number
    ) {
      this.elfPos = elfPos;
      this.elephantPos = elephantPos;
      this.rate = rate;
      this.rest = rest;
      this.r_so_far = r_so_far;
      this.t_left = t_left;
      this.t_earned_eleph = t_earned_eleph;
      this.t_earned_elf = t_earned_elf;
    }
  }

  function bfs(time: number) {
    let result = Number.MIN_SAFE_INTEGER;
    const vertexesWithFlow: string[] = [];
    data.forEach((vertex, valve) => {
      if (vertex.flow > 0) {
        vertexesWithFlow.push(valve);
      }
    });

    function releasePressure(v: QueueItem) {
      return v.r_so_far + v.rate * v.t_left;
    }

    const timeFromDist = (i: string, j: string) => dist.get(i + j) ?? Infinity;

    function checkUpperBounds(item: QueueItem, currPressure: number) {
      const flows = item.rest
        .map((x) => data.get(x)!.flow)
        .sort((a, b) => a - b)
        .reverse()
        .map((r, i) => r * (item.t_left - i));
      const sumFlows = flows.reduce((a, b) => a + b, 0);
      return releasePressure(item) + sumFlows < currPressure;
    }

    const queue: QueueItem[] = [];
    queue.push(new QueueItem('AA', 'AA', 0, vertexesWithFlow, 0, time, 0, 0));

    while (queue.length) {
      const currentVertex = queue.shift()!;
      result = Math.max(result, releasePressure(currentVertex));
      if (checkUpperBounds(currentVertex, result)) continue;
      if (currentVertex.t_left >= 1) {
        queue.push(
          new QueueItem(
            currentVertex.elfPos,
            currentVertex.elephantPos,
            currentVertex.rate,
            currentVertex.rest,
            currentVertex.r_so_far + currentVertex.rate,
            currentVertex.t_left - 1,
            currentVertex.t_earned_elf + 1,
            currentVertex.t_earned_eleph + 1
          )
        );
      }
      currentVertex.rest.forEach((vertex, i) => {
        let t_new_earned_eleph = 0;
        let t_new_earned_elf = 0;
        let new_pos_eleph = currentVertex.elephantPos;
        let new_pos_elf = currentVertex.elfPos;
        const time_elf = timeFromDist(currentVertex.elfPos, vertex);
        const time_eleph = timeFromDist(currentVertex.elephantPos, vertex);
        if (1 + time_elf == currentVertex.t_earned_elf) {
          new_pos_elf = vertex;
          t_new_earned_eleph = currentVertex.t_earned_eleph;
        } else if (1 + time_eleph == currentVertex.t_earned_eleph) {
          t_new_earned_elf = currentVertex.t_earned_elf;
          new_pos_eleph = vertex;
        }
        const item = new QueueItem(
          new_pos_elf,
          new_pos_eleph,
          currentVertex.rate + data.get(vertex)!.flow,
          currentVertex.rest.slice(0, i).concat(currentVertex.rest.slice(i + 1)),
          currentVertex.r_so_far,
          currentVertex.t_left,
          t_new_earned_elf,
          t_new_earned_eleph
        );
        if (
          1 + time_elf == currentVertex.t_earned_elf ||
          1 + time_eleph == currentVertex.t_earned_eleph
        ) {
          queue.push(item);
          queue.sort((a, b) => (a.r_so_far > b.r_so_far ? -1 : 1));
        }
      });
    }

    return result;
  }

  const result = bfs(26);

  console.log('Part 2: ', result);
};

runPartTwo();
