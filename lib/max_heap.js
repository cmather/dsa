import BinaryHeap, {BinaryNode} from './binary_heap';

export default class MaxHeap extends BinaryHeap {
  /**
   * Bubbles a HeapNode up the heap while its value is greater than its
   * parent's value.
   */
  bubbleUp(i) {
    // while the parent < current value push this value up the heap
    while (i > 0 && this.compareByIndex(this.parent(i), i) == -1) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  /**
   * Bubbles a HeapNode down the heap while its value is less than its parent's
   * value.
   */
  bubbleDown(idx) {
    let leftIdx = this.left(idx);
    let rightIdx = this.right(idx);
    let largestIdx = idx;

    // compare the largest of idx, left and right
    if (leftIdx < this.length && this.compareByIndex(leftIdx, idx) == 1)
      largestIdx = leftIdx;

    if (rightIdx < this.length && this.compareByIndex(rightIdx, largestIdx) == 1)
      largestIdx = rightIdx;

    if (largestIdx != idx) {
      this.swap(idx, largestIdx);
      this.bubbleDown(largestIdx);
    }
  }
}
