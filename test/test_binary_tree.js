import assert from 'assert';
import BinaryTree, {BinaryNode} from '../lib/binary_tree';

describe("BinaryNode", () => {
  it ("should have degree of two", () => {
    let n = new BinaryNode(null);
    assert(n.degree == 2);
  });

  it ("should have left and right properties", () => {
    let n = new BinaryNode('root');
    assert(n.left == null);
    assert(n.right == null);
    n.left = new BinaryNode('a');
    n.right = new BinaryNode('b');
    assert(n.left.value == 'a');
    assert(n.right.value == 'b');
  });

  it ("should not allow adding edges", () => {
    let n = new BinaryNode(null);
    let thrown = false;
    try {
      n.addEdge('b');
    } catch(e) {
      thrown = true;
    }
    assert(thrown);
  });
});

describe("BinaryTree", () => {
  it ("should construct", () => {
    let t = new BinaryTree;
  });

  it ("should not allow adding edges", () => {
    let t = new BinaryTree;

    let thrown = false;

    try {
      t.addEdge('a', 'b');
    } catch(e) {
      thrown = true;
    }

    assert(thrown);
  });

  it ("should not allow adding vertices", () => {
    let t = new BinaryTree;

    let thrown = false;

    try {
      t.addVertex('a');
    } catch(e) {
      thrown = true;
    }

    assert(thrown);
  });

  it ("should require that root be a BinaryNode", () => {
    let t = new BinaryTree;

    let thrown = false;

    try {
      t.root = 'bogus';
    } catch(e) {
      thrown = true;
    }

    assert(thrown);
  });

  it ("should allow setting the root", () => {
    let t = new BinaryTree;
    t.root = new BinaryNode('a');
    assert(t.root.value == 'a');
  });
});
