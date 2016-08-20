import assert from 'assert';
import {BinaryNode} from './binary_tree'; 
import BinarySearchTree from './binary_search_tree';

const COLORS = {
  red: 'red',
  black: 'black'
};

export class RedBlackTreeNode extends BinaryNode {
  constructor(value, opts={color: COLORS.red}) {
    super(value, opts);
    this.color = opts.color;
    this.left = RBNullNode;
    this.right = RBNullNode;
  }
}

export const RBNullNode = new RedBlackTreeNode(null, {color: COLORS.black});
RBNullNode.__isRBNullNode__ = true;

export default class RedBlackTree extends BinarySearchTree {
  constructor(opts={}) {
    super(opts);
    this.root = RBNullNode;
  }

  has(value) {
    return !!this.find(value);
  }

  insert(value, opts={}) {
    let newNode = super.insert(value, opts);
    this.fixInsert(newNode);
    return newNode;
  }

  fixInsert(node) {
    while (node.parent.color == COLORS.red) {

      // node.parent is the left child of the grandparent
      if (node.parent.isLeftChild()) {

        if (node.uncle.color == COLORS.red) {
          node.grandparent.color = COLORS.red;
          node.uncle.color = COLORS.black;
          node.parent.color = COLORS.black;
          node = node.grandparent;
        } 
        
        else {
          if (node.isRightChild()) {
            node = node.parent;
            this.rotateLeft(node);
          }

          node.parent.color = COLORS.black;
          node.grandparent.color = COLORS.red;
          this.rotateRight(node.grandparent);
        }
      }

      // node.parent.isRightChild() == true
      else {
        if (node.uncle.color == COLORS.red) {
          node.grandparent.color = COLORS.red;
          node.uncle.color = COLORS.black;
          node.parent.color = COLORS.black;
          node = node.grandparent;
        } 

        else {
          if (node.isLeftChild()) {
            node = node.parent;
            this.rotateRight(node);
          }

          node.parent.color = COLORS.black;
          node.grandparent.color = COLORS.red;
          this.rotateLeft(node.grandparent);
        }
      }
    }

    this.root.color = COLORS.black;
  }

  remove(value) {
    let node = this.find(value);
    if (!node) return false;

    let x;
    let y = node;
    let yOrigColor = node.color;

    if (node.left == RBNullNode) {
      x = node.right;
      this.transplant(node, node.right);
    }

    else if (node.right == RBNullNode) {
      x = node.left;
      this.transplant(node, node.left);
    }

    else {
      y = this.min(node.right);
      yOrigColor = y.color;
      x = y.right;
      if (y.parent == node)
        x.parent = y;
      else {
        this.transplant(y, y.right);
        y.right = node.right;
        y.right.parent = y;
      }

      this.transplant(node, y);
      y.left = node.left;
      y.left.parent = y;
      y.color = node.color;
    }

    if (yOrigColor == COLORS.black)
      this.fixRemove(x);

    return true;
  }

  transplant(u, v) {
    assert(u instanceof RedBlackTreeNode, `expected u to be RedBlackTreeNode but got ${typeof u}`);
    assert(v instanceof RedBlackTreeNode, `expected v to be RedBlackTreeNode but got ${typeof v}`);
    super.transplant(u, v);
    v.parent = u.parent;
  }

  fixRemove(node) {
    while (node != this.root && node.color == COLORS.black) {
      if (node.isLeftChild()) {
        if (node.sibling.color == COLORS.red) {
          node.sibling.color = COLORS.black;
          node.parent.color = COLORS.red;
          this.rotateLeft(node.parent);
        }

        if (node.sibling.left.color == COLORS.black && node.sibling.right.color == COLORS.black) {
          node.sibling.color = COLORS.red;
          node = node.parent;
        }

        else {
          if (node.sibling.right.color == COLORS.black) {
            node.sibling.left.color = COLORS.black;
            node.sibling.color = COLORS.red;
            this.rotateRight(node.sibling);
          }

          node.sibling.color = node.parent.color;
          node.parent.color = COLORS.black;
          node.sibling.right.color = COLORS.black;
          this.rotateLeft(node.parent);
          node = this.root;
        }
      }
      
      else if (node.isRightChild()) {
        if (node.sibling.color == COLORS.red) {
          node.sibling.color = COLORS.black;
          node.parent.color = COLORS.red;
          this.rotateRight(node.parent);
        }

        if (node.sibling.left.color == COLORS.black && node.sibling.right.color == COLORS.black) {
          node.sibling.color = COLORS.red;
          node = node.parent;
        }

        else {
          if (node.sibling.left.color == COLORS.black) {
            node.sibling.right.color = COLORS.black;
            node.sibling.color = COLORS.red;
            this.rotateLeft(node.sibling);
          }

          node.sibling.color = node.parent.color;
          node.parent.color = COLORS.black;
          node.sibling.left.color = COLORS.black;
          this.rotateRight(node.parent);
          node = this.root;
        }
      }
    }

    node.color = COLORS.black;
  }

  rotateRight(node) {
    // you can't rotate right if no left child
    if (node.left == RBNullNode)
      return false;

    // pivot = left child
    let pivot = node.left;

    // move pivot's right child to node's left child since we're moving the
    // pivot to be the right child of node.
    node.left = pivot.right;

    if (pivot.right != RBNullNode)
      pivot.right.parent = node;

    // move pivot into node's position
    pivot.parent = node.parent;

    if (node.parent == RBNullNode)
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
    if (node.right == RBNullNode)
      return false;

    // pivot = right child
    let pivot = node.right;

    // move pivot's left child to node's right child since we're moving
    // node to be the left child of the pivot instead
    node.right = pivot.left;

    if (pivot.left != RBNullNode)
      pivot.left.parent = node;

    // move pivot into node's position and wire up the parent pointers for the
    // pivot
    pivot.parent = node.parent

    if (node.parent == RBNullNode)
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

  createNode(value, opts) {
    assert(typeof value !== 'undefined', `value is a required parameter of createNode`);
    return new RedBlackTreeNode(value, Object.assign(opts || {}, {color: COLORS.red}));
  }

  nullNode() {
    return RBNullNode;
  }
}
