import assert from 'assert';
import RedBlackTree, {RedBlackTreeNode} from '../lib/red_black_tree';
import compare from '../lib/compare';

function constructTree() {
  let tree = new RedBlackTree;
  // mock out the fixInsert method so we can test without coloring fixes.
  tree.fixInsert = () => {};

  tree.add(5);

  tree.add(2);
  tree.add(1);
  tree.add(3);

  tree.add(8);
  tree.add(7);
  tree.add(9);

  return tree;
}

describe("RedBlackTreeNode", () => {
  it ("should set correct default left, right and color", () => {
    let t = new RedBlackTree;
    // mock out the fixInsert so we don't do rotations yet.
    t.fixInsert = () => {};
    let node = t.add(5);
    assert.equal(node.left, t.nullNode());
    assert.equal(node.right, t.nullNode());
    assert.equal(node.color, 'red');
  });
});

describe("RedBlackTree", () => {
  it ("should construct", () => {
    let t = new RedBlackTree;
  });

  it ("should return a node on insert", () => {
    let tree = new RedBlackTree;

    // root
    let result = tree.add(5);
    assert(result instanceof RedBlackTreeNode);

    // left
    result = tree.add(4);
    assert(result instanceof RedBlackTreeNode);

    // right
    result = tree.add(6);
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
    // mock out the fixInsert so we don't do rotations yet.
    tree.fixInsert = () => {};

    root = tree.add(10);
    pivot = tree.add(20);
    child = tree.add(15);

    tree.add(5);
    tree.add(30);

    tree.rotateLeft(root);

    assert(tree.root == pivot, `tree.root is ${tree.root.value}, not ${pivot.value}`)
    assert(pivot.left == root, `pivot.left is ${pivot.left.value}, not ${root.value}`)
    assert(pivot.right.value == 30, `pivot.right is ${pivot.right.value}, not 30`)
    assert(root.right == child, `root.right is ${root.right.value}, not ${child.value}`);
    assert(root.left.value == 5, `root.left is ${root.left.value}, not 5`)

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
    // mock out the fixInsert so we don't do rotations yet.
    tree.fixInsert = () => {};

    parent = tree.add(40);
    root = tree.add(10);
    pivot = tree.add(20);
    child = tree.add(15);
    tree.add(5);
    tree.add(30);

    tree.rotateLeft(root);

    assert(tree.root == parent, `tree.root is ${tree.root.value}, not ${parent.value}`)
    assert(pivot.left == root, `pivot.left is ${pivot.left.value}, not ${root.value}`)
    assert(pivot.right.value == 30, `pivot.right is ${pivot.right.value}, not 30`)
    assert(root.right == child, `root.right is ${root.right.value}, not ${child.value}`);
    assert(root.left.value == 5, `root.left is ${root.left.value}, not 5`)

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
    // mock out the fixInsert so we don't do rotations yet.
    tree.fixInsert = () => {};


    parent = tree.add(40);
    root = tree.add(10);
    pivot = tree.add(20);
    child = tree.add(15);
    tree.add(5);
    tree.add(30);

    tree.rotateLeft(root);

    assert(tree.root == parent, `tree.root is ${tree.root.value}, not ${parent.value}`)
    assert(pivot.left == root, `pivot.left is ${pivot.left.value}, not ${root.value}`)
    assert(pivot.right.value == 30, `pivot.right is ${pivot.right.value}, not 30`)
    assert(root.right == child, `root.right is ${root.right.value}, not ${child.value}`);
    assert(root.left.value == 5, `root.left is ${root.left.value}, not 5`)

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
    // mock out the fixInsert so we don't do rotations yet.
    tree.fixInsert = () => {};

    parent = tree.add(40);
    root = tree.add(10);
    pivot = tree.add(20);
    child = pivot.left; // RBNullNode
    tree.add(5);
    tree.add(30);

    tree.rotateLeft(root);

    assert(tree.root == parent, `tree.root is ${tree.root.value}, not ${parent.value}`)
    assert(pivot.left == root, `pivot.left is ${pivot.left.value}, not ${root.value}`)
    assert(pivot.right.value == 30, `pivot.right is ${pivot.right.value}, not 30`)
    assert(root.right.value == null, `root.right is ${root.right.value}, not ${child.value}`);
    assert(root.left.value == 5, `root.left is ${root.left.value}, not 5`)
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
    // mock out the fixInsert so we don't do rotations yet.
    tree.fixInsert = () => {};
    root = tree.add(10);
    pivot = tree.add(5);
    child = tree.add(6);
    tree.add(1);
    tree.add(20);

    tree.rotateRight(root);

    assert(tree.root == pivot, `tree.root is ${tree.root.value}, not ${pivot.value}`)
    assert(pivot.right == root, `pivot.right is ${pivot.right.value}, not ${root.value}`)
    assert(pivot.left.value == 1, `pivot.left is ${pivot.left.value}, not 1`)
    assert(root.left == child, `root.left is ${pivot.left.value}, not ${child.value}`);
    assert(root.right.value == 20, `root.right is ${root.right.value}, not 20`)

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
    // mock out the fixInsert so we don't do rotations yet.
    tree.fixInsert = () => {};
    parent = tree.add(30);
    root = tree.add(10);
    pivot = tree.add(5);
    child = tree.add(6);
    tree.add(1);
    tree.add(20);

    tree.rotateRight(root);

    assert(tree.root == parent, `tree.root is ${tree.root.value}, not ${parent.value}`)
    assert(pivot.right == root, `pivot.right is ${pivot.right.value}, not ${root.value}`)
    assert(pivot.left.value == 1, `pivot.left is ${pivot.left.value}, not 1`)
    assert(root.left == child, `root.left is ${pivot.left.value}, not ${child.value}`);
    assert(root.right.value == 20, `root.right is ${root.right.value}, not 20`)

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
    // mock out the fixInsert so we don't do rotations yet.
    tree.fixInsert = () => {};
    parent = tree.add(1);
    root = tree.add(10);
    pivot = tree.add(5);
    child = tree.add(6);
    tree.add(4);
    tree.add(20);

    tree.rotateRight(root);

    assert(tree.root == parent, `tree.root is ${tree.root.value}, not ${parent.value}`)
    assert(pivot.right == root, `pivot.right is ${pivot.right.value}, not ${root.value}`)
    assert(pivot.left.value == 4, `pivot.left is ${pivot.left.value}, not 4`)
    assert(root.left == child, `root.left is ${pivot.left.value}, not ${child.value}`);
    assert(root.right.value == 20, `root.right is ${root.right.value}, not 20`)
  });

  it ("should correctly perform rotations and coloring on insert", () => {
    let tree = new RedBlackTree;
    tree.add(7);
    tree.add(3);
    tree.add(18);
    tree.add(10);
    tree.add(8);
    tree.add(11);
    tree.add(22);
    tree.add(26);

    let idx = 0;
    let expected = [
      {value: 3, color: 'black'},
      {value: 7, color: 'red'},
      {value: 8, color: 'black'},
      {value: 10, color: 'black'},
      {value: 11, color: 'black'},
      {value: 18, color: 'red'},
      {value: 22, color: 'black'},
      {value: 26, color: 'red'},
    ];

    tree.inorder((node) => {
      assert(node.value == expected[idx].value, `node.value is ${node.value} but expected ${expected[idx].value}`);
      assert(node.color == expected[idx].color, `node ${node.value} node.color is ${node.color} but expected ${expected[idx].color}`);
      idx++;
    });
  });

  it ("should provide remove", () => {
    let tree = new RedBlackTree;
    tree.add(7);
    tree.add(3);
    tree.add(18);
    tree.add(10);
    tree.add(8);
    tree.add(11);
    tree.add(22);
    tree.add(26);

    tree.remove(18);
    assert.equal(tree.find(18), null);

    let idx = 0;
    let expected = [
      {value: 3, color: 'black'},
      {value: 7, color: 'red'},
      {value: 8, color: 'black'},
      {value: 10, color: 'black'},
      {value: 11, color: 'black'},
      {value: 22, color: 'red'},
      {value: 26, color: 'black'},
    ];

    tree.inorder((node) => {
      assert(node.value == expected[idx].value, `node.value is ${node.value} but expected ${expected[idx].value}`);
      assert(node.color == expected[idx].color, `node ${node.value} node.color is ${node.color} but expected ${expected[idx].color}`);
      idx++;
    });
  });

  it ("should provide has", () => {
    let tree = new RedBlackTree;
    tree.add(5);
    assert(tree.has(5), `expected has(5) to return true`);
  });
});
