import assert from 'assert';
import BinaryTree, {BinaryNode} from '../lib/binary_tree';

function makeTree() {
  let t = new BinaryTree;
  t.root = new BinaryNode(t, 5);

  t.root.left = new BinaryNode(t, 3);
  t.root.left.left = new BinaryNode(t, 1);
  t.root.left.right = new BinaryNode(t, 2);

  t.root.right = new BinaryNode(t, 10);
  t.root.right.left = new BinaryNode(t, 6);
  t.root.right.right = new BinaryNode(t, 11);

  return {
    tree: t,
    inorder: [1, 3, 2, 5, 6, 10, 11],
    preorder: [5, 3, 1, 2, 10, 6, 11],
    postorder: [1, 2, 3, 6, 11, 10, 5]
  };
}

describe("BinaryNode", () => {
  it ("should have degree of two", () => {
    let t = new BinaryTree;
    let n = new BinaryNode(t, null, null);
    assert(n.degree == 2);
  });

  it ("should have left, right and parent properties", () => {
    let t = new BinaryTree;
    let n = new BinaryNode(t, 'root');

    assert.equal(n.left, null, 'left should be null');
    assert.equal(n.right, null, 'right should be null');

    n.left = new BinaryNode(t, 'a');
    n.right = new BinaryNode(t, 'b');

    assert.equal(n.left.value, 'a');
    assert.equal(n.right.value, 'b');

    assert.equal(n.left.parent, n);
    assert.equal(n.right.parent, n);
  });

  it ("should not allow adding edges", () => {
    let t = new BinaryTree;
    let n = new BinaryNode(t, 1);
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
    let a = new BinaryNode(t, 'a');
    let b = new BinaryNode(t, 'b');

    let thrown = false;

    try {
      t.addEdge(a, b);
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
    t.root = new BinaryNode(t, 'a');
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

  it ("should override the nodes generator for iterating over the tree in order", () => {
    let testData = makeTree();
    let iterator = testData.tree.nodes();
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

  it ("should provide a for of iterator that traverses in order", () => {
    let testData = makeTree();
    let actual = [];
    let value;

    for (value of testData.tree) actual.push(value);

    actual.forEach((val, idx) => {
      assert.equal(val, testData.inorder[idx]);
    });
  });
});
