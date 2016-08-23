import assert from 'assert';
import OrderedSet from '../lib/ordered_set';

describe("OrderedSet", () => {
  it ("should construct", () => {
    let s = new OrderedSet;
  });

  it ("should provide add method", () => {
    let s = new OrderedSet;
    s.add(1);
    assert.equal(s.size, 1);
  });

  it ("should provide remove method", () => {
    let s = new OrderedSet;
    s.add(1);
    assert.equal(s.size, 1);
    s.remove(1);
    assert.equal(s.size, 0);

    let r = s.remove(5);
    assert(!r, 'remove should return false if no value found');
  });

  it ("should provide for of iterator", () => {
    let s = new OrderedSet;
    s.add(1);
    s.add(2);
    s.add(3);
    s.add(4);

    let exp = [1,2,3,4];
    let idx = 0;
    for (let v of s) {
      assert.equal(v, exp[idx++]);
    }
    assert.equal(idx, 4);
  });
});
