import assert from 'assert';
import Graph, {Vertex, Edge} from './graph';

export class BinaryNode extends Vertex {
  constructor(value, opts={}) {
    super(value, opts);

    // create the left edge edges[0]
    this.edges.push(new Edge(this, null));

    // create the right edge edges[1]
    this.edges.push(new Edge(this, null));
  }

  get left() {
    return this.edges[0].to;
  }

  set left(node) {
    assert(node instanceof BinaryNode, 'must be of type BinaryNode');
    this.edges[0].to = node;
    return node;
  }

  get right() {
    return this.edges[1].to;
  }

  set right(node) {
    assert(node instanceof BinaryNode, 'must be of type BinaryNode');
    this.edges[1].to = node;
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
    this._root = null;

    if (!(typeof this.opts.compare == 'function')) {
      this.opts.compare = (a, b) => {
        if (a > b)
          return 1;
        else if (a == b)
          return 0;
        else if (a < b)
          return -1;
      };
    }
  }

  get root() {
    return this._root;
  }

  set root(value) {
    if (value !== null && !(value instanceof BinaryNode))
      throw new Error("root must be of type BinaryNode");
    this._root = value;
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

  insert(value, opts = {}) {
    throw new Error('not implemented');
  }

  remove(value, opts = {}) {
    throw new Error('not implemented');
  }

  addVertex() {
    throw new Error('addVertex is not allowed in BinarySearchTree');
  }

  addEdge() {
    throw new Error('addEdge is not allowed in BinarySearchTree');
  }
}
