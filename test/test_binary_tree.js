import assert from 'assert';
import BinaryTree, {BinaryNode} from '../lib/binary_tree';

function makeTree() {
  let t = new BinaryTree;
  t.root = new BinaryNode(5);

  t.root.left = new BinaryNode(3);
  t.root.left.left = new BinaryNode(1);
  t.root.left.right = new BinaryNode(2);

  t.root.right = new BinaryNode(10);
  t.root.right.left = new BinaryNode(6);
  t.root.right.right = new BinaryNode(11);

  return {
    tree: t,
    inorder: [1, 3, 2, 5, 6, 10, 11],
    preorder: [5, 3, 1, 2, 10, 6, 11],
    postorder: [1, 2, 3, 6, 11, 10, 5]
  };
}

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

  it ("should provide inorder, preorder and postorder traversal", () => {
    ['inorder', 'preorder', 'postorder'].forEach((traversalType) => {
      let testData = makeTree();
      let actual = [];
      testData.tree[traversalType]((node) => actual.push(node.value));
      actual.forEach((val, idx) => {
        assert.equal(val, testData[traversalType][idx]);
      });
    });
  });

  it ("should provide an entries generator", () => {
    let testData = makeTree();
    let iterator = testData.tree.entries();
    let current = iterator.next();
    let actual = [];

    while (!current.done) {
      actual.push(current.value);
      current = iterator.next();
    }

    actual.forEach((val, idx) => {
      assert.equal(val, testData.inorder[idx]);
    });
  });

  it ("should provide forEach method for inorder traversal", () => {
    let testData = makeTree();
    let actual = [];

    testData.tree.forEach((value, idx) => {
      actual.push([idx, value]);
    });

    actual.forEach((val, idx) => {
      assert.equal(val[0], idx);
      assert.equal(val[1], testData.inorder[idx]);
    });
  });

  it ("should provide an inorder iterator", () => {
    let testData = makeTree();
    let actual = [];
    let value;

    for (value of testData.tree) actual.push(value);

    console.log(actual);

    actual.forEach((val, idx) => {
      assert.equal(val, testData.inorder[idx]);
    });
  });
});
