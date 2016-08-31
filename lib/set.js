import HashTable from './hash_table';

export default class Set {
  constructor(opts) {
    this._data = new HashTable(opts);
  }

  get size() {
    return this._data.size;
  }

  get length() {
    return this.size;
  }

  add(value, opts) {
    if (this._data.has(value))
      throw new Error(`Set already contains this value: ${value}`);
    return this._data.add(value, true, opts);
  }

  remove(value) {
    return this._data.remove(value);
  }

  has(value) {
    return this._data.has(value);
  }

  union(set) {
    throw new Error('not implemented');
  }

  intersection(set) {
    throw new Error('not implemented');
  }

  difference(set) {
    throw new Error('not implemented');
  }

  isSubset(set) {
    throw new Error('not implemented');
  }

  forEach(cb) {
    this._data.forEach(cb);
  }

  *values() {
    yield* this._data.keys();
  }

  *[Symbol.iterator]() {
    yield* this.values();
  }

  clear() {
    this._data.clear();
  }

  toArray() {
    let arr = [];
    for (let v of this) arr.push(v);
    return arr;
  }
}
