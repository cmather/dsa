import assert from 'assert';
import {HeapNode} from '../lib/binary_heap';
import MinHeap from '../lib/min_heap';

describe("MinHeap", () => {
  it ("should construct", () => {
    let heap = new MinHeap;
  });

  it ("should insert and bubble up to the correct location", () => {
    let heap = new MinHeap;
    let nodes = [];

    nodes.push(heap.insert(30));
    assert(nodes[0] && nodes[0] instanceof HeapNode);
    assert.equal(heap.length, 1);
    assert.equal(nodes[0].index, 0);

    nodes.push(heap.insert(20));
    assert(nodes[1] && nodes[1] instanceof HeapNode);
    assert.equal(heap.length, 2);
    assert.equal(nodes[0].index, 1);
    assert.equal(nodes[1].index, 0);

    nodes.push(heap.insert(10));
    assert(nodes[1] && nodes[1] instanceof HeapNode);
    assert.equal(heap.length, 3);
    assert.equal(nodes[0].index, 1);
    assert.equal(nodes[1].index, 2);
    assert.equal(nodes[2].index, 0);
  });

  it ("should provide peek and extract", () => {
    let heap = new MinHeap;
    let result, peek;

    heap.insert(10);
    heap.insert(20);
    heap.insert(30);

    assert(heap.length == 3, `expected heap.length == 3 but got ${heap.length}`);

    peek = heap.peek();
    result = 10
    assert(peek == result, `expected heap.peek() to return ${result} but got ${peek}`)
    result = heap.extract()
    assert(result == peek, `expected heap.extract() to return ${peek} but got ${result}`)
    assert(heap.length == 2, `expected heap.length == 2 but got ${heap.length}`);

    peek = heap.peek();
    result = 20
    assert(peek == result, `expected heap.peek() to return ${result} but got ${peek}`)
    result = heap.extract()
    assert(result == peek, `expected heap.extract() to return ${peek} but got ${result}`)
    assert(heap.length == 1, `expected heap.length == 2 but got ${heap.length}`);

    peek = heap.peek();
    result = 30
    assert(peek == result, `expected heap.peek() to return ${result} but got ${peek}`)
    result = heap.extract()
    assert(result == peek, `expected heap.extract() to return ${peek} but got ${result}`)
    assert(heap.length == 0, `expected heap.length == 2 but got ${heap.length}`);
  });

  it ("should provide update from a HeapNode", () => {
    let heap = new MinHeap;
    let node;

    node = heap.insert(30);
    heap.insert(20);
    heap.insert(10);

    // move to the top of the heap by making it the smallest value
    node.update(1);
    assert.equal(node.index, 0);

    // now move it back down by making it the largest value
    node.update(50);
    assert.equal(node.index, 1);
  });
});
