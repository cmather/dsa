import assert from 'assert';
import Graph, {GraphVertex} from '../lib/graph';

describe('GraphVertex', () => {
  it('should allow adding edges', () => {
    let v = new GraphVertex('a');
    v.add(new GraphVertex('b'));
    v.add(new GraphVertex('c'));
    assert(v.degree == 2);
  });
  
  it('should allow iterating edges', () => {
    let v = new GraphVertex('a');
    v.add(new GraphVertex('b'));
    v.add(new GraphVertex('c'));

    let results = [];
    for (var edge of v) {
      results.push(edge);
    }

    assert(v.degree == 2);
    assert(results.length == 2);
    assert(results[0] == v.edges[0]);
    assert(results[1] == v.edges[1]);
  });
});

describe('Graph', () => {
  it('should load', () => assert(Graph));

  it('should construct', () => {
    let graph = new Graph();
    assert(graph);
  });

  it('should allow adding vertices', () => {
    let graph = new Graph();
    let v = new GraphVertex('a');
    graph.add(v);
    assert(graph.size == 1);
    assert(graph.vertices[0] == v);
  });

  it('should allow iterating vertices', () => {
    let graph = new Graph();
    let results = [];
    graph.add(new GraphVertex('a'));
    graph.add(new GraphVertex('b'));

    for (var v of graph) {
      results.push(v);
    }

    assert(results.length == 2);
    assert(results[0] == graph.vertices[0]);
    assert(results[1] == graph.vertices[1]);
  });
});
