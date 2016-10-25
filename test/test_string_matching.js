import assert from 'assert';
import {FSM, KMP} from '../lib/string_matching';

describe('String Matching Finite Automata', () => {
  it('should work', () => {
    let fsm = new FSM('ababaca', {
      alphabet: 'abc'.split('')
    });

    let expectedStates = [
      [1, 0, 0],
      [1, 2, 0],
      [3, 0, 0],
      [1, 4, 0],
      [5, 0, 0],
      [1, 4, 6],
      [7, 0, 0],
      [1, 2, 0]
    ];

    assert.deepEqual(fsm.states, expectedStates);

    let input = `this is an unbelievable text! somewhere in it will be ababaca but we don't know where!`
    let answer = input.indexOf(`ababaca`);
    assert.equal(fsm.indexOf(input), answer, `expected the index of the pattern to be ${answer}`);

    input = `a`
    answer = input.indexOf('');
    assert.equal(fsm.indexOf(input), answer, `expected the index of the pattern to be ${answer}`);
  });
});

describe('String Matching Knuth Morris Pratt (KMP)', () => {
  it('should work', () => {
    let pattern = 'ababaca'
    let kmp = new KMP(pattern);
    assert.deepEqual(kmp.prefixes, [0, 0, 1, 2, 3, 0, 1], 'computed prefix table is incorrect');

    let input = `this is an unbelievable text! somewhere in it will be ababaca but we don't know where!`
    let answer = input.indexOf(`ababaca`);
    assert.equal(kmp.indexOf(input), answer, `expected the index of the pattern to be ${answer}`);
  });
});
