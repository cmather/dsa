import assert from 'assert';
import HashTable from '../lib/hash_table';

describe("HashTable", () => {
  it ("should construct", () => {
    new HashTable;
  });

  it ("should provide get and set", () => {
    let ht = new HashTable;

    ht.set(1, 'one');
    assert.equal(ht.size, 1);
    assert.equal(ht.get(1), 'one');

    ht.set(2, 'two');
    assert.equal(ht.size, 2);
    assert.equal(ht.get(2), 'two');
  });

  it ("should provide has", () => {
    let ht = new HashTable;
    ht.set(1, 'one');
    assert(ht.has(1));
    assert(!ht.has(2), 'hash table should not have 2');
  });

  it ("should grow dynamically and copy old slots", () => {
    let ht = new HashTable({size: 2});

    ht.set(1, 'one');
    assert.equal(ht.size, 1);

    ht.set(2, 'two');
    assert.equal(ht.size, 2);

    ht.set(3, 'three');
    assert.equal(ht.size, 3);

    ht.set(4, 'four');
    assert.equal(ht.size, 4);

    assert.equal(ht.get(1), 'one');
    assert.equal(ht.get(2), 'two');
    assert.equal(ht.get(3), 'three');
    assert.equal(ht.get(4), 'four');
  });

  it ("should chain keys on collisions", () => {
    let ht = new HashTable({size: 1});

    ht.set(1, 'one', false);
    assert.equal(ht.size, 1);

    ht.set(2, 'two', false);
    assert.equal(ht.size, 2);

    ht.set(3, 'three', false);
    assert.equal(ht.size, 3);

    ht.set(4, 'four', false);
    assert.equal(ht.size, 4);

    assert.equal(ht.get(1), 'one');
    assert.equal(ht.get(2), 'two');
    assert.equal(ht.get(3), 'three');
    assert.equal(ht.get(4), 'four');

    assert.equal(ht._table.length, 1);

    let values = [];

    ht._table[0].inorder((node) => {
      values.push(node.value);
    });

    for (let i = 0; i < 4; i++) {
      assert.equal(values[i] && values[i].key, i + 1);
    }
  });

  it ("should provide iteration over keys", () => {
    let ht = new HashTable;
    ht.set(1, 'one');
    ht.set(2, 'two');
    let results = [];

    for (let key of ht) results.push(key);

    // note: order is not guaranteed
    assert.equal(results.length, 2);
    assert(results.indexOf(1) >= 0);
    assert(results.indexOf(2) >= 0);
  });

  it ("should provide iteration over values", () => {
    let ht = new HashTable;
    ht.set(1, 'one');
    ht.set(2, 'two');
    let results = [];

    for (let value of ht.values()) results.push(value);

    // note: order is not guaranteed
    assert.equal(results.length, 2);
    assert(results.indexOf('one') >= 0);
    assert(results.indexOf('two') >= 0);
  });

  it ("should provide forEach over keys and values", () => {
    let ht = new HashTable;
    ht.set(1, 'one');
    let results = [];
    ht.forEach((key, value) => results.push({key: key, value: value}));
    assert.equal(results.length, 1);
    assert.equal(results[0].key, 1);
    assert.equal(results[0].value, 'one');
  });

  it ("should provide clear method", () => {
    let ht = new HashTable;
    ht.set(1, true);
    ht.set(2, true);
    assert.equal(ht.size, 2);
    ht.clear();
    assert.equal(ht.size, 0);
    assert.equal(ht._table.length, ht.opts.size);
  });
});
