import assert from 'assert';
import {VertexVisitor, GraphSearch} from './graph_search';
import MinPriorityQueue from './min_priority_queue';
import compare from './compare';

export default class Dijkstra extends GraphSearch {
  reset() {
    super.reset();
    this.traversed = false;
  }

  initialize() {
    this.reset();

    this.queue = new MinPriorityQueue({
      compare: ((a, b) => compare(a && a.distance, b && b.distance))
    });

    let start = this.visitorFor(this.start);
    start.distance = 0;

    // store the heap node so we can update it if our distance changes.
    start.heapNode = this.queue.enqueue(start);

    start.setDiscovered();

    let vertex, edge, visitor;
    for (vertex of this.graph.allVertices()) {
      visitor = this.visitorFor(vertex)

      if (!visitor.isDiscovered()) {
        visitor.setDiscovered();
        visitor.distance = Infinity;
        visitor.heapNode = this.queue.enqueue(visitor);
      }
    }
  }

  traverse(destination) {
    let visitor, edge;

    this.initialize();

    while (visitor = this.queue.dequeue()) {
      this.processVertexEarly(visitor);
      for (edge of visitor.vertex) {
        this.processEdge(edge);
        this.relax(edge);
      }
      this.processVertexLate(visitor);
      visitor.setProcessed();
    }

    this.traversed = true;
  }

  relax(edge) {
    let fromVisitor = this.visitorFor(edge.from);
    let toVisitor = this.visitorFor(edge.to);
    let weight = edge.weight;
    let distance = fromVisitor.distance + weight;

    if (toVisitor.distance > distance) {
      toVisitor.distance = distance;
      toVisitor.parent = fromVisitor;
      toVisitor.heapNode.update();
    }
  }

  shortestPath(destination) {
    if (!this.traversed) this.traverse(destination);

    let finish = this.visitorFor(destination);
    let visitor = finish;
    let path = [];

    while (visitor) {
      path.unshift(visitor);
      visitor = visitor.parent;
    }

    return path;
  }
}

export function shortestPath(graph, start, dest, opts={}) {
  let search = new Dijkstra(graph, start, opts);
  let paths = search.shortestPath(dest);
  return paths;
}
