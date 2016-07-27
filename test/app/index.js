import BinarySearchTree from '../../lib/binary_search_tree';
import RedBlackTree, {NullNode} from '../../lib/red_black_tree';

window.dsa = {
  BinarySearchTree: BinarySearchTree,
  RedBlackTree: RedBlackTree,
  NullNode
};

window.tree = new RedBlackTree;
tree.insert(7);
tree.insert(3);
tree.insert(18);
tree.insert(10);
tree.insert(8);
tree.insert(11);
tree.insert(22);
tree.insert(26);

tree.inorder((node) => console.log(node.key));
