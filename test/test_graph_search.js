import assert from 'assert';
import Graph, {Vertex} from '../lib/graph';
import {EdgeTypes, VertexVisitor, bfs, dfs} from '../lib/graph_search';

describe('VertexVisitor', () => {
  it('should construct', () => {
    let v = new Vertex('b');
    let visitor = new VertexVisitor(v, {parent: 'a', entryTime: 0, exitTime: 10});
    assert(visitor);
    assert(visitor.parent == 'a');
    assert(visitor.entryTime == 0);
    assert(visitor.exitTime == 10);
    assert(visitor.isUndiscovered());
  });

  it('should have correct states', () => {
    let vertex = new Vertex('a');
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
  it('should work on directed graphs', () => {
    /*
     * a -> b
     * b -> c
     * a -> d
     * d -> c
     */

    let g = new Graph({directed: true});
    let a = g.addVertex('a');
    let b = g.addEdge(a, 'b').to;
    let c = g.addEdge(b, 'c').to;
    let d = g.addEdge(a, 'd').to;
    g.addEdge(d, c);

    let early = [];
    let late = [];
    let edges = [];

    bfs(g, a, {
      processVertexEarly: (v) => {
        early.push(v);
      },

      processVertexLate: (v) => {
        late.push(v);
      },

      processEdge: (edge, type) => {
        edges.push(edge);
      }
    });

    assert(early.length == 4);
    assert(early[0].vertex == a);
    assert(early[1].vertex == b);
    assert(early[2].vertex == d);
    assert(early[3].vertex == c);

    assert(late.length == 4);
    assert(late[0].vertex == a);
    assert(late[1].vertex == b);
    assert(late[2].vertex == d);
    assert(late[3].vertex == c);

    assert(edges.length == 4);
    assert(edges[0].from == a && edges[0].to == b);
    assert(edges[1].from == a && edges[1].to == d);
    assert(edges[2].from == b && edges[2].to == c);
    assert(edges[3].from == d && edges[3].to == c);
  });

  it('should work on undirected graphs', () => {
    /*
     * a -- b
     * b -- c
     * a -- d
     * d -- c
     */

    let g = new Graph({directed: false});
    let a = g.addVertex('a');
    let b = g.addEdge(a, 'b').to;
    let c = g.addEdge(b, 'c').to;
    let d = g.addEdge(a, 'd').to;
    g.addEdge(d, c);

    let early = [];
    let late = [];
    let edges = [];

    bfs(g, a, {
      processVertexEarly: (v) => {
        early.push(v);
      },

      processVertexLate: (v) => {
        late.push(v);
      },

      processEdge: (edge, type) => {
        edges.push(edge);
      }
    });

    assert(early.length == 4);
    assert(early[0].vertex == a);
    assert(early[1].vertex == b);
    assert(early[2].vertex == d);
    assert(early[3].vertex == c);

    assert(late.length == 4);
    assert(late[0].vertex == a);
    assert(late[1].vertex == b);
    assert(late[2].vertex == d);
    assert(late[3].vertex == c);

    assert(edges.length == 4);
    assert(edges[0].from == a && edges[0].to == b);
    assert(edges[1].from == a && edges[1].to == d);
    assert(edges[2].from == b && edges[2].to == c);
    assert(edges[3].from == d && edges[3].to == c);
  });
});

describe('dfs', () => {
  it('should work on directed graphs', () => {
    /*
     * a -> b
     * b -> c
     * a -> d
     * d -> c
     */

    let g = new Graph({directed: true});
    let a = g.addVertex('a');
    let b = g.addEdge(a, 'b').to;
    let c = g.addEdge(b, 'c').to;
    let d = g.addEdge(a, 'd').to;
    g.addEdge(d, c);

    let early = [];
    let late = [];
    let edges = [];
    let edgeTypes = [];

    dfs(g, a, {
      processVertexEarly: (v) => {
        early.push(v);
      },

      processVertexLate: (v) => {
        late.push(v);
      },

      processEdge: (edge, type) => {
        edges.push(edge);
        edgeTypes.push(type);
      }
    });

    assert(early.length == 4);
    assert(early[0].vertex == a);
    assert(early[1].vertex == b);
    assert(early[2].vertex == c);
    assert(early[3].vertex == d);

    assert(late.length == 4);
    assert(late[0].vertex == c);
    assert(late[1].vertex == b);
    assert(late[2].vertex == d);
    assert(late[3].vertex == a);

    assert(edges.length == 4);
    assert(edges[0].from == a && edges[0].to == b);
    assert(edges[1].from == b && edges[1].to == c);
    assert(edges[2].from == a && edges[2].to == d);
    assert(edges[3].from == d && edges[3].to == c);

    assert(edgeTypes[0] == EdgeTypes.TREE);
    assert(edgeTypes[1] == EdgeTypes.TREE);
    assert(edgeTypes[2] == EdgeTypes.TREE);
    assert(edgeTypes[3] == EdgeTypes.CROSS);
  });

  it('should work on undirected graphs', () => {
    /*
     * a -- b
     * b -- c
     * a -- d
     * d -- c
     */

    let g = new Graph({directed: false});
    let a = g.addVertex('a');
    let b = g.addEdge(a, 'b').to;
    let c = g.addEdge(b, 'c').to;
    let d = g.addEdge(a, 'd').to;
    g.addEdge(d, c);

    let early = [];
    let late = [];
    let edges = [];
    let edgeTypes = [];

    dfs(g, a, {
      processVertexEarly: (v) => {
        early.push(v);
      },

      processVertexLate: (v) => {
        late.push(v);
      },

      processEdge: (edge, type) => {
        edges.push(edge);
        edgeTypes.push(type);
      }
    });

    assert(early.length == 4);
    assert(early[0].vertex == a);
    assert(early[1].vertex == b);
    assert(early[2].vertex == c);
    assert(early[3].vertex == d);

    assert(late.length == 4);
    assert(late[0].vertex == d);
    assert(late[1].vertex == c);
    assert(late[2].vertex == b);
    assert(late[3].vertex == a);

    assert(edges.length == 4);
    assert(edges[0].from == a && edges[0].to == b);
    assert(edges[1].from == b && edges[1].to == c);
    assert(edges[2].from == c && edges[2].to == d);
    assert(edges[3].from == d && edges[3].to == a);

    assert(edgeTypes[0] == EdgeTypes.TREE);
    assert(edgeTypes[1] == EdgeTypes.TREE);
    assert(edgeTypes[2] == EdgeTypes.TREE);
    assert(edgeTypes[3] == EdgeTypes.BACK);
  });
});
