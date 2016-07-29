import assert from 'assert';
import {HeapNode} from '../lib/binary_heap';
import MaxHeap from '../lib/max_heap';

describe("MaxHeap", () => {
  it ("should construct", () => {
    let heap = new MaxHeap;
  });

  it ("should insert and bubble up to the correct location", () => {
    let heap = new MaxHeap;
    let nodes = [];

    nodes.push(heap.insert(10));
    assert(nodes[0] && nodes[0] instanceof HeapNode);
    assert.equal(heap.length, 1);
    assert.equal(nodes[0].index, 0);

    nodes.push(heap.insert(20));
    assert(nodes[1] && nodes[1] instanceof HeapNode);
    assert.equal(heap.length, 2);
    assert.equal(nodes[1].index, 0);
    assert.equal(nodes[0].index, 1);


    // note: 10 stays in the same spot here since the heap is only partially
    // ordered and 30 swaps with the current root of 20 but skips 10 all
    // together.
    nodes.push(heap.insert(30));
    assert(nodes[2] && nodes[2] instanceof HeapNode);
    assert.equal(heap.length, 3);
    assert.equal(nodes[2].index, 0);
    assert.equal(nodes[1].index, 2);
    assert.equal(nodes[0].index, 1);
  });

  it ("should provide peek and extract", () => {
    let heap = new MaxHeap;
    let result, peek;

    heap.insert(10);
    heap.insert(20);
    heap.insert(30);

    assert(heap.length == 3, `expected heap.length == 3 but got ${heap.length}`);

    peek = heap.peek();
    assert(peek == 30, `expected heap.peek() to return 30 but got ${peek}`)
    result = heap.extract()
    assert(result == peek, `expected heap.extract() to return ${peek} but got ${result}`)
    assert(heap.length == 2, `expected heap.length == 2 but got ${heap.length}`);

    peek = heap.peek();
    assert(peek == 20, `expected heap.peek() to return 20 but got ${peek}`)
    result = heap.extract()
    assert(result == peek, `expected heap.extract() to return ${peek} but got ${result}`)
    assert(heap.length == 1, `expected heap.length == 1 but got ${heap.length}`);

    peek = heap.peek();
    assert(peek == 10, `expected heap.peek() to return 10 but got ${peek}`)
    result = heap.extract()
    assert(result == peek, `expected heap.extract() to return ${peek} but got ${result}`)
    assert(heap.length == 0, `expected heap.length == 0 but got ${heap.length} ${heap._values}`);
  });

  it ("should provide update from a HeapNode", () => {
    let heap = new MaxHeap;
    let node;

    node = heap.insert(10);
    heap.insert(20);
    heap.insert(30);

    // try to move 10 to the top of the heap by making it the largest value
    node.update(50);
    assert.equal(node.index, 0);

    // now move it back down by making it the smallest value
    node.update(10);
    assert.equal(node.index, 1);
  });
});
