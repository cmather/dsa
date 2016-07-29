import assert from 'assert';
import BinaryTree, {BinaryNode} from '../lib/binary_tree';

describe("BinaryNode", () => {
  it ("should have degree of two", () => {
    let n = new BinaryNode(null);
    assert(n.degree == 2);
  });

  it ("should have left, right and parent properties", () => {
    let n = new BinaryNode('root');
    assert(n.left == null);
    assert(n.right == null);
    n.left = new BinaryNode('a');
    n.right = new BinaryNode('b');
    assert(n.left.value == 'a');
    assert(n.right.value == 'b');
    assert(n.left.parent == n);
    assert(n.right.parent == n);
  });

  it ("should not allow adding edges", () => {
    let n = new BinaryNode(1);
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

  it ("should provide preorder traversal", () => {
    let t = new BinaryTree;
    t.root = new BinaryNode(1);
    t.root.left = new BinaryNode(2);
    t.root.right = new BinaryNode(3);

    let results = [];
    t.preorder((node) => results.push(node.value));
    assert(results.length == 3);
    assert(results[0] == 1);
    assert(results[1] == 2);
    assert(results[2] == 3);
  });

  it ("should provide inorder traversal", () => {
    let t = new BinaryTree;
    t.root = new BinaryNode(1);
    t.root.left = new BinaryNode(2);
    t.root.right = new BinaryNode(3);

    let results = [];
    t.inorder((node) => results.push(node.value));
    assert(results.length == 3);
    assert(results[0] == 2);
    assert(results[1] == 1);
    assert(results[2] == 3);
  });

  it ("should provide postorder traversal", () => {
    let t = new BinaryTree;
    t.root = new BinaryNode(1);
    t.root.left = new BinaryNode(2);
    t.root.right = new BinaryNode(3);

    let results = [];
    t.postorder((node) => results.push(node.value));
    assert(results.length == 3);
    assert(results[0] == 2);
    assert(results[1] == 3);
    assert(results[2] == 1);
  });
});
