import Queue from './queue';

export const VertexStates = {
  UNDISCOVERED: Symbol('undiscovered'),
  DISCOVERED: Symbol('discovered'),
  PROCESSED: Symbol('processed')
};

export const EdgeClassifications = {
  TREE: Symbol('tree'),
  BACK: Symbol('back'),
  FORWARD: Symbol('forward'),
  CROSS: Symbol('cross'),
  UNKNOWN: Symbol('unknown')
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
    for (var vertex of this.graph) {
      this.visited[vertex.toKey()] = new VertexVisitor(vertex);
    }
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

  traverse(vertex = this.start) {
    let vertexVisitor = this.visited[vertex.toKey()];
    vertexVisitor.setDiscovered();
    this.queue.enqueue(vertex);

    while (vertex = this.queue.dequeue()) {
      vertexVisitor = this.visited[vertex.toKey()];
      this.processVertexEarly(vertexVisitor);
      vertexVisitor.setProcessed();

      for (var edge of vertex) {
        let edgeVisitor = this.visited[edge.toKey()];

        if (!edgeVisitor.isProcessed() || this.graph.isDirected()) {
          this.processEdge(vertexVisitor, edgeVisitor);
        }
        
        if (edgeVisitor.isUndiscovered()) {
          this.queue.enqueue(edge);
          edgeVisitor.setDiscovered();
          edgeVisitor.parent = vertexVisitor;
        }
      }

      this.processVertexLate(vertexVisitor);
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

  traverse(vertex = this.start) {
    let vertexVisitor = this.visited[vertex.toKey()];

    vertexVisitor.setDiscovered();
    vertexVisitor.entryTime = this.nextTime();

    this.processVertexEarly(vertexVisitor);

    for (let edge of vertex) {
      let edgeVisitor = this.visited[edge.toKey()];
      if (!edgeVisitor.isDiscovered()) {
        edgeVisitor.parent = vertexVisitor;
        let edgeType = this.classifyEdge(vertexVisitor, edgeVisitor);
        this.processEdge(vertexVisitor, edgeVisitor, edgeType);
        this.traverse(edge);
      } else if ((!edgeVisitor.isProcessed() && vertexVisitor.parent !== edgeVisitor) || this.graph.isDirected()) {
        let edgeType = this.classifyEdge(vertexVisitor, edgeVisitor);
        this.processEdge(vertexVisitor, edgeVisitor, edgeType);
      }
    }

    vertexVisitor.exitTime = this.nextTime();
    this.processVertexLate(vertexVisitor);
    vertexVisitor.setProcessed();
  }

  classifyEdge(x, y) {
    if (y.parent == x) return EdgeClassifications.TREE;
    if (y.isDiscovered() && !y.isProcessed()) return EdgeClassifications.BACK;
    if (y.isProcessed() && y.entryTime > x.entryTime) return EdgeClassifications.FORWARD;
    if (y.isProcessed() && y.entryTime < x.entryTime) return EdgeClassifications.CROSS;
    else
      return EdgeClassifications.UNKNOWN;
  }
}

export function dfs(graph, start, opts={}) {
  let search = new DepthFirstSearch(graph, start, opts);
  search.traverse();
  return search;
}
