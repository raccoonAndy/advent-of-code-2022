import { readFile } from '../readFile.ts';

// Part 1
const runPartOne = async () => {
  let sum = 0;
  await readFile('input', (line: string) => {
    const sections = line.split(',');
    const section1 = sections[0].split('-').map((x) => parseInt(x, 10));
    const section2 = sections[1].split('-').map((x) => parseInt(x, 10));
    const isOverlap1 = section1[0] <= section2[0] && section1[1] >= section2[1];
    const isOverlap2 = section2[0] <= section1[0] && section2[1] >= section1[1];
    if (isOverlap1 || isOverlap2) {
      sum += 1;
    }
  });
  console.log('Part 1: ', sum);
};

runPartOne();

// Part 2
const runPartTwo = async () => {
  let sum = 0;
  await readFile('input', (line: string) => {
    const sections = line.split(',');
    const section1 = sections[0].split('-').map((x) => parseInt(x, 10));
    const section2 = sections[1].split('-').map((x) => parseInt(x, 10));
    const isOverlap1 = section1[0] <= section2[0] && section1[1] >= section2[1];
    const isOverlap2 = section2[0] <= section1[0] && section2[1] >= section1[1];
    const intersection1 = section1[1] >= section2[0] && section1[0] < section2[1];
    const intersection2 = section1[0] <= section2[1] && section1[1] > section2[0];
    if (isOverlap1 || isOverlap2 || intersection1 || intersection2) {
      sum += 1;
    }
  });
  console.log('Part 2: ', sum);
};

runPartTwo();
