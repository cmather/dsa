import assert from 'assert';
import Queue from '../lib/queue';

describe('Queue', () => {
  it('should work like a queue', () => {
    let q = new Queue;
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    assert(q.length == 3);
    assert(q.dequeue() == 1);
    assert(q.dequeue() == 2);
    assert(q.dequeue() == 3);
  });
});
