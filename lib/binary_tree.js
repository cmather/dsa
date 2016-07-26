import assert from 'assert';
import Graph, {Vertex, Edge} from './graph';

export class BinaryNode extends Vertex {
  constructor(key, value, opts={}) {
    assert(typeof key !== 'undefined', 'key is required for BinaryNode constructor.');

    if (typeof value === 'undefined') value = key;

    // graphs don't require keys so instead of autogenerating a key we'll
    // provide a key as an option to the Vertex constructor.
    super(value, Object.assign(opts, {key: key}));

    // create the left edge edges[0]
    this.edges.push(new Edge(this, null));

    // create the right edge edges[1]
    this.edges.push(new Edge(this, null));

    this.parent = null;
  }

  get left() {
    return this.edges[0].to;
  }

  set left(node) {
    assert(node == null || node instanceof BinaryNode, 'node must be of type BinaryNode or null');
    this.edges[0].to = node;
    if (node) node.parent = this;
    return node;
  }

  get right() {
    return this.edges[1].to;
  }

  set right(node) {
    assert(node == null || node instanceof BinaryNode, 'node must be of type BinaryNode or null');
    this.edges[1].to = node;
    if (node) node.parent = this;
    return node;
  }

  addEdge(value, opts = {weight: 1}) {
    throw new Error('addEdge is not allowed in BinaryNode');
  }
}

export default class BinaryTree extends Graph {
  constructor(opts = {}) {
    super(opts);
    this.opts.directed = true;

    if (!(typeof this.opts.compare == 'function')) {
      this.opts.compare = (a, b) => {
        if (a > b)
          return 1;
        else if (a == b)
          return 0;
        else if (a < b)
          return -1;
        else
          throw new Error(`${a} and ${b} are not comparable.`);
      };
    }
  }

  get root() {
    return this.vertices[0];
  }

  set root(value) {
    if (value !== null && !(value instanceof BinaryNode))
      throw new Error("root must be of type BinaryNode");
    this.vertices[0] = value;
    return value;
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
    if (!node) return;
    visit(node);
    this.preorder(visit, node.left);
    this.preorder(visit, node.right);
  }

  postorder(visit, node=this.root) {
    assert(typeof visit === 'function', 'visit must be a function');
    if (!node) return;
    this.preorder(visit, node.left);
    this.preorder(visit, node.right);
    visit(node);
  }

  inorder(visit, node=this.root) {
    assert(typeof visit === 'function', 'visit must be a function');
    if (!node) return;
    this.preorder(visit, node.left);
    visit(node);
    this.preorder(visit, node.right);
  }

  insert(key, value, opts = {}, node = this.root) {
    throw new Error('not implemented');
  }

  remove(key) {
    throw new Error('not implemented');
  }

  addVertex() {
    throw new Error('addVertex is not allowed in BinarySearchTree');
  }

  addEdge() {
    throw new Error('addEdge is not allowed in BinarySearchTree');
  }
}
