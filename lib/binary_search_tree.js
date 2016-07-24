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

  insert(key, value, opts = {}, node = this.root) {
    if (!this.root) {
      this.root = new BinaryNode(key, value, opts);
      return this.root;
    }

    let compared = this.compare(key, node.key)
    var inserted;

    // value is > node.value
    if (compared == 1) {
      if (node.right)
        inserted = this.insert(key, value, opts, node.right);
      else
        inserted = node.right = new BinaryNode(key, value, opts);
    }

    // value is <= node.value
    else {
      if (node.left)
        inserted = this.insert(key, value, opts, node.left);
      else
        inserted = node.left = new BinaryNode(key, value, opts);
    }

    return inserted;
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
