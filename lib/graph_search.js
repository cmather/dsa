import assert from 'assert';
import Queue from './queue';
import Graph, {Node} from './graph';

export const NodeStates = {
  UNDISCOVERED: 'undiscovered',
  DISCOVERED: 'discovered',
  PROCESSED: 'processed'
};

export const EdgeTypes = {
  TREE: 'tree',
  BACK: 'back',
  FORWARD: 'forward',
  CROSS: 'cross',
  UNKNOWN: 'unknown'
};

export class NodeVisitor {
  constructor(node, opts = {parent: null, entryTime: null, exitTime: null}) {
    this.node = node;
    this.parent = opts.parent;
    this.entryTime = opts.entryTime;
    this.exitTime = opts.exitTime;
    this.setUndiscovered();
  }

  isProcessed() {
    return this.state == NodeStates.PROCESSED;
  }

  isDiscovered() {
    return this.state == NodeStates.DISCOVERED || this.isProcessed();
  }

  isUndiscovered() {
    return this.state == NodeStates.UNDISCOVERED;
  }

  setDiscovered() {
    this.state = NodeStates.DISCOVERED;
  }

  setProcessed() {
    this.state = NodeStates.PROCESSED;
  }

  setUndiscovered() {
    this.state = NodeStates.UNDISCOVERED;
  }
}

export class GraphSearch {
  constructor(graph, start, opts = {}) {
    this.graph = graph;
    this.start = start;
    this.processNodeEarly = opts.processNodeEarly || (() => {});
    this.processNodeLate = opts.processNodeLate || (() => {});
    this.processEdge = opts.processEdge || (() => {});
    this.reset();
  }

  reset() {
    this.visited = {};
  }

  visitorFor(node) {
    assert(node, 'no node provided to visitorFor');
    let key = node.toHashKey();
    if (!this.visited[key]) this.visited[key] = new NodeVisitor(node);
    return this.visited[key];
  }

  traverse() {
    throw new Error('not implemented');
  }
}

export class BreadthFirstSearch extends GraphSearch {
  reset() {
    super.reset();
    this.queue = new Queue;
  }

  traverse(parent = this.start) {
    let visitor = this.visitorFor(parent);
    visitor.setDiscovered();
    this.queue.enqueue(parent);

    while (parent = this.queue.dequeue()) {
      visitor = this.visitorFor(parent);
      this.processNodeEarly(visitor);
      visitor.setProcessed();

      for (var edge of parent) {
        let childVisitor = this.visitorFor(edge.to);

        if (!childVisitor.isProcessed() || this.graph.isDirected()) {
          this.processEdge(edge);
        }

        if (childVisitor.isUndiscovered()) {
          this.queue.enqueue(edge.to);
          childVisitor.setDiscovered();
          childVisitor.parent = visitor;
        }
      }

      this.processNodeLate(visitor);
    }
  }
}

export function bfs(graph, start, opts={}) {
  let search = new BreadthFirstSearch(graph, start, opts);
  search.traverse();
  return search;
}

export class DepthFirstSearch extends GraphSearch {
  reset() {
    super.reset();
    this.time = 0;
  }

  nextTime() {
    this.time++;
    return this.time;
  }

  traverse(parent = this.start) {
    let visitor = this.visitorFor(parent);

    visitor.setDiscovered();
    visitor.entryTime = this.nextTime();
    this.processNodeEarly(visitor);

    for (let edge of parent) {
      let childVisitor = this.visitorFor(edge.to);

      if (!childVisitor.isDiscovered()) {
        childVisitor.parent = visitor;
        this.processEdge(edge, this.classifyEdge(visitor, childVisitor));
        this.traverse(edge.to);
      } else if ((!childVisitor.isProcessed() && visitor.parent !== childVisitor) || this.graph.isDirected()) {
        this.processEdge(edge, this.classifyEdge(visitor, childVisitor));
      }
    }

    visitor.exitTime = this.nextTime();
    this.processNodeLate(visitor);
    visitor.setProcessed();
  }

  classifyEdge(visitorFrom, visitorTo) {
    if (visitorTo.parent == visitorFrom) return EdgeTypes.TREE;
    if (visitorTo.isDiscovered() && !visitorTo.isProcessed()) return EdgeTypes.BACK;
    if (visitorTo.isProcessed() && visitorTo.entryTime > visitorFrom.entryTime) return EdgeTypes.FORWARD;
    if (visitorTo.isProcessed() && visitorTo.entryTime < visitorFrom.entryTime) return EdgeTypes.CROSS;
    else
      return EdgeTypes.UNKNOWN;
  }
}

export function dfs(graph, start, opts={}) {
  let search = new DepthFirstSearch(graph, start, opts);
  search.traverse();
  return search;
}
