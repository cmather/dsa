import assert from 'assert';
import Stack from '../lib/stack';

describe('Stack', () => {
  it('should work like a stack', () => {
    let s = new Stack;
    s.push(1);
    s.push(2);
    s.push(3);
    assert(s.length == 3);
    assert(s.peek() == 3);
    assert(s.pop() == 3);
    assert(s.pop() == 2);
    assert(s.pop() == 1);
  });
});
