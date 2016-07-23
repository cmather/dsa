import assert from 'assert';

var nextId = (function nextId() {
  var id = 0;
  return function () {
    return id++;
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
    this.id = opts.id || nextId();
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

  toKey() {
    return this.id;
  }

  *[Symbol.iterator]() {
    for (var i = 0; i < this.degree; i++) {
      yield this.edges[i];
    }
  }
}

export default class Graph {
  get size() {
    return this.vertices.length;
  }

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
    for (let i = 0; i < this.size; i++) {
      yield this.vertices[i];
    }
  }
}
