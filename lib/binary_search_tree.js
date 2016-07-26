import assert from 'assert';
import BinaryTree, {BinaryNode} from './binary_tree';

export default class BinarySearchTree extends BinaryTree {
  find(key, node = this.root) {
    while (node && !this.isEqual(key, node.key)) {
      if (this.isLess(key, node.key))
        node = node.left;
      else
        node = node.right;
    }

    return node;
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

  insert(key, value, opts = {}) {
    let parent = null;
    let node = this.root;
    let newNode = new BinaryNode(key, value, opts);

    while (node) {
      parent = node;
      if (this.isLess(key, node.key))
        node = node.left;
      else
        node = node.right;
    }

    newNode.parent = parent;

    if (!parent)
      this.root = newNode;
    else if (this.isLess(key, parent.key))
      parent.left = newNode;
    else
      parent.right = newNode;

    return newNode; 
  }

  remove(key) {
    let node = this.find(key);

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

    return node;
  }

  transplant(u, v) {
    assert(u, `cannot transplant to node which is ${u}`);

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
