import assert from 'assert';
import compare from '../lib/compare';

describe("compare", () => {
  it ("should return 1 if a > b", () => {
    let result = compare(2, 1);
    assert(result == 1, `expected 1 but got ${result}`)
  });

  it ("should return 0 if a == b", () => {
    let result = compare(1, 1);
    assert(result == 0, `expected 0 but got ${result}`)
  });

  it ("should return -1 if a < b", () => {
    let result = compare(1, 2);
    assert(result == -1, `expected -1 but got ${result}`)
  });
});
