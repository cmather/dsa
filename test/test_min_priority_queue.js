import assert from 'assert';
import {HeapNode} from '../lib/binary_heap';
import MinPriorityQueue from '../lib/min_priority_queue';

describe("MinPriorityQueue", () => {
  it ("should construct", () => {
    let q = new MinPriorityQueue;
  });

  it ("should provide length property", () => {
    let q = new MinPriorityQueue;
    q.enqueue(1);
    assert.equal(q.length, 1);
  });

  it ("should provide enqueue, peek and dequeue", () => {
    let q = new MinPriorityQueue;
    q.enqueue(30);
    q.enqueue(10);
    assert.equal(q.length, 2);
    assert.equal(q.peek(), 10);
    assert.equal(q.dequeue(), 10);
    assert.equal(q.dequeue(), 30);
  });
});
