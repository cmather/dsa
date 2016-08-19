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

  min(node = this.root) {
    while (node && node.left) {
      node = node.left;
    }

    return node;
  }

  max(node = this.root) {
    while (node && node.right) {
      node = node.right;
    }

    return node;
  }

  successor(node) {
    if (!node) return null;

    if (node.right)
      return this.min(node.right);

    let parent = node.parent;

    while (parent && node == parent.right) {
      node = parent;
      parent = parent.parent;
    }

    return parent;
  }

  insert(value, opts = {}) {
    let parent = null;
    let node = this.root;
    let newNode = new BinaryNode(value, opts);

    while (node) {
      parent = node;
      // FIXME update counts of all parent nodes along the way down the tree
      if (this.isLess(value, node.value))
        node = node.left;
      else
        node = node.right;
    }

    newNode.parent = parent;

    if (!parent)
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

    if (node.left == null)
      this.transplant(node, node.right);
    else if (node.right == null)
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

    if (!u.parent)
      this.root = v;
    else if (u == u.parent.left)
      u.parent.left = v;
    else
      u.parent.right = v;

    if (v)
      v.parent = u.parent;
  }
}
