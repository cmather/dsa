import assert from 'assert';
import Graph from '../lib/graph';
import Dijkstra, {shortestPath} from '../lib/dijkstra';

describe("Dijkstra", () => {
  it ("should construct", () => {
    let g = new Graph;
    let start = g.addVertex('a');
    let v = new Dijkstra(g, start);
  });
});

describe("shortestPath", () => {
  it ("should return the shortest path", () => {
    let g = new Graph({directed: true});
    let results, edge, a, b, c;

    a = g.addVertex('a');
    edge = a.addEdge('b', {weight: 3});
    b = edge.to;
    edge = b.addEdge('c', {weight: 3});
    c = edge.to;
    a.addEdge(c, {weight: 7});

    results = shortestPath(g, a, c);

    assert.equal(results.length, 3, `expected 3 results in path but got ${results.length}`);

    assert.equal(results[0].distance, 0);
    assert.equal(results[0].vertex.value, 'a');

    assert.equal(results[1].distance, 3);
    assert.equal(results[1].vertex.value, 'b');

    assert.equal(results[2].distance, 6);
    assert.equal(results[2].vertex.value, 'c');
  });
});
