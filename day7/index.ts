import { readFile } from '../readFile.ts';

// Part 1
class TreeNode {
  value: string;
  size: number;
  nodes: TreeNode[];

  constructor(value: string, size: number, nodes?: TreeNode[]) {
    this.value = value;
    this.size = size;
    this.nodes = nodes != undefined ? nodes : [];
  }
}

const parseInputToTree = async () => {
  const head: TreeNode = new TreeNode('/', 0);
  let current: TreeNode = head;
  const aux: TreeNode[] = [];
  let k = 0;
  await readFile('input', (line: string) => {
    if (line.startsWith('$')) {
      if (line.includes('cd')) {
        const info = line.split(' ');
        if (info[2] == '/') return;
        if (info[2] == '..') {
          current = aux[k - 1];
          k--;
        } else {
          aux[k++] = current;
          current = current.nodes.filter((tree) => tree.value === info[2])[0];
        }
      }
    } else if (line.includes('dir')) {
      current.nodes.push(new TreeNode(line.split(' ')[1], 0));
    } else {
      const info = line.split(' ');
      current.nodes.push(new TreeNode(info[1], parseInt(info[0], 10)));
    }
  });

  return head;
};

function getSum(root: TreeNode, dirSize: number, sizes: number[], atLeast = 100000): number {
  if (root.nodes.length === 0) {
    return root.size;
  }
  dirSize = 0;
  for (let i = 0; i < root.nodes.length; i += 1) {
    dirSize += getSum(root.nodes[i], dirSize, sizes, atLeast);
  }
  root.size = dirSize;
  if (root.size < atLeast) sizes.push(root.size);
  return root.size;
}

const runPartOne = async () => {
  const head = await parseInputToTree();
  const sizes: number[] = [];
  getSum(head, 0, sizes);

  const result = sizes.reduce((acc, curr) => acc + curr, 0);
  console.log('Part 1: ', result);
};

runPartOne();

// Part 2
const AVAILABLE = 70000000;
const NEED = 30000000;
const runPartTwo = async () => {
  const head = await parseInputToTree();
  const sizes: number[] = [];
  getSum(head, 0, sizes, NEED);

  const freeSpace = AVAILABLE - head.size;
  const neededSpace = NEED - freeSpace;
  let min = Number.MAX_SAFE_INTEGER;
  sizes
    .filter((x) => x > neededSpace)
    .map((x) => {
      min = Math.min(x, min);
    });

  console.log('Part 2: ', min);
};

runPartTwo();
