import Queue from '../../lib/queue';
import Stack from '../../lib/stack';
import Graph from '../../lib/graph';
import {bfs, dfs} from '../../lib/graph_search';
import MinHeap from '../../lib/min_heap';
import MaxHeap from '../../lib/max_heap';
import MinPriorityQueue from '../../lib/min_priority_queue';
import BinarySearchTree from '../../lib/binary_search_tree';
import RedBlackTree, {NullNode} from '../../lib/red_black_tree';
import Dijkstra, {shortestPath} from '../../lib/dijkstra';

window.dsa = {
  Queue: Queue,
  Stack: Stack,
  Graph: Graph,
  bfs: bfs,
  dfs: dfs,
  BinarySearchTree: BinarySearchTree,
  RedBlackTree: RedBlackTree,
  MinHeap: MinHeap,
  MaxHeap: MaxHeap,
  MinPriorityQueue: MinPriorityQueue,
  Dijkstra: Dijkstra,
  shortestPath: shortestPath
};
