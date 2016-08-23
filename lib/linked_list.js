import assert from 'assert';

export class LinkedListNode {
  constructor(list, value) {
    assert(LinkedList.prototype.isPrototypeOf(list), 'must provide a LinkedList to LinkedListNode constructor');
    assert(typeof value !== 'undefined', 'LinkedListNode value cannot be undefined');
    this.value = value;
    this._list = list;
    this._next = null;
    this._prev = null;
  }

  get prev() {
    return this._prev;
  }

  set prev(value) {
    assert(value == null || LinkedListNode.prototype.isPrototypeOf(value));
    this._prev = value;
  }

  get next() {
    return this._next;
  }

  set next(value) {
    assert(value == null || LinkedListNode.prototype.isPrototypeOf(value));
    this._next = value;
  }
}

export default class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  get size() {
    return this._size;
  }

  get head() {
    return this._head;
  }

  set head(value) {
    assert(value == null || LinkedListNode.prototype.isPrototypeOf(value));
    this._head = value;
  }

  get tail() {
    return this._tail;
  }

  set tail(value) {
    assert(value == null || LinkedListNode.prototype.isPrototypeOf(value));
    this._tail = value;
  }

  add(value) {
    let node = new LinkedListNode(this, value);

    if (this.tail) {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    if (!this.tail)
      this.tail = node;

    if (!this.head) {
      this.head = node;
    }

    this._size++;

    return node;
  }

  remove(node) {
    if (node.prev)
      node.prev.next = node.next;

    if (node.next)
      node.next.prev = node.prev;

    if (this.head == node)
      this.head = node.next;

    if (this.tail == node)
      this.tail = node.prev;

    this._size--;

    return node;
  }

  push(value) {
    return this.add(value);
  }

  pop() {
    if (this.tail) {
      let value = this.tail.value;
      this.remove(this.tail);
      return value;
    }
  }

  *values() {
    let ptr = this.head;

    while (ptr) {
      yield ptr.value;
      ptr = ptr.next;
    }
  }

  *[Symbol.iterator]() {
    yield* this.values();
  }
}
