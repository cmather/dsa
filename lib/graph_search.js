import assert from 'assert';
import Queue from './queue';

export const VertexStates = {
  UNDISCOVERED: Symbol('undiscovered'),
  DISCOVERED: Symbol('discovered'),
  PROCESSED: Symbol('processed')
};

export const EdgeTypes = {
  TREE: 'tree',
  BACK: 'back',
  FORWARD: 'forward',
  CROSS: 'cross',
  UNKNOWN: 'unknown'
};

export class VertexVisitor {
  constructor(vertex, opts = {parent: null, entryTime: null, exitTime: null}) {
    this.vertex = vertex;
    this.parent = opts.parent;
    this.entryTime = opts.entryTime;
    this.exitTime = opts.exitTime;
    this.setUndiscovered();
  }

  isProcessed() {
    return this.state == VertexStates.PROCESSED;
  }

  isDiscovered() {
    return this.state == VertexStates.DISCOVERED || this.isProcessed();
  }

  isUndiscovered() {
    return this.state == VertexStates.UNDISCOVERED;
  }

  setDiscovered() {
    this.state = VertexStates.DISCOVERED;
  }

  setProcessed() {
    this.state = VertexStates.PROCESSED;
  }

  setUndiscovered() {
    this.state = VertexStates.UNDISCOVERED;
  }
}

export class GraphSearch {
  constructor(graph, start, opts = {}) {
    this.graph = graph;
    this.start = start;
    this.processVertexEarly = opts.processVertexEarly || (() => {});
    this.processVertexLate = opts.processVertexLate || (() => {});
    this.processEdge = opts.processEdge || (() => {});
    this.reset();
  }

  reset() {
    this.visited = {};
  }

  visitorFor(vertex) {
    assert(vertex, 'no vertex provided to visitorFor');
    let key = vertex.toKey();
    if (!this.visited[key]) this.visited[key] = new VertexVisitor(vertex);
    return this.visited[key];
  }

  traverse() {
    throw new Error('not implemented');
  }
}

class BreadthFirstSearch extends GraphSearch {
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
      this.processVertexEarly(visitor);
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

      this.processVertexLate(visitor);
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
    this.processVertexEarly(visitor);

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
    this.processVertexLate(visitor);
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
