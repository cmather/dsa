import assert from 'assert';
import HashTable from '../lib/hash_table';

describe("HashTable", () => {
  it ("should construct", () => {
    new HashTable;
  });

  it ("should provide get and set", () => {
    let ht = new HashTable;

    ht.set(1, 'one');
    assert.equal(ht.size(), 1);
    assert.equal(ht.get(1), 'one');

    ht.set(2, 'two');
    assert.equal(ht.size(), 2);
    assert.equal(ht.get(2), 'two');
  });

  it ("should grow dynamically and copy old slots", () => {
    let ht = new HashTable({size: 2});

    ht.set(1, 'one');
    assert.equal(ht.size(), 1);

    ht.set(2, 'two');
    assert.equal(ht.size(), 2);

    ht.set(3, 'three');
    assert.equal(ht.size(), 3);

    ht.set(4, 'four');
    assert.equal(ht.size(), 4);

    assert.equal(ht.get(1), 'one');
    assert.equal(ht.get(2), 'two');
    assert.equal(ht.get(3), 'three');
    assert.equal(ht.get(4), 'four');
  });

  it ("should chain keys on collisions", () => {
    let ht = new HashTable({size: 1});

    ht.set(1, 'one', false);
    assert.equal(ht.size(), 1);

    ht.set(2, 'two', false);
    assert.equal(ht.size(), 2);

    ht.set(3, 'three', false);
    assert.equal(ht.size(), 3);

    ht.set(4, 'four', false);
    assert.equal(ht.size(), 4);

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
});
