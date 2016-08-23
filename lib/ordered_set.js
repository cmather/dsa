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
    node.__hashEntry = entry;
    return entry;
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
