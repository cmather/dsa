import assert from 'assert';

var nextKey = (function nextId() {
  var key = 0;
  return function () {
    return String(key++);
  }
})();

export class Edge {
  /**
   * Constructs an Edge instance.
   *
   * @param {Node} from
   * @param {Node} to
   * @param {object} [opts]
   */
  constructor(from, to, opts={weight: 1}) {
    this.from = from;
    this.to = to || null;
    this.weight = opts.weight;
  }
}

export class Node {
  /**
   * Constructs a Node instance.
   *
   * @param {Graph} from
   * @param {*} value
   * @param {object} [opts]
   */
  constructor(graph, value, opts={}) {
    assert(typeof value !== 'undefined', `Node value parameter cannot be ${typeof value}`);

    this.__defaultHashKey__ = nextKey();
    this.graph = graph;
    this.value = value;
    this.opts = opts;
    this._edges = [];
  }

  /**
   * Returns the number of outgoing edges from the node.
   *
   * @return {number}
   */
  get degree() {
    return this._edges.length;
  }

  /**
   * Adds an edge to the node.
   *
   * @param {Node} to
   * @param {object} [opts]
   *
   * @return {number}
   */
  addEdge(to, opts) {
    let edge = new Edge(this, to, opts);
    this._edges.push(edge);
    return edge;
  }

  /**
   * Returns the edge at the specified index.
   *
   * @param {number} idx - The index of the edge to return.
   *
   * @return {Edge}
   */
  getEdge(idx) {
    return this._edges[idx];
  }

  /**
   * Iterate over the edges of the node in the order the edges were added to the
   * node.
   *
   * @param {function} cb - A callback function f(edge, index).
   */
  forEach(cb) {
    for (var i = 0; i < this.degree; i++) {
      cb(this._edges[i], i);
    }
  }

  /**
   * Returns a generator to iterate over the edges in the node.
   */
  *edges() {
    for (var i = 0; i < this.degree; i++) {
      yield this._edges[i];
    }
  }

  /**
   * Iterate over the edges in the node using a for of loop.
   */
  *[Symbol.iterator]() {
    yield* this.edges();
  }

  /**
   * Returns a string hash key for the node. You can provide a toHashKey as an
   * option to the Node constructor, or if the node's value has a toHashKey that
   * method will be used. By default, it will use the __defaultHashKey__
   * assigned at constructor time.
   *
   * @return {string}
   */
  toHashKey() {
    if (typeof this.opts.toHashKey === 'function')
      return this.opts.toHashKey();

    if (typeof this.value.toHashKey === 'function')
      return this.value.toHashKey();

    else
      return this.__defaultHashKey__;
  }
}

export default class Graph {
  /**
   * Constructs an instance of a directed or undirected graph.
   *
   * @param {object} [opts]
   */
  constructor(opts = {directed: false}) {
    this.opts = opts;
    this._nodes = [];
  }

  /**
   * Returns the number of nodes in the graph.
   *
   * @return {number}
   */
  get length() {
    return this._nodes.length;
  }

  /**
   * Alias for this.length.
   *
   * @return {number}
   */
  get size() {
    return this.length;
  }

  /**
   * Returns true if the graph is directed and false if not.
   *
   * @return {boolean}
   */
  isDirected() {
    return !!this.opts.directed;
  }

  /**
   * Add a node to the graph.
   *
   * @param {*} value
   * @param {object} opts
   *
   * @return {Node} The created Node instance.
   */
  add(value, opts = {}) {
    let v = this.createNode(value, opts);
    this._nodes.push(v);
    return v;
  }

  /**
   * Creates a new node that is linked to this graph. You shouldn't call this
   * method directly. Instead, add values to the graph using the add() method.
   *
   * @param {*} value
   * @param {object} [opts]
   *
   * @return {Node} The created Node instance.
   */
  createNode(value, opts) {
    return new Node(this, value, opts);
  }

  /**
   * Returns the node at the specified index.
   *
   * @param {number} idx - The index of the node to return.
   *
   * @return {Node}
   */
  getNode(idx) {
    return this._nodes[idx];
  }

  /**
   * Add an edge between two graph nodes.
   *
   * @param {Node} nodeA
   * @param {Node} nodeB
   * @param {object} opts
   *
   * @return {Array} An array of the created edges (1 or 2).
   */
  addEdge(nodeA, nodeB, opts = {weight: 1, directed: this.isDirected()}) {
    assert(nodeA instanceof Node);
    assert(nodeB instanceof Node);

    let result = [];
    result.push(nodeA.addEdge(nodeB, opts));
    if (!opts.directed) {
      result.push(nodeB.addEdge(nodeA, opts));
    }

    return result;
  }

  /**
   * Calls the provided callback function for each node in the graph in the
   * order that the node was added to the graph.
   *
   * Time:  O(n)
   * Space: O(1)
   *
   * @param cb {Function} f(node, index)
   */
  forEach(cb) {
    for (let i = 0; i < this.length; i++) {
      cb(this._nodes[i], i);
    }
  }

  /**
   * Returns a generator for iterating over the nodes in the graph.
   */
  *nodes() {
    for (let i = 0; i < this.length; i++) {
      yield this._nodes[i];
    }
  }

  /**
   * Allows iteration over the graph nodes from a for of loop.
   */
  *[Symbol.iterator]() {
    yield* this.nodes();
  }
}
