export default class Queue {
  get length() {
    return this._values.length;
  }

  constructor() {
    this._values = [];
  }

  enqueue(value) {
    return this._values.push(value);
  }

  dequeue() {
    return this._values.shift();
  }

  peek() {
    return this._values[0];
  }
}
