import assert from 'assert';
import RedBlackTree, {RedBlackTreeNode, NullNode} from '../lib/red_black_tree';

function constructTree() {
  let tree = new RedBlackTree;

  tree.insert(5);

  tree.insert(2);
  tree.insert(1);
  tree.insert(3);

  tree.insert(8);
  tree.insert(7);
  tree.insert(9);

  return tree;
}

describe("NullNode", () => {
  it ("should have a null key and be black", () => {
    assert(NullNode.color == 'black', `NullNode.color is ${NullNode.color}`);
    assert(NullNode.key == null, `NullNode.key is ${NullNode.key}`);
  });
});

describe("RedBlackTreeNode", () => {
  it ("should set correct default left, right and color", () => {
    let t = new RedBlackTree;
    let node = t.insert(5);
    assert(node.left == NullNode);
    assert(node.right == NullNode);
    assert(node.color == 'red');
  });
});

describe("RedBlackTree", () => {
  it ("should construct", () => {
    let t = new RedBlackTree;
  });

  it ("should return a node on insert", () => {
    let tree = new RedBlackTree;

    // root
    let result = tree.insert(5);
    assert(result instanceof RedBlackTreeNode);

    // left
    result = tree.insert(4);
    assert(result instanceof RedBlackTreeNode);

    // right
    result = tree.insert(6);
    assert(result instanceof RedBlackTreeNode);
  });

  it ("should insert in the correct position", () => {
    let tree = constructTree();

    assert(tree.root.value == 5);

    // left subtree
    assert(tree.root.left.value == 2);
    assert(tree.root.left.left.value == 1);
    assert(tree.root.left.right.value == 3);

    // right subtree
    assert(tree.root.right.value == 8);
    assert(tree.root.right.left.value == 7);
    assert(tree.root.right.right.value == 9);
  });

  it ("should provide rotateLeft", () => {

    let tree;
    let root;
    let pivot;
    let child;
    let parent;


    /* Case 1: node is the root
     *
     *      10                    20
     *     /  \                  /  \
     *    5   20       ===>     10  30
     *       /  \              /  \
     *      15  30            5   15
     */

    tree = new RedBlackTree;

    root = tree.insert(10);
    pivot = tree.insert(20);
    child = tree.insert(15);

    tree.insert(5);
    tree.insert(30);

    tree.rotateLeft(root);

    assert(tree.root == pivot, `tree.root is ${tree.root.key}, not ${pivot.key}`)
    assert(pivot.left == root, `pivot.left is ${pivot.left.key}, not ${root.key}`)
    assert(pivot.right.key == 30, `pivot.right is ${pivot.right.key}, not 30`)
    assert(root.right == child, `root.right is ${root.right.key}, not ${child.key}`);
    assert(root.left.key == 5, `root.left is ${root.left.key}, not 5`)

    /* Case 2: node is on left side of parent
     *
     *         40                   40
     *        /                    /
     *      10                    20
     *     /  \                  /  \
     *    5   20       ===>     10  30
     *       /  \              /  \
     *      15  30            5   15
     */

    tree = new RedBlackTree;

    parent = tree.insert(40);
    root = tree.insert(10);
    pivot = tree.insert(20);
    child = tree.insert(15);
    tree.insert(5);
    tree.insert(30);

    tree.rotateLeft(root);

    assert(tree.root == parent, `tree.root is ${tree.root.key}, not ${parent.key}`)
    assert(pivot.left == root, `pivot.left is ${pivot.left.key}, not ${root.key}`)
    assert(pivot.right.key == 30, `pivot.right is ${pivot.right.key}, not 30`)
    assert(root.right == child, `root.right is ${root.right.key}, not ${child.key}`);
    assert(root.left.key == 5, `root.left is ${root.left.key}, not 5`)

    /* Case 3: node is on right side of parent
     *
     *         40                    40
     *           \                     \
     *           10                    20
     *          /  \                  /  \
     *         5   20       ===>     10  30
     *            /  \              /  \
     *           15  30            5   15
     */

    tree = new RedBlackTree;

    parent = tree.insert(40);
    root = tree.insert(10);
    pivot = tree.insert(20);
    child = tree.insert(15);
    tree.insert(5);
    tree.insert(30);

    tree.rotateLeft(root);

    assert(tree.root == parent, `tree.root is ${tree.root.key}, not ${parent.key}`)
    assert(pivot.left == root, `pivot.left is ${pivot.left.key}, not ${root.key}`)
    assert(pivot.right.key == 30, `pivot.right is ${pivot.right.key}, not 30`)
    assert(root.right == child, `root.right is ${root.right.key}, not ${child.key}`);
    assert(root.left.key == 5, `root.left is ${root.left.key}, not 5`)

    /* Case 4: pivot left child is null
     *
     *         40                    40
     *           \                     \
     *           10                    20
     *          /  \                  /  \
     *         5   20       ===>     10  30
     *            /  \              /  \
     *          null  30           5   null
     */

    tree = new RedBlackTree;

    parent = tree.insert(40);
    root = tree.insert(10);
    pivot = tree.insert(20);
    child = pivot.left; // NullNode
    tree.insert(5);
    tree.insert(30);

    tree.rotateLeft(root);

    assert(tree.root == parent, `tree.root is ${tree.root.key}, not ${parent.key}`)
    assert(pivot.left == root, `pivot.left is ${pivot.left.key}, not ${root.key}`)
    assert(pivot.right.key == 30, `pivot.right is ${pivot.right.key}, not 30`)
    assert(root.right.value == null, `root.right is ${root.right.key}, not ${child.key}`);
    assert(root.left.key == 5, `root.left is ${root.left.key}, not 5`)
  });

  it ("should provide rotateRight", () => {
    let tree;
    let root;
    let pivot;
    let child;
    let parent;

    /*
     * Case 1: node is the root
     *
     *        10                      5
     *       /  \                    / \
     *      5   20        ===>      1  10
     *     / \                        /  \ 
     *    1   6                      6   20
     */

    tree = new RedBlackTree;
    root = tree.insert(10);
    pivot = tree.insert(5);
    child = tree.insert(6);
    tree.insert(1);
    tree.insert(20);

    tree.rotateRight(root);

    assert(tree.root == pivot, `tree.root is ${tree.root.key}, not ${pivot.key}`)
    assert(pivot.right == root, `pivot.right is ${pivot.right.key}, not ${root.key}`)
    assert(pivot.left.key == 1, `pivot.left is ${pivot.left.key}, not 1`)
    assert(root.left == child, `root.left is ${pivot.left.key}, not ${child.key}`);
    assert(root.right.key == 20, `root.right is ${root.right.key}, not 20`)

    /*
     * Case 2: node is on the left side of the parent
     *
     *           30                     30
     *          /                      /
     *        10                      5
     *       /  \                    / \
     *      5   20        ===>      1  10
     *     / \                        /  \ 
     *    1   6                      6   20
     */

    tree = new RedBlackTree;
    parent = tree.insert(30);
    root = tree.insert(10);
    pivot = tree.insert(5);
    child = tree.insert(6);
    tree.insert(1);
    tree.insert(20);

    tree.rotateRight(root);

    assert(tree.root == parent, `tree.root is ${tree.root.key}, not ${parent.key}`)
    assert(pivot.right == root, `pivot.right is ${pivot.right.key}, not ${root.key}`)
    assert(pivot.left.key == 1, `pivot.left is ${pivot.left.key}, not 1`)
    assert(root.left == child, `root.left is ${pivot.left.key}, not ${child.key}`);
    assert(root.right.key == 20, `root.right is ${root.right.key}, not 20`)

    /*
     * Case 3: node is on the right side of the parent
     *
     *       1                      1
     *        \                      \
     *        10                      5
     *       /  \                    / \
     *      5   20        ===>      4  10
     *     / \                        /  \ 
     *    4   6                      6   20
     */

    tree = new RedBlackTree;
    parent = tree.insert(1);
    root = tree.insert(10);
    pivot = tree.insert(5);
    child = tree.insert(6);
    tree.insert(4);
    tree.insert(20);

    tree.rotateRight(root);

    assert(tree.root == parent, `tree.root is ${tree.root.key}, not ${parent.key}`)
    assert(pivot.right == root, `pivot.right is ${pivot.right.key}, not ${root.key}`)
    assert(pivot.left.key == 4, `pivot.left is ${pivot.left.key}, not 4`)
    assert(root.left == child, `root.left is ${pivot.left.key}, not ${child.key}`);
    assert(root.right.key == 20, `root.right is ${root.right.key}, not 20`)
  });
});