import assert from 'assert';
import {BinaryNode} from './binary_tree'; 
import BinarySearchTree from './binary_search_tree';

const COLORS = {
  red: 'red',
  black: 'black'
};

export class RedBlackTreeNode extends BinaryNode {
  constructor(key, value, opts={color: COLORS.red}) {
    super(key, value, opts);
    this.color = opts.color;
    this.left = NullNode;
    this.right = NullNode;
  }
}

export const NullNode = new RedBlackTreeNode(null, null, {color: COLORS.black});

export default class RedBlackTree extends BinarySearchTree {
  constructor(key, value, opts={}) {
    super(key, value, opts);
    this.root = NullNode;
  }

  insert(key, value, opts={}) {
    let parent = NullNode;
    let node = this.root;
    let newNode = new RedBlackTreeNode(key, value, Object.assign(opts, {color: COLORS.red}));

    while (node != NullNode) {
      parent = node;

      // key < node.key
      if (this.isLess(key, node.key))
        node = node.left;

      // key >= node.key
      else
        node = node.right
    }

    newNode.parent = parent;

    if (parent == NullNode)
      this.root = newNode;
    else if (this.isLess(key, parent.key))
      parent.left = newNode;
    else
      parent.right = newNode;

    this.fixInsert(newNode);

    return newNode;
  }

  fixInsert(node) {
  }

  rotateRight(node) {
    // you can't rotate right if no left child
    if (node.left == NullNode)
      return false;

    // pivot = left child
    let pivot = node.left;

    // move pivot's right child to node's left child since we're moving the
    // pivot to be the right child of node.
    node.left = pivot.right;

    if (pivot.right != NullNode)
      pivot.right.parent = node;

    // move pivot into node's position
    pivot.parent = node.parent;

    if (node.parent == NullNode)
      this.root = pivot;
    else if (node == node.parent.left)
      node.parent.left = pivot;
    else
      node.parent.right = pivot;

    // node is moved to the right child of the pivot
    pivot.right = node;

    // node's parent becomes the pivot
    node.parent = pivot;

    return true;
  }

  rotateLeft(node) {
    // you can't rotate left if there's no right child
    if (node.right == NullNode)
      return false;

    // pivot = right child
    let pivot = node.right;

    // move pivot's left child to node's right child since we're moving
    // node to be the left child of the pivot instead
    node.right = pivot.left;

    if (pivot.left != NullNode)
      pivot.left.parent = node;

    // move pivot into node's position and wire up the parent pointers for the
    // pivot
    pivot.parent = node.parent

    if (node.parent == NullNode)
      this.root = pivot;
    else if (node == node.parent.left)
      node.parent.left = pivot;
    else
      node.parent.right = pivot;

    // node is moved to the left child of the pivot
    pivot.left = node;

    // node's parent becomes the pivot
    node.parent = pivot;

    return true;
  }
}
