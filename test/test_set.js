import assert from 'assert';
import Set from '../lib/set';

describe('Set', () => {
  it('should construct', () => {
    let s = new Set;
  });

  it('should provide add method', () => {
    let s = new Set;
    s.add(1);
    assert.equal(s.size, 1);
  });

  it('should provide length and size properties', () => {
    let s = new Set;
    s.add(1);
    assert.equal(s.size, 1);
    assert.equal(s.length, 1);

    s.add(2);
    assert.equal(s.size, 2);
    assert.equal(s.length, 2);
  });

  it('should provide has method', () => {
    let s = new Set;
    s.add(1);
    assert(s.has(1), 'set should have value 1');
  });

  it('should provide iterator method', () => {
    let s = new Set;
    s.add(1);
    s.add(2);
    let r = [];
    let expected = {1: true, 2: true};
    for (let value of s) r.push(value);
    assert.equal(r.length, 2);
    r.forEach((value) => assert(expected[value]));
  });

  it('should provide forEach method', () => {
    let s = new Set;
    s.add(1);
    s.add(2);
    let r = [];
    let expected = {1: true, 2: true};
    s.forEach((value) => assert(expected[value]));
  });

  it('should not allow duplicate data', () => {
    let s = new Set;
    s.add(1);
    assert.throws(() => s.add(1));
  });

  it('should provide clear method', () => {
    let s = new Set;
    s.add(1);
    s.add(2);
    assert.equal(s.size, 2);
    s.clear();
    assert.equal(s.size, 0);
  });

  it('should provide remove method', () => {
    let s = new Set;
    s.add(1);
    assert.equal(s.size, 1);
    s.remove(1);
    assert.equal(s.size, 0);

    let r = s.remove(5);
    assert(!r, 'remove should return false if no value found');
  });
});
