import Set from './set';
import LinkedList from './linked_list';

export default class OrderedSet extends Set {
  constructor(opts) {
    super(opts);
    this._list = new LinkedList;
  }

  add(value, opts) {
    let entry = super.add(value, opts);
    let node = this._list.add(value);
    entry._listNode = node;
    node._hashEntry = entry;
    return entry;
  }

  push(value, opts) {
    return this.add(value, opts);
  }

  pop() {
    let value = this._list.pop();
    this.remove(value);
    return value;
  }

  remove(value) {
    let entry = this._data.getEntry(value);

    if (entry) {
      this._data.remove(value);
      this._list.remove(entry._listNode);
      return true;
    }

    return false;
  }

  *values() {
    yield* this._list.values();
  }
}
