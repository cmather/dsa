import assert from 'assert';
import BinarySearchTree from '../lib/binary_search_tree';

function constructTree() {
  let tree = new BinarySearchTree;

  tree.insert(5);

  tree.insert(2);
  tree.insert(1);
  tree.insert(3);

  tree.insert(8);
  tree.insert(7);
  tree.insert(9);

  return tree;
}

describe("BinarySearchTree", () => {
  it ("should construct", () => {
    let t = new BinarySearchTree;
  });

  it ("should insert correctly", () => {
    let tree = constructTree();

    assert(tree.root.value == 5);

    // left subtree
    assert(tree.root.left.value == 2);
    assert(tree.root.left.left.value == 1);
    assert(tree.root.left.right.value == 3);

    // right subtree
    assert(tree.root.right.value == 8);
    assert(tree.root.right.left.value == 7);
    assert(tree.root.right.right.value == 9);
  });

  it ("should provide the min", () => {
    let tree = constructTree();
    assert(tree.min().value == 1);
  });

  it ("should provide the max", () => {
    let tree = constructTree();
    assert(tree.max().value == 9);
  });
});
