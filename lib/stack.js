export default class Stack {
  get length() {
    return this._values.length;
  }

  constructor() {
    this._values = [];
  }

  push(value) {
    return this._values.push(value);
  }

  pop() {
    return this._values.pop();
  }

  peek() {
    return this._values[this.length - 1];
  }
}
