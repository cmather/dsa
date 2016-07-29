import BinaryHeap, {BinaryNode} from './binary_heap';
import compare from './compare';

export default class MinHeap extends BinaryHeap {
  /**
   * Bubbles a HeapNode up the heap while its value is less than its
   * parent's value.
   */
  bubbleUp(i) {
    // while the parent > current value push this value up the heap
    while (i > 0 && this.compareByIndex(this.parent(i), i) == 1) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  /**
   * Bubbles a HeapNode down the heap while its value is greater than its parent's
   * value.
   */
  bubbleDown(idx) {
    let leftIdx = this.left(idx);
    let rightIdx = this.right(idx);
    let smallestIdx = idx;

    // compare the smallest of idx, left and right
    if (leftIdx < this.length && this.compareByIndex(leftIdx, idx) == -1)
      smallestIdx = leftIdx;

    if (rightIdx < this.length && this.compareByIndex(rightIdx, smallestIdx) == -1)
      smallestIdx = rightIdx;

    if (smallestIdx != idx) {
      this.swap(idx, smallestIdx);
      this.bubbleDown(smallestIdx);
    }
  }
}
