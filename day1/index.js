'use strict';
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const input = path.resolve(__dirname, 'input.txt');
const test = path.resolve(__dirname, 'test.txt');

// Part 1
const runPartOne = () => {
  let sum = 0;
  let max = Number.MIN_VALUE;
  const readInterface = readline.createInterface({
    input: fs.createReadStream(test),
  });
  readInterface.on('line', (line) => {
    if (line !== '') {
      let current = parseInt(line);
      sum += current;
    } else {
      max = Math.max(sum, max);
      sum = 0;
    }
  });
  readInterface.on('close', () => {
    if (sum != 0) {
      max = Math.max(sum, max);
    }
    console.log('Part 1: ', max);
  });
};

runPartOne();

// Part 2
const runPartTwo = () => {
  let sum = 0;
  let allSums = [];
  const readInterface = readline.createInterface({
    input: fs.createReadStream(input),
  });
  readInterface.on('line', (line) => {
    if (line !== '') {
      let current = parseInt(line);
      sum += current;
    } else {
      allSums.push(sum);
      sum = 0;
    }
  });
  readInterface.on('close', () => {
    if (sum != 0) {
      allSums.push(sum);
    }
    let sorted = allSums.sort((a, b) => (a < b ? 1 : -1)).slice(0, 3);
    let result = sorted.reduce((acc, current) => acc + current, 0);
    console.log('Part 2: ', result);
  });
};

runPartTwo();
