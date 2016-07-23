import assert from 'assert';

var nextId = (function nextId() { 
  var id = 0;
  return function () {
    return id++;
  }
})();

export class GraphVertex {
  get degree() {
    return this.edges.length;
  }

  get size() {
    return this.degree;
  }

  constructor(value, opts={weight: 1, id: nextId()}) {
    assert(value, "GraphVertex value is undefined which isn't allowed.");
    this.id = opts.id;
    this.value = value;
    this.edges = [];
  }

  add(vertex) {
    vertex = vertex instanceof GraphVertex ? vertex : new GraphVertex(vertex);
    this.edges.push(vertex);
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

  constructor(opts = {directed: true}) {
    this.opts = opts;
    this.vertices = [];
  }

  isDirected() {
    return this.opts.directed;
  }

  add(vertex) {
    vertex = vertex instanceof GraphVertex ? vertex : new GraphVertex(vertex);
    this.vertices.push(vertex);
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.size; i++) {
      yield this.vertices[i];
    }
  }
}
