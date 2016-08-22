import assert from 'assert';
import Graph from '../lib/graph';
import Dijkstra, {shortestPath} from '../lib/dijkstra';

describe("Dijkstra", () => {
  it ("should construct", () => {
    let g = new Graph;
    let start = g.add('a');
    let v = new Dijkstra(g, start);
  });
});

describe("shortestPath", () => {
  it ("should return the shortest path", () => {
    let g = new Graph({directed: true});
    let results, edge, a, b, c;

    a = g.add('a');
    b = g.add('b');
    c = g.add('c');

    g.addEdge(a, b, {weight: 3});
    g.addEdge(b, c, {weight: 3});
    g.addEdge(a, c, {weight: 7});

    results = shortestPath(g, a, c);

    assert.equal(results.length, 3, `expected 3 results in path but got ${results.length}`);

    assert.equal(results[0].distance, 0);
    assert.equal(results[0].node.value, 'a');

    assert.equal(results[1].distance, 3);
    assert.equal(results[1].node.value, 'b');

    assert.equal(results[2].distance, 6);
    assert.equal(results[2].node.value, 'c');
  });
});
