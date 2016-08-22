import assert from 'assert';
import compare from './compare';
import Graph, {Node, Edge} from './graph';

export class BinaryNode extends Node {
  constructor(tree, value, opts={}) {
    super(tree, value, opts);

    // create the left edge edges[0]
    this.addEdge(tree.nullNode());

    // create the right edge edges[1]
    this.addEdge(tree.nullNode());

    // no more edges allowed for a BinaryNode
    this.addEdge = () => { throw new Error('addEdge not allowed for BinaryNode. Use left and right properties instead.') };

    this.parent = tree.nullNode();

    // alias tree property so we don't get confused in subclasses that the tree
    // is the same as the graph instance
    this.tree = this.graph = tree;
  }

  get left() {
    return this.getEdge(0).to;
  }

  set left(node) {
    assert(node == null || node instanceof BinaryNode, 'node must be of type BinaryNode or null');

    this.getEdge(0).to = node;

    if (!this.tree.isNull(node))
      node.parent = this;

    return node;
  }

  get right() {
    return this.getEdge(1).to;
  }

  set right(node) {
    assert(node == null || node instanceof BinaryNode, 'node must be of type BinaryNode or null');

    this.getEdge(1).to = node;

    if (!this.tree.isNull(node))
      node.parent = this;

    return node;
  }

  get parent() {
    return this._parent;
  }

  set parent(node) {
    assert(node == null || node instanceof BinaryNode, 'parent must be of type BinaryNode or null');
    this._parent = node;
    return node;
  }

  get sibling() {
    if (this.parent)
      return this.parent.left == this ? this.parent.right : this.parent.left;
    else
      return null;
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

export default class BinaryTree extends Graph {
  constructor(opts = {}) {
    opts.compare = opts.compare || compare;
    super(opts);

    this.opts.directed = true;
    this.root = this.nullNode();
  }

  size() {
    return this.isNull(this.root) ? 0 : this.root.size;
  }

  get root() {
    return this.getNode(0);
  }

  set root(node) {
    assert(node === null || (node instanceof BinaryNode), "root must be of type BinaryNode");
    this._nodes[0] = node;
    return node;
  }

  compare(a, b) {
    return this.opts.compare(a, b);
  }

  isEqual(a, b) {
    return this.compare(a, b) == 0;
  }

  isGreater(a, b) {
    return this.compare(a, b) == 1;
  }

  isLess(a, b) {
    return this.compare(a, b) == -1;
  }

  preorder(visit, node=this.root) {
    assert(typeof visit === 'function', 'visit must be a function');
    if (this.isNull(node)) return;
    visit(node);
    this.preorder(visit, node.left);
    this.preorder(visit, node.right);
  }

  postorder(visit, node=this.root) {
    assert(typeof visit === 'function', 'visit must be a function');
    if (this.isNull(node)) return;
    this.postorder(visit, node.left);
    this.postorder(visit, node.right);
    visit(node);
  }

  inorder(visit, node=this.root) {
    assert(typeof visit === 'function', 'visit must be a function');
    if (this.isNull(node)) return;
    this.inorder(visit, node.left);
    visit(node);
    this.inorder(visit, node.right);
  }

  createNode(value, opts) {
    assert(typeof value !== 'undefined', `value is a required parameter of createNode`);
    return new BinaryNode(this, value, opts); 
  }

  remove(value) {
    throw new Error('not implemented');
  }

  addEdge() {
    throw new Error('addEdge is not allowed in BinarySearchTree');
  }

  /**
   * The callback provided to the forEach iterator method.
   *
   * @callback iteratorCallback
   * @param {*} value The value at the given point in iteration.
   * @param {number} index The 0 based index of the value.
   */

  /**
   * Iterates in order over all values in the tree.
   *
   * @param cb {iteratorCallback}
   */
  forEach(cb) {
    let idx = 0;
    this.inorder((node) => cb(node.value, idx++));
  }

  *nodes(node = this.root, idx=0) {
    if (this.isNull(node)) return;
    yield* this.nodes(node.left);
    yield node.value;
    yield* this.nodes(node.right);
  }

  isNull(node) {
    return node === this.nullNode();
  }

  nullNode() {
    return null;
  }
}
