import assert from 'assert';
import RedBlackTree from './red_black_tree';
import compare from './compare';

const INITIAL_SIZE = Math.pow(2, 8);
const PRIME = 31;
const MAX_LOAD_FACTOR = 0.75;

function generateHashFunction(tableSize) {
  let a = Math.floor(Math.random() * PRIME); // {0, 1, ..., p-1}
  let b = Math.floor(Math.random() * (PRIME - 1) + 1); // {1, 2, ..., p-1}
  return ((key) => ((a * key + b) % PRIME) % tableSize);
}

function createTable(size, opts = {}) {
  let table = new Array(size);

  for (let i = 0; i < table.length; i++) {
    table[i] = new RedBlackTree(Object.assign(opts, {
      compare: ((a, b) => compare(a && a.key, b && b.key))
    }));
  }

  return table;
}

function growTable(hashTable) {
  let oldTable = hashTable._table;
  hashTable._table = createTable(oldTable.length * 2);
  hashTable._hashFunc = generateHashFunction(hashTable._table.length);
  hashTable._size = 0;
  for (let bucket of oldTable) {
    bucket.inorder((node) => hashTable.set(node.value.key, node.value.value));
  }
}

class HashTableEntry {
  constructor(key, value) {
    assert(typeof key !== 'undefined', 'key is required');
    this.key = key;
    this.value = value;
  }

  toHashKey() {
    let key = this.key;

    if (typeof key.toHashKey === 'function')
      return key.toHashKey();

    if (typeof key !== 'string') {
      key = JSON.stringify(key);
    }

    let hash = 0;
    let i = 0;

    while (i < key.length) {
      // (hash << 5) - hash == hash * 31
      hash = ((hash << 5) - hash + key.charCodeAt(i++)) << 0;
    }

    return hash;
  }
}

export default class HashTable {
  constructor(opts = {}) {
    let size = opts.size || INITIAL_SIZE
    this._table = createTable(size, opts);
    this._hashFunc = generateHashFunction(size);
    this._size = 0;
    this.opts = opts;
  }

  get loadFactor() {
    return this.size() / this._table.length;
  }

  get length() {
    return this.size();
  }

  size() {
    return this._size;
  }

  get(key) {
    let entry = new HashTableEntry(key);
    let tree = this._table[this.toHashIndex(entry)];
    let rbNode = tree.find(entry);

    if (rbNode)
      // rbNode.value is an instance of HashTableEntry
      return rbNode.value.value;
    else
      return null;
  }

  set(key, value, allowResize = true) {
    if (allowResize && this.loadFactor >= MAX_LOAD_FACTOR) growTable(this);

    let entry = new HashTableEntry(key, value);

    let tree = this._table[ this.toHashIndex(entry) ];
    let existingRbNode = tree.find(entry);

    if (existingRbNode) {
      let hashTableEntry = existingRbNode.value;
      hashTableEntry.value = value;
    }

    else {
      tree.add(entry);
      this._size++;
    }
  }

  remove(key) {
    let entry = new HashTableEntry(key);
    let tree = this._table[ this.toHashIndex(entry) ];

    if (tree.remove(entry)) {
      this._size--;
      return true;
    }
    
    else {
      return false;
    }
  }

  toHashIndex(entry) {
    return this._hashFunc(entry.toHashKey());
  }
}
