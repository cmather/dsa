import assert from 'assert';
import {bubbleSort, selectionSort, mergeSort, quickSort} from '../lib/sort';

/**
 * See:
 * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * Returns true if arrays a and b contain the same values.
 */
function isArrayEqual(a, b) {
  if (a.length !== b.length)
    return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i])
      return false;
  }

  return true;
}

describe('bubbleSort', () => {
  it('should sort correctly', () => {
    let input = [5,4,3,2,1];
    let expected = [1,2,3,4,5];

    // perform 5 trials
    for (let i = 0; i < 5; i++) {
      let result = bubbleSort(shuffle(input));
      assert(isArrayEqual(result, expected), `expected ${expected} but got ${result}`);
    }
  });
});

describe('selectionSort', () => {
  it('should sort correctly', () => {
    let input = [5,4,3,2,1];
    let expected = [1,2,3,4,5];

    // perform 5 trials
    for (let i = 0; i < 5; i++) {
      let result = selectionSort(shuffle(input));
      assert(isArrayEqual(result, expected), `expected ${expected} but got ${result}`);
    }
  });
});

describe('mergeSort', () => {
  it('should sort correctly', () => {
    let input = [5,4,3,2,1];
    let expected = [1,2,3,4,5];

    // perform 5 trials
    for (let i = 0; i < 5; i++) {
      let result = mergeSort(shuffle(input));
      assert(isArrayEqual(result, expected), `expected ${expected} but got ${result}`);
    }
  });
});

describe('quickSort', () => {
  it('should sort correctly', () => {
    let input = [5,4,3,2,1];
    let expected = [1,2,3,4,5];

    // perform 5 trials
    for (let i = 0; i < 5; i++) {
      let result = quickSort(shuffle(input));
      assert(isArrayEqual(result, expected), `expected ${expected} but got ${result}`);
    }
  });
});
