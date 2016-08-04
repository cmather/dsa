function generate(sets, solution = []) {
  let solutions = [];

  if (sets.length == 0) {
    solutions.push(solution.slice());
  }

  else {
    // take a set from the front
    let set = sets.shift();

    for (let i = 0; i < set.length; i++) {
      solution.push(set[i]);
      solutions = solutions.concat( generate(sets, solution) );
      solution.pop();
    }

    sets.unshift(set);
  }

  return solutions;
}

const numbersToLetters = {
  1: [],
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
  0: []
};

export default function phoneWordCombos(numbers) {
  // first get the sets
  let sets = [];

  numbers = numbers.toString().split('').map(Number);
  for (let n of numbers) {
    if (!numbersToLetters[n]) throw new Error(`${n} is not valid.`);
    sets.push(numbersToLetters[n]);
  }

  return generate(sets);
};
