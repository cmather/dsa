import assert from 'assert';
import LinkedList from '../lib/linked_list';

describe("LinkedList", () => {
  it ("should construct", () => {
    new LinkedList;
  });

  it ("should provide add method", () => {
    let list = new LinkedList;
    let result;

    result = list.add(1);
    assert.equal(list.size, 1);
    assert.equal(list.head.value, 1);

    list.add(2);
    assert.equal(list.size, 2);
    assert.equal(list.head.value, 1);
    assert.equal(list.tail.value, 2);
  });

  it ("should provide remove method", () => {
    let list = new LinkedList;

    list.add(1);
    list.add(2);
    list.add(3);

    list.remove(list.head.next);

    assert.equal(list.size, 2);
    assert.equal(list.head.prev, null);
    assert.equal(list.head.next.value, 3);
    assert.equal(list.tail.prev.value, 1);
    assert.equal(list.tail.next, null);
    assert.equal(list.head.value, 1);
    assert.equal(list.tail.value, 3);
  });

  it ("should provide pop method", () => {
    let list = new LinkedList;

    list.add(1);
    list.add(2);
    list.add(3);

    assert.equal(list.pop(), 3);
    assert.equal(list.pop(), 2);
    assert.equal(list.pop(), 1);
  });

  it ("should provide for of loop iteration", () => {
    let list = new LinkedList;

    list.add(1);
    list.add(2);
    list.add(3);

    let idx = 0;
    let e = [1,2,3];
    for (let v of list) {
      assert.equal(v, e[idx++]);
    }
    assert.equal(idx, 3);
  });
});
