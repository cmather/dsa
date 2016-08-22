import assert from 'assert';
import BinaryTree, {BinaryNode} from './binary_tree';

export default class BinarySearchTree extends BinaryTree {
  find(value, node = this.root) {
    while (node && !this.isEqual(value, node.value)) {
      if (this.isLess(value, node.value))
        node = node.left;
      else
        node = node.right;
    }

    return node || null;
  }

  has(value) {
    return !!this.find(value);
  }

  min(node = this.root) {
    while (node && !this.isNull(node.left)) {
      node = node.left;
    }

    return node;
  }

  max(node = this.root) {
    while (node && !this.isNull(node.right)) {
      node = node.right;
    }

    return node;
  }

  successor(node) {
    if (this.isNull(node)) return null;

    if (!this.isNull(node.right))
      return this.min(node.right);

    let parent = node.parent;

    while (!this.isNull(parent) && node == parent.right) {
      node = parent;
      parent = parent.parent;
    }

    return parent;
  }

  add(value, opts = {}) {
    let parent = this.nullNode();
    let node = this.root;
    let newNode = super.add(value, opts);

    while (!this.isNull(node)) {
      parent = node;

      if (this.isLess(value, node.value))
        node = node.left;
      else
        node = node.right;
    }

    newNode.parent = parent;

    if (this.isNull(parent))
      this.root = newNode;
    else if (this.isLess(value, parent.value))
      parent.left = newNode;
    else
      parent.right = newNode;

    return newNode;
  }

  remove(value) {
    let node = this.find(value);

    if (!node) return false;

    if (this.isNull(node.left))
      this.transplant(node, node.right);
    else if (this.isNull(node.right))
      this.transplant(node, node.left);
    else {
      let y = this.min(node.right);

      if (y.parent != node) {
        this.transplant(y, y.right);
        y.right = node.right;
        y.right.parent = y;
      }

      this.transplant(node, y);
      y.left = node.left;
      y.left.parent = y;
    }

    return true;
  }

  transplant(u, v) {
    assert(u instanceof BinaryNode, `cannot transplant to node which is ${u}`);

    if (this.isNull(u.parent))
      this.root = v;
    else if (u.isLeftChild())
      u.parent.left = v;
    else
      u.parent.right = v;

    if (v)
      v.parent = u.parent;
  }
}
