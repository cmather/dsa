import MinHeap from './min_heap';

export default class MinPriorityQueue {
  constructor(opts) {
    this.data = (opts && opts.data) || new MinHeap(opts);
  }

  get length() {
    return this.data.length;
  }

  enqueue(value) {
    return this.data.insert(value);
  }

  dequeue() {
    return this.data.extract();
  }

  peek() {
    return this.data.peek();
  }
}
