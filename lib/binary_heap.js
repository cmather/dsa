import assert from 'assert';
import compare from './compare';

function isArray(value) {
  return Object.prototype.toString.call(value) == '[object Array]';
}

export class HeapNode {
  constructor(heap, value, index) {
    this.heap = heap;
    this.value = value;
    this.index = index;
  }

  update(newValue) {
    if (this.heap) {
      this.heap.update(this.index, newValue);
      return true;
    } else {
      return false;
    }
  }
}

export default class BinaryHeap {
  constructor(opts = { compare: compare }) {
    this._nodes = [];
    this.compare = opts.compare;
  }

  get length() {
    return this._nodes.length;
  }

  /**
   * Build an ordered heap from scratch from a possibly unsorted array.
   */
  build(values) {
    this._nodes = values.slice();
    for (let idx = Math.floor(this.length / 2); idx >= 0; idx--) {
      this.bubbleDown(idx)
    }
  }

  /**
   * Returns but doesn't remove the min value of the heap.
   *
   * @return {*} The maximum value of the heap.
   */
  peek() {
    return this._nodes[0].value;
  }

  /**
   * Remove and return the max element in the heap.
   *
   * @return {*} The maximum value of the heap.
   */
  extract() {
    if (this.length == 0) return undefined;

    // grab the top of the heap for the max value
    let max = this._nodes[0];

    // so that calling update() on the node has no effect
    max.heap = null;

    // index isn't relevent since max is no longer in the heap
    max.index = null;

    // remove the last value from the end of the heap
    let last = this._nodes.pop();

    if (this.length > 0) {
      // move the last value to the top of the heap
      this._nodes[0] = last;

      // reset the node's index to 0 since we moved it to the front of
      // the line
      last.index = 0;

      // now move the new root to its proper location
      this.bubbleDown(0);
    }

    return max.value;
  }

  /**
   * Insert a value into the correct location in the heap.
   *
   * @return {HeapNode} The HeapNode that was added to the heap. The HeapNode
   * has an update method that can be used to update the value of the node and
   * update the position based on the new value.
   */
  insert(value) {
    let i = this.length;
    let node = new HeapNode(this, value, i);
    this._nodes.push(node);
    this.bubbleUp(i);
    return node;
  }

  /**
   * Updates the value at a given index which might cause a bubbleUp or a
   * bubbleDown depending on if the value has increased or decreased.
   *
   * @param {number} i - The index of the HeapNode to update.
   * @param {*} value - The new value of the HeapNode at index i.
   * @return {HeapNode} The HeapNode that was just updated and potentially moved
   * based on the new value.
   */
  update(i, value) {
    let node = this._nodes[i];

    if (!node)
      throw new Error(`No HeapNode exists at index ${i}`);

    let oldValue = node.value;

    // in some cases we don't want to set a specific primitive value like if the
    // node.value is an object with some properties we could just call update()
    // on the heap node with no value and we'll just run the bubbleUp,
    // bubbleDown on the value of the node with the custom comparator that was
    // passed to the constructor.
    node.value = typeof value === 'undefined' ? oldValue : value;

    // move the new node to its correct location
    this.bubbleUp(i);
    this.bubbleDown(i);

    return node;
  }

  /**
   * Bubbles a HeapNode up the heap while it's value is greater than its
   * parent's value.
   */
  bubbleUp(idx) {
    throw new Error('not implemented');
  }

  /**
   * Given an idx move the value down the heap into its correct location.
   */
  bubbleDown(idx) {
    throw new Error('not implemented');
  }

  swap(idxA, idxB) {
    let a = this._nodes[idxA];
    let b = this._nodes[idxB];

    if (!(a instanceof HeapNode))
      throw new Error(`no HeapNode found at index idxA: ${idxA}`);

    if (!(b instanceof HeapNode))
      throw new Error(`no HeapNode found at index idxB: ${idxB}`);

    a.index = idxB;
    b.index = idxA;

    this._nodes[idxB] = a;
    this._nodes[idxA] = b;
  }

  parent(idx) {
    return (idx - 1) >> 1;
  }

  left(idx) {
    return 2 * idx + 1;
  }

  right(idx) {
    return 2 * idx + 2;
  }

  compareByIndex(idxA, idxB) {
    if (!this._nodes[idxA])
      throw new Error(`No HeapNode exists at index ${idxA}`);
    if (!this._nodes[idxB])
      throw new Error(`No HeapNode exists at index ${idxB}`);

    return this.compare(this._nodes[idxA].value, this._nodes[idxB].value);
  }
}
