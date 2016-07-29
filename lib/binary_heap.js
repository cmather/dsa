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
    this.heap.update(this.index, newValue);
  }
}

export default class BinaryHeap {
  constructor(values, opts = { compare: compare }) {
    this._nodes = isArray(values) ? values.slice() : [];
    this.compare = opts.compare;
    this.build();
  }

  get length() {
    return this._nodes.length;
  }

  /**
   * Build an ordered heap from scratch which is useful if all the heap values
   * are passed into the constructor instead of inserted one value at a time.
   */
  build() {
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

    // remove the last value from the end of the heap
    let last = this._nodes.pop();

    if (this.length > 0) {
      // move the last value to the top of the heap
      this._nodes[0] = last;

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
    node.value = value;

    // move the new node to its correct location
    this.bubbleUp(i);
    this.bubbleDown(i);

    return node;
  }

  /**
   * Bubbles a HeapNode up the heap while it's value is greater than its
   * parent's value.
   */
  bubbleUp(i) {
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