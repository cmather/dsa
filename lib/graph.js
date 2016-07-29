import assert from 'assert';

var nextKey = (function nextId() {
  var key = 0;
  return function () {
    return key++;
  }
})();

export class Edge {
  constructor(from, to, opts={weight: 1}) {
    assert(from instanceof Vertex, 'from is not a Vertex');
    this.from = from;
    this.to = to;
    this.weight = opts.weight;
  }
}

export class Vertex {
  get degree() {
    return this.edges.length;
  }

  constructor(value, opts={}) {
    if (typeof opts.key !== 'undefined')
      this.__hashKey__ = opts.key;
    else if (value && typeof value.toHashKey == 'function')
      this.__hashKey__ = value.toHashKey();
    else
      this.__hashKey__ = nextKey();

    this.value = value;
    this.edges = [];
  }

  addEdge(value, opts = {weight: 1}) {
    if (value instanceof Vertex) {
      value = new Edge(this, value, opts);
    } else if (!(value instanceof Edge)) {
      let vertex = new Vertex(value, opts);
      value = new Edge(this, vertex, opts);
    }

    this.edges.push(value);
    return value;
  }

  toHashKey() {
    return this.__hashKey__;
  }

  *[Symbol.iterator]() {
    for (var i = 0; i < this.degree; i++) {
      yield this.edges[i];
    }
  }
}

export default class Graph {
  get length() {
    return this.vertices.length;
  }

  constructor(opts = {directed: false}) {
    this.opts = opts;
    this.vertices = [];
  }

  isDirected() {
    return this.opts.directed;
  }

  addVertex(x, opts = {}) {
    x = x instanceof Vertex ? x : new Vertex(x);
    this.vertices.push(x);
    return x;
  }

  addEdge(x, y, opts = {weight: 1, directed: this.isDirected()}) {
    x = x instanceof Vertex ? x : new Vertex(x);
    y = y instanceof Vertex ? y : new Vertex(y);

    this.addVertex(x);
    let edge = x.addEdge(y, opts);

    if (!opts.directed)
      this.addEdge(y, x, Object.assign(opts, {directed: true}));

    return edge;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this.vertices[i];
    }
  }
}
