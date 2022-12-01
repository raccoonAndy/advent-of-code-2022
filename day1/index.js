'use strict';
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const input = path.resolve(__dirname, 'input.txt');
const test = path.resolve(__dirname, 'test.txt');

// Part 1
const runPartOne = () => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(input),
  });
  readInterface.on('line', (line) => {});
  readInterface.on('close', () => {});
};

// Part 2
const runPartTwo = () => {};
