import Queue from '../../lib/queue';
import Stack from '../../lib/stack';
import Graph from '../../lib/graph';
import HashTable from '../../lib/hash_table';
import {bfs, dfs} from '../../lib/graph_search';
import MinHeap from '../../lib/min_heap';
import MaxHeap from '../../lib/max_heap';
import MinPriorityQueue from '../../lib/min_priority_queue';
import BinaryTree, {BinaryNode} from '../../lib/binary_tree';
import BinarySearchTree from '../../lib/binary_search_tree';
import RedBlackTree, {RBNullNode} from '../../lib/red_black_tree';
import Dijkstra, {shortestPath} from '../../lib/dijkstra';
import {selectionSort, bubbleSort, quickSort} from '../../lib/sort';
import compare from '../../lib/compare';

window.dsa = {
  compare: compare,
  Queue: Queue,
  Stack: Stack,
  Graph: Graph,
  HashTable: HashTable,
  bfs: bfs,
  dfs: dfs,
  BinaryTree: BinaryTree,
  BinarySearchTree: BinarySearchTree,
  RedBlackTree: RedBlackTree,
  MinHeap: MinHeap,
  MaxHeap: MaxHeap,
  MinPriorityQueue: MinPriorityQueue,
  Dijkstra: Dijkstra,
  shortestPath: shortestPath,
  selectionSort: selectionSort,
  bubbleSort: bubbleSort,
  quickSort: quickSort
};
