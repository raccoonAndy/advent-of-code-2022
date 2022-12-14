import { input } from './input.ts';

// deno-lint-ignore no-explicit-any
function compare(left: any, right: any): number {
  if (typeof left === 'number' && Array.isArray(right)) {
    return compare([left], right);
  }

  if (typeof right === 'number' && Array.isArray(left)) {
    return compare(left, [right]);
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    let i = 0;
    while (i < left.length) {
      if (i > right.length - 1) return 1;
      const result = compare(left[i], right[i]);
      if (result != 0) return result;
      i++;
    }
    return left.length == right.length ? 0 : -1;
  }

  return left < right ? -1 : left == right ? 0 : 1;
}

// Part 1
const runPartOne = () => {
  let result = 0;
  for (let i = 0; i < input.length - 1; i += 2) {
    if (compare(input[i], input[i + 1]) == -1) {
      result += i / 2 + 1;
    }
  }
  console.log('Part 1: ', result);
};

runPartOne();

// Part 2
const runPartTwo = () => {
  const decoderKey1 = [[2]];
  const decoderKey2 = [[6]];
  input.push(decoderKey1, decoderKey2);
  const sortedInput = input.sort((a, b) => compare(a, b));
  let result = 1;
  for (let i = 0; i < sortedInput.length; i += 1) {
    if (compare(sortedInput[i], decoderKey1) == 0) {
      result *= i + 1;
    } else if (compare(sortedInput[i], decoderKey2) == 0) {
      result *= i + 1;
    }
  }
  console.log('Part 2: ', result);
};

runPartTwo();
