import assert from 'assert';
import {BinaryNode} from '../lib/binary_tree';
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

  it ("should return a node on insert", () => {
    let tree = new BinarySearchTree;

    // root
    let result = tree.insert(5);
    assert(result instanceof BinaryNode);

    // left
    result = tree.insert(4);
    assert(result instanceof BinaryNode);

    // right
    result = tree.insert(6);
    assert(result instanceof BinaryNode);
  });

  it ("should insert in the correct position", () => {
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

  it ("should allow transplant of parent's left child", () => {
    let tree = new BinarySearchTree;

    let root = tree.insert(5);
    let left = tree.insert(2);
    let leftRight = tree.insert(3);
    tree.transplant(left, leftRight);
    assert(leftRight.parent == root);
    assert(root.left == leftRight);
  });

  it ("should allow transplant of parent's right child", () => {
    let tree = new BinarySearchTree;

    let root = tree.insert(5);
    let right = tree.insert(8);
    let rightLeft = tree.insert(6);
    tree.transplant(right, rightLeft);
    assert(rightLeft.parent == root);
    assert(root.right == rightLeft);
  });

  it ("should allow remove where node has no children", () => {
    let tree = constructTree();
    let node = tree.remove(9);
    assert(node);
    assert(tree.root.right.right == null);
  });

  it ("should allow remove where node has only a left child", () => {
    let tree = new BinarySearchTree;
    tree.insert(10);
    tree.insert(5);
    tree.insert(2);
    let node = tree.remove(5);
    assert(node);
    assert(tree.root.left.value == 2);
  });

  it ("should allow remove where node has only a right child", () => {
    let tree = new BinarySearchTree;
    tree.insert(10);
    tree.insert(5);
    tree.insert(7);
    let node = tree.remove(5);
    assert(node);
    assert(tree.root.left.value == 7);
  });

  it ("should allow remove where node has a left and right child", () => {
    let tree = new BinarySearchTree;
    tree.insert(10);
    tree.insert(5);
    tree.insert(3);
    tree.insert(7);
    let node = tree.remove(5);
    assert(node);
    assert(tree.root.left.value == 7);
    assert(tree.root.left.left.value == 3);
  });

  it ("should allow remove where node has a left child and right subtree", () => {
    let tree = new BinarySearchTree;

    tree.insert(10);
    tree.insert(5);
    tree.insert(3);
    tree.insert(8);
    tree.insert(6);
    tree.insert(7);
    tree.insert(9);

    let node = tree.remove(5);
    assert(node);
    assert(tree.find(8).left == tree.find(7));
    assert(tree.find(7).parent == tree.find(8));
    assert(tree.find(6).left == tree.find(3));
    assert(tree.find(6).right == tree.find(8));
  });
});
