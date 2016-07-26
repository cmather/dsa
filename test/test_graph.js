import assert from 'assert';
import Graph, {Vertex, Edge} from '../lib/graph';

describe("Vertex", () => {
  it ("should construct", () => {
    let v = new Vertex('a');
  });

  it ("should allow adding edges of raw values", () => {
    let v = new Vertex('a');
    v.addEdge('b');
    v.addEdge('c');
    assert(v.degree == 2);
    assert(v.edges[0].to.value == 'b');
    assert(v.edges[1].to.value == 'c');
  });

  it ("should allow adding edge of type Vertex", () => {
    let a = new Vertex('a');
    let b = new Vertex('b');
    a.addEdge(b);
    assert(a.degree == 1);
    assert(a.edges[0].to == b);
  });

  it ("should allow adding edges of type Edge", () => {
    let a = new Vertex('a');
    let b = new Vertex('b');
    let edge = new Edge(a, b);
    a.addEdge(edge);
    assert(a.degree == 1);
    assert(a.edges[0].to == b);
  });

  it ("should allow an explicitly set null key as an option", () => {
    let v = new Vertex(null, {key: null});
    assert(v.key == null, `v.key is ${v.key} instead of null.`);
  });
});

describe("Graph", () => {
  it ("should construct", () => {
    let g = new Graph;
  });

  it ("should allow adding undirected edges", () => {
    let g = new Graph;
    g.addEdge('a', 'b');
    assert(g.size == 2);
    assert(g.vertices[0].value == 'a');
    assert(g.vertices[0].degree == 1);
    assert(g.vertices[0].edges[0].to.value == 'b');
    assert(g.vertices[1].value == 'b');
    assert(g.vertices[1].degree == 1);
    assert(g.vertices[1].edges[0].to.value == 'a');
  });

  it ("should allow adding directed edges", () => {
    let g = new Graph({directed: true});
    g.addEdge('a', 'b');
    assert(g.size == 1);
    assert(g.vertices[0].value == 'a');
    assert(g.vertices[0].degree == 1);
    assert(g.vertices[0].edges[0].to.value == 'b');
  });

  it ("should allow adding vertices", () => {
    let g = new Graph();
    g.addVertex('a');
    assert(g.size == 1);
    assert(g.vertices[0].value == 'a');
  });

  it ("should allow iterating vertices", () => {
    let g = new Graph();
    g.addVertex('a');
    g.addVertex('b');
    g.addVertex('c');

    let results = [];
    for (var v of g) {
      results.push(v && v.value);
    }

    assert(results.length == 3);
    assert(results[0] == 'a');
    assert(results[1] == 'b');
    assert(results[2] == 'c');
  });
});
