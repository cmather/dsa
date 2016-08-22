import assert from 'assert';
import Graph, {Node} from '../lib/graph';
import {EdgeTypes, NodeVisitor, bfs, dfs} from '../lib/graph_search';

function makeGraph(directed = true) {
  let g = new Graph({directed: directed});

  let a = g.add('a');
  let b = g.add('b');
  let c = g.add('c');
  let d = g.add('d');

  /*
   * a -> b
   * b -> c
   * a -> d
   * d -> c
   */
  g.addEdge(a, b);
  g.addEdge(b, c);
  g.addEdge(a, d);
  g.addEdge(d, c);

  return {
    graph: g,
    a: a,
    b: b,
    c: c,
    d: d
  };
}

describe('NodeVisitor', () => {
  it('should construct', () => {
    let g = new Graph;
    let v = new Node(g, 'b');
    let visitor = new NodeVisitor(v, {parent: 'a', entryTime: 0, exitTime: 10});
    assert(visitor);
    assert(visitor.parent == 'a');
    assert(visitor.entryTime == 0);
    assert(visitor.exitTime == 10);
    assert(visitor.isUndiscovered());
  });

  it('should have correct states', () => {
    let g = new Graph;
    let vertex = new Node(g, 'a');
    let v = new NodeVisitor(v, {parent: 'a', entryTime: 0, exitTime: 10});
    assert(v.isUndiscovered());
    v.setDiscovered();
    assert(v.isDiscovered());
    v.setProcessed();
    assert(v.isProcessed());
    assert(v.isDiscovered());
  });
});

describe('bfs', () => {
  it ('should work on directed graphs', () => {
    let data = makeGraph();
    let g = data.graph;
    let early = [];
    let late = [];
    let edges = [];

    bfs(g, data.a, {
      processNodeEarly: (v) => {
        early.push(v);
      },

      processNodeLate: (v) => {
        late.push(v);
      },

      processEdge: (edge, type) => {
        edges.push(edge);
      }
    });

    assert(early.length == 4);
    assert(early[0].node == data.a);
    assert(early[1].node == data.b);
    assert(early[2].node == data.d);
    assert(early[3].node == data.c);

    assert(late.length == 4);
    assert(late[0].node == data.a);
    assert(late[1].node == data.b);
    assert(late[2].node == data.d);
    assert(late[3].node == data.c);

    assert(edges.length == 4);
    assert(edges[0].from == data.a && edges[0].to == data.b);
    assert(edges[1].from == data.a && edges[1].to == data.d);
    assert(edges[2].from == data.b && edges[2].to == data.c);
    assert(edges[3].from == data.d && edges[3].to == data.c);
  });

  it ('should work on undirected graphs', () => {
    let data = makeGraph(false);
    let g = data.graph;
    let early = [];
    let late = [];
    let edges = [];

    bfs(g, data.a, {
      processNodeEarly: (v) => {
        early.push(v);
      },

      processNodeLate: (v) => {
        late.push(v);
      },

      processEdge: (edge, type) => {
        edges.push(edge);
      }
    });

    assert(early.length == 4);
    assert(early[0].node == data.a);
    assert(early[1].node == data.b);
    assert(early[2].node == data.d);
    assert(early[3].node == data.c);

    assert(late.length == 4);
    assert(late[0].node == data.a);
    assert(late[1].node == data.b);
    assert(late[2].node == data.d);
    assert(late[3].node == data.c);

    assert(edges.length == 4);
    assert(edges[0].from == data.a && edges[0].to == data.b);
    assert(edges[1].from == data.a && edges[1].to == data.d);
    assert(edges[2].from == data.b && edges[2].to == data.c);
    assert(edges[3].from == data.d && edges[3].to == data.c);
  });
});

describe('dfs', () => {
  it ('should work on directed graphs', () => {
    let data = makeGraph(true);
    let g = data.graph;
    let early = [];
    let late = [];
    let edges = [];
    let edgeTypes = [];

    dfs(g, data.a, {
      processNodeEarly: (v) => {
        early.push(v);
      },

      processNodeLate: (v) => {
        late.push(v);
      },

      processEdge: (edge, type) => {
        edges.push(edge);
        edgeTypes.push(type);
      }
    });

    assert(early.length == 4);
    [
      data.a,
      data.b,
      data.c,
      data.d
    ].forEach((node, idx) => {
      assert.equal(node, early[idx].node);
    });

    assert(late.length == 4);
    [
      data.c,
      data.b,
      data.d,
      data.a
    ].forEach((node, idx) => {
      assert.equal(node, late[idx].node);
    });

    assert(edges.length == 4);
    [
      data.a,
      data.b,
      data.a,
      data.d
    ].forEach((node, idx) => {
      assert.equal(node, edges[idx].from);
    });

    [
      data.b,
      data.c,
      data.d,
      data.c
    ].forEach((node, idx) => {
      assert.equal(node, edges[idx].to);
    });
    
    [
      EdgeTypes.TREE,
      EdgeTypes.TREE,
      EdgeTypes.TREE,
      EdgeTypes.CROSS
    ].forEach((edgeType, idx) => assert.equal(edgeType, edgeTypes[idx]));
  });

  it('should work on undirected graphs', () => {
    let data = makeGraph(false);
    let g = data.graph;
    let early = [];
    let late = [];
    let edges = [];
    let edgeTypes = [];

    dfs(g, data.a, {
      processNodeEarly: (v) => {
        early.push(v);
      },

      processNodeLate: (v) => {
        late.push(v);
      },

      processEdge: (edge, type) => {
        edges.push(edge);
        edgeTypes.push(type);
      }
    });

    assert(early.length == 4);
    [
      data.a,
      data.b,
      data.c,
      data.d
    ].forEach((node, idx) => {
      assert.equal(node, early[idx].node);
    });


    assert(late.length == 4);
    [
      data.d,
      data.c,
      data.b,
      data.a
    ].forEach((node, idx) => {
      assert.equal(node, late[idx].node);
    });

    assert(edges.length == 4);
    [
      data.a,
      data.b,
      data.c,
      data.d
    ].forEach((node, idx) => {
      assert.equal(node, edges[idx].from);
    });

    [
      data.b,
      data.c,
      data.d,
      data.a
    ].forEach((node, idx) => {
      assert.equal(node, edges[idx].to);
    });

    [
      EdgeTypes.TREE,
      EdgeTypes.TREE,
      EdgeTypes.TREE,
      EdgeTypes.BACK
    ].forEach((edgeType, idx) => assert.equal(edgeType, edgeTypes[idx]));
  });
});
