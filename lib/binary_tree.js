import assert from 'assert';
import compare from './compare';
import Graph, {Vertex, Edge} from './graph';

export class BinaryNode extends Vertex {
  constructor(value, opts={}) {
    super(value, opts);

    // create the left edge edges[0]
    this.edges.push(new Edge(this, null));

    // create the right edge edges[1]
    this.edges.push(new Edge(this, null));

    // initialize the parent node to null so the isNull check works correctly
    this._parent = null;
  }

  get left() {
    return this.edges[0].to;
  }

  set left(node) {
    assert(node == null || node instanceof BinaryNode, 'node must be of type BinaryNode or null');
    this.edges[0].to = node;
    if (node) {
      node.parent = this;
      node.tree = this.tree;
    }
    return node;
  }

  get right() {
    return this.edges[1].to;
  }

  set right(node) {
    assert(node == null || node instanceof BinaryNode, 'node must be of type BinaryNode or null');
    this.edges[1].to = node;
    if (node) {
      node.parent = this;
      node.tree = this.tree;
    }
    return node;
  }

  get parent() {
    return this._parent;
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

  set parent(node) {
    assert(node == null || node instanceof BinaryNode, 'parent must be of type BinaryNode or null');
    this._parent = node;
    if (node) this.tree = node.tree;
    return node;
  }

  addEdge(value, opts = {weight: 1}) {
    throw new Error('addEdge is not allowed in BinaryNode');
  }
}

export default class BinaryTree extends Graph {
  constructor(opts = {}) {
    opts.compare = opts.compare || compare;
    super(opts);
    this.opts.directed = true;

    // we need the root to be null vs undefined because of the explicit
    // isNull(node) check which looks for null instead of any falsy value.
    // note the RBTree will set the root to the RBNullNode.
    this.vertices[0] = this.nullNode();
  }

  get root() {
    return this.vertices[0];
  }

  set root(node) {
    if (node !== null && !(node instanceof BinaryNode))
      throw new Error("root must be of type BinaryNode");
    this.vertices[0] = node;
    node.tree = this;
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

  insert(value, opts = {}) {
    throw new Error('not implemented');
  }

  remove(value) {
    throw new Error('not implemented');
  }

  addVertex() {
    throw new Error('addVertex is not allowed in BinarySearchTree');
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

  *entries(node = this.root, idx=0) {
    if (this.isNull(node)) return;
    yield* this.entries(node.left);
    yield node.value, idx++;
    yield* this.entries(node.right);
  }

  *[Symbol.Iterator]() {
    return entries();
  }

  createNode(value, opts) {
    assert(typeof value !== 'undefined', `value is a required parameter of createNode`);
    return new BinaryNode(value, opts); 
  }

  isNull(node) {
    return node === this.nullNode();
  }

  nullNode() {
    return null;
  }
}
