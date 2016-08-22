import assert from 'assert';
import Graph, {Node, Edge} from '../lib/graph';

describe("Node", () => {
  it ("should construct", () => {
    let g = new Graph;
    let v = new Node(g, 'a');
  });

  it ("should provide iteration over edges", () => {
    let g = new Graph;
    let a = new Node(g, 'a');
    let b = new Node(g, 'b');
    a.addEdge(b);
    let results = [];
    for (let edge of a) {
      results.push(edge);
    }
    assert.equal(results.length, 1);
    assert.equal(results[0].from, a);
    assert.equal(results[0].to, b);
  });
});

describe ("Graph", () => {
  it ("should construct", () => {
    let g = new Graph;
  });

  it ("should allow adding nodes", () => {
    let g = new Graph();
    g.add('a');
    assert.equal(g.length, 1);
    assert.equal(g.size, 1);
  });

  it ("should allow iteration of nodes with for of loop", () => {
    let g = new Graph;
    let a = g.add('a');
    let b = g.add('b');
    let results = [];
    let expected = ['a', 'b'];
    assert.equal(g.size, 2, 'graph size should be 2');
    for (let node of g) results.push(node);
    assert.equal(results.length, 2, 'should have 2 results');
    results.forEach((node, idx) => assert.equal(node.value, expected[idx]));
  });

  it ("should allow iteration of nodes with forEach", () => {
    let g = new Graph;
    let a = g.add('a');
    let b = g.add('b');
    let results = [];
    let expected = [a, b];
    g.forEach((node, idx) => assert.equal(node, expected[idx]));
  });

  it ("should allow iteration of nodes with generator", () => {
    let g = new Graph;
    let a = g.add('a');
    let b = g.add('b');
    let results = [];
    let idx = 0;
    let iter = g.nodes();
    let cur = iter.next();

    let expected = [a, b];
    while (!cur.done) {
      assert.equal(cur.value, expected[idx++]);
      cur = iter.next();
    }
  });

  it ("should allow adding undirected edges", () => {
    let g = new Graph;
    let a = g.add('a');
    let b = g.add('b');
    let edge = g.addEdge(a, b);

    let expected = [{
      value: 'a',
      degree: 1,
      edges: [{from: a, to: b}]
    }, {
      value: 'b',
      degree: 1,
      edges: [{from: b, to: a}]
    }];

    assert.equal(g.size, 2);

    g.forEach((node, i) => {
      assert.equal(node.value, expected[i].value);
      assert.equal(node.degree, expected[i].edges.length);
      node.forEach((edge, j) => {
        assert.equal(edge.from, expected[i].edges[j].from);
        assert.equal(edge.to, expected[i].edges[j].to);
      });
    });
  });

  it ("should allow adding directed edges", () => {
    let g = new Graph({directed: true});
    let a = g.add('a');
    let b = g.add('b');
    let edge = g.addEdge(a, b);

    let expected = [{
      value: 'a',
      degree: 1,
      edges: [{from: a, to: b}]
    }, {
      value: 'b',
      degree: 1,
      edges: []
    }];

    assert.equal(g.size, 2);

    g.forEach((node, i) => {
      assert.equal(node.value, expected[i].value);
      assert.equal(node.degree, expected[i].edges.length);
      node.forEach((edge, j) => {
        assert.equal(edge.from, expected[i].edges[j].from);
        assert.equal(edge.to, expected[i].edges[j].to);
      });
    });
  });
});
