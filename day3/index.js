'use strict';
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const input = path.resolve(__dirname, 'input.txt');
const test = path.resolve(__dirname, 'test.txt');

function getCode(symbol) {
  let code = symbol.charCodeAt(0) - 'A'.charCodeAt(0);
  if (code > 25) {
    code = symbol.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  } else {
    code = code + 27;
  }
  return code;
}

// Part 1
const runPartOne = () => {
  let repeatedSymbols = new Map();
  const readInterface = readline.createInterface({
    input: fs.createReadStream(input),
  });
  readInterface.on('line', (line) => {
    let left = line.slice(0, Math.ceil(line.length / 2));
    let right = line.slice(Math.ceil(line.length / 2), line.length);
    let code = 0;
    for (let i = 0; i < left.length; i += 1) {
      if (right.includes(left[i])) {
        code = getCode(left[i]);
        if (repeatedSymbols.has(left[i])) {
          repeatedSymbols.set(left[i], repeatedSymbols.get(left[i]) + code);
        } else {
          repeatedSymbols.set(left[i], code);
        }
        break;
      }
    }
  });
  readInterface.on('close', () => {
    let sum = 0;
    repeatedSymbols.forEach((value) => {
      sum += value;
    });
    console.log('Part 1: ', sum);
  });
};

runPartOne();

// Part 2
const runPartTwo = () => {
  let count = 0;
  let rucksacks = [];
  let sum = 0;
  const readInterface = readline.createInterface({
    input: fs.createReadStream(input),
  });
  readInterface.on('line', (line) => {
    rucksacks[count % 3] = line;
    if (count % 3 === 2) {
      let a = new Set(rucksacks[0]);
      let b = new Set(rucksacks[1]);
      let c = new Set(rucksacks[2]);
      let result = new Set([...a].filter((x) => b.has(x) && c.has(x)));
      sum += getCode(result.values().next().value);
    }
    count++;
  });
  readInterface.on('close', () => {
    console.log('Part 2: ', sum);
  });
};

runPartTwo();
