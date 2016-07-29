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
    this.left = NullNode;
    this.right = NullNode;
  }

  get grandparent() {
    return this.parent ? this.parent.parent : null;
  }

  get uncle() {
    if (!this.grandparent)
      return null;
    else if (this.parent == this.grandparent.left)
      return this.grandparent.right;
    else
      return this.grandparent.left;
  }

  isLeftChild() {
    if (!this.parent) return false;
    return this.parent.left == this;
  }

  isRightChild() {
    if (!this.parent) return false;
    return this.parent.right == this;
  }
}

export const NullNode = new RedBlackTreeNode(null, {color: COLORS.black});

export default class RedBlackTree extends BinarySearchTree {
  constructor(value, opts={}) {
    super(value, opts);
    this.root = NullNode;
  }

  insert(value, opts={}) {
    let parent = NullNode;
    let node = this.root;
    let newNode = new RedBlackTreeNode(value, Object.assign(opts, {color: COLORS.red}));

    while (node != NullNode) {
      parent = node;

      if (this.isLess(value, node.value))
        node = node.left;
      else
        node = node.right
    }

    newNode.parent = parent;

    if (parent == NullNode)
      this.root = newNode;
    else if (this.isLess(value, parent.value))
      parent.left = newNode;
    else
      parent.right = newNode;

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

  preorder(visit, node=this.root) {
    assert(typeof visit === 'function', 'visit must be a function');
    if (node == NullNode) return;
    visit(node);
    this.preorder(visit, node.left);
    this.preorder(visit, node.right);
  }

  postorder(visit, node=this.root) {
    assert(typeof visit === 'function', 'visit must be a function');
    if (node == NullNode) return;
    this.postorder(visit, node.left);
    this.postorder(visit, node.right);
    visit(node);
  }

  inorder(visit, node=this.root) {
    assert(typeof visit === 'function', 'visit must be a function');
    if (node == NullNode) return;
    this.inorder(visit, node.left);
    visit(node);
    this.inorder(visit, node.right);
  }
}
