import assert from 'assert';
import Graph, {GraphVertex} from '../lib/graph';
import {EdgeClassifications, VertexVisitor, bfs, dfs} from '../lib/graph_search';

describe('VertexVisitor', () => {
  it('should construct', () => {
    let v = new GraphVertex('b');
    let visitor = new VertexVisitor(v, {parent: 'a', entryTime: 0, exitTime: 10});
    assert(visitor);
    assert(visitor.parent == 'a');
    assert(visitor.entryTime == 0);
    assert(visitor.exitTime == 10);
    assert(visitor.isUndiscovered());
  });

  it('should have correct states', () => {
    let vertex = new GraphVertex('a');
    let v = new VertexVisitor(v, {parent: 'a', entryTime: 0, exitTime: 10});
    assert(v.isUndiscovered());
    v.setDiscovered();
    assert(v.isDiscovered());
    v.setProcessed();
    assert(v.isProcessed());
    assert(v.isDiscovered());
  });
});

describe('bfs', () => {
  it('should search breadth first', () => {
    /*
     * a -> b
     * b -> c
     * a -> d
     * d -> c
     */
    let a = new GraphVertex('a');
    let b = new GraphVertex('b');
    let c = new GraphVertex('c');
    let d = new GraphVertex('d');

    a.add(b);
    b.add(c);
    a.add(d);
    d.add(c);

    let g = new Graph;
    g.add(a);
    g.add(b);
    g.add(c);
    g.add(d);

    var results = [];

    bfs(g, a, {
      processVertexEarly: (v) => {
        results.push(v);
      },

      processVertexLate: (v) => {
      },

      processEdge: (x, y, type) => {
      }
    });

    // a, b, d, c
    assert(results.length == 4);
    assert(results[0].vertex == a);
    assert(results[1].vertex == b);
    assert(results[2].vertex == d);
    assert(results[3].vertex == c);
  });
});

describe('dfs', () => {
  it('should search depth first', () => {
    /*
     * a -> b
     * b -> c
     * a -> d
     * d -> c
     */
    let a = new GraphVertex('a');
    let b = new GraphVertex('b');
    let c = new GraphVertex('c');
    let d = new GraphVertex('d');

    a.add(b);
    b.add(c);
    a.add(d);
    d.add(c);

    let g = new Graph;
    g.add(a);
    g.add(b);
    g.add(c);
    g.add(d);

    var results = [];
    var edgeClassifications = [];

    dfs(g, a, {
      processVertexEarly: (v) => {
        results.push(v);
      },

      processVertexLate: (v) => {
      },

      processEdge: (x, y, type) => {
        edgeClassifications.push(type);
      }
    });

    // a, b, d, c
    assert(results.length == 4);
    assert(results[0].vertex == a);
    assert(results[1].vertex == b);
    assert(results[2].vertex == c);
    assert(results[3].vertex == d);

    assert(edgeClassifications[0] == EdgeClassifications.TREE);
    assert(edgeClassifications[1] == EdgeClassifications.TREE);
    assert(edgeClassifications[2] == EdgeClassifications.TREE);
    assert(edgeClassifications[3] == EdgeClassifications.CROSS);
  });
});
