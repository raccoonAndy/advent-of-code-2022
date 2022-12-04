'use strict';
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const input = path.resolve(__dirname, 'input.txt');
const test = path.resolve(__dirname, 'test.txt');

// Part 1
const runPartOne = () => {
  let sum = 0;
  const readInterface = readline.createInterface({
    input: fs.createReadStream(input),
  });
  readInterface.on('line', (line) => {
    let sections = line.split(',');
    let section1 = sections[0].split('-').map((x) => parseInt(x, 10));
    let section2 = sections[1].split('-').map((x) => parseInt(x, 10));
    let isOverlap1 = section1[0] <= section2[0] && section1[1] >= section2[1];
    let isOverlap2 = section2[0] <= section1[0] && section2[1] >= section1[1];
    if (isOverlap1 || isOverlap2) {
      sum += 1;
    }
  });
  readInterface.on('close', () => {
    console.log('Part 1: ', sum);
  });
};

runPartOne();

// Part 2
const runPartTwo = () => {
  let sum = 0;
  const readInterface = readline.createInterface({
    input: fs.createReadStream(input),
  });
  readInterface.on('line', (line) => {
    let sections = line.split(',');
    let section1 = sections[0].split('-').map((x) => parseInt(x, 10));
    let section2 = sections[1].split('-').map((x) => parseInt(x, 10));
    let isOverlap1 = section1[0] <= section2[0] && section1[1] >= section2[1];
    let isOverlap2 = section2[0] <= section1[0] && section2[1] >= section1[1];
    let intersection1 = section1[1] >= section2[0] && section1[0] < section2[1];
    let intersection2 = section1[0] <= section2[1] && section1[1] > section2[0];
    if (isOverlap1 || isOverlap2 || intersection1 || intersection2) {
      sum += 1;
    }
  });
  readInterface.on('close', () => {
    console.log('Part 2: ', sum);
  });
};

runPartTwo();
