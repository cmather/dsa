import assert from 'assert';
import Trie from '../lib/trie';
import words from 'an-array-of-english-words';

describe("Trie", () => {
  it ("should work", () => {
    let tree = new Trie(words);
    let result;

    assert(tree.root, `tree should have a root property`);

    result = tree.contains('prog', {exact: true});
    assert.equal(result, false, `should not contain an exact match for 'prog'`);

    result = tree.contains('prog', {exact: false});
    assert.equal(result, true, `should contain a prefix match for 'prog'`);

    result = tree.contains('program');
    assert.equal(result, true, `should contain word 'program'`);
  });
});

