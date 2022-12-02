'use strict';
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const input = path.resolve(__dirname, 'input.txt');
const test = path.resolve(__dirname, 'test.txt');

// Part 1
// A - rock < B - paper < C - scissors
// X (1) - rock < Y (2) - paper < Z (3) - scissors
// lose - 0, draw - 3, win - 6
// AX, BY, CZ — draw
// AZ, BX, CY — win
// AY, BZ, CX — lose
const runPartOne = () => {
  let combinations = {
    A: {
      X: [1, 3],
      Y: [2, 6],
      Z: [3, 0],
    },
    B: {
      X: [1, 0],
      Y: [2, 3],
      Z: [3, 6],
    },
    C: {
      X: [1, 6],
      Y: [2, 0],
      Z: [3, 3],
    },
  };
  let sum = 0;
  const readInterface = readline.createInterface({
    input: fs.createReadStream(input),
  });
  readInterface.on('line', (line) => {
    let game = line.split(' ');
    sum += combinations[game[0]][game[1]][0] + combinations[game[0]][game[1]][1];
  });
  readInterface.on('close', () => {
    console.log('Part 1: ', sum);
  });
};

runPartOne();

// Part 2
// X - lose, Y - draw, Z - win
// A - rock < B - paper < C - scissors
const runPartTwo = () => {
  let combinations = {
    A: {
      Y: [1, 3],
      Z: [2, 6],
      X: [3, 0],
    },
    B: {
      X: [1, 0],
      Y: [2, 3],
      Z: [3, 6],
    },
    C: {
      Z: [1, 6],
      X: [2, 0],
      Y: [3, 3],
    },
  };
  let sum = 0;
  const readInterface = readline.createInterface({
    input: fs.createReadStream(input),
  });
  readInterface.on('line', (line) => {
    let game = line.split(' ');
    sum += combinations[game[0]][game[1]][0] + combinations[game[0]][game[1]][1];
  });
  readInterface.on('close', () => {
    console.log('Part 2: ', sum);
  });
};

runPartTwo();
