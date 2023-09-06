const Tree = require("./Tree");

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function generateRandomArray(arrLength) {
  return Array.from({ length: arrLength }, () =>
    Math.floor(Math.random() * 100)
  );
}

// Create a binary search tree from an array of random numbers
const binaryTree = new Tree(generateRandomArray(11));

// confirm that the tree is balanced
if (binaryTree.isBalanced() == true) {
  console.log("The binary tree is balanced");
}

// Print all elements in different level orders
prettyPrint(binaryTree.root);
console.log(
  "this is the elements printed out in levelOrder:",
  binaryTree.levelOrder()
);

console.log(
  "this is the elements printed out in preOrder:",
  binaryTree.preorder()
);

console.log(
  "this is the elements printed out in postOrder:",
  binaryTree.postorder()
);

console.log(
  "this is the elements printed out in inOrder:",
  binaryTree.inorder()
);

// Unbalance the tree
binaryTree.insert(101);
binaryTree.insert(102);
binaryTree.insert(103);
prettyPrint(binaryTree.root);

// Confirm that the tree is unbalanced by calling isBalanced
if (binaryTree.isBalanced() == false) {
  console.log("The new binary tree is unbalanced");
}

// Balance the new unbalanced tree
binaryTree.rebalance();
prettyPrint(binaryTree.root);

// Confirm that the tree is balanced
if (binaryTree.isBalanced() == true) {
  console.log("The new binary tree is balanced again");
}

// Print all elements in different level orders
console.log(
  "this is the elements printed out in levelOrder:",
  binaryTree.levelOrder()
);

console.log(
  "this is the elements printed out in preOrder:",
  binaryTree.preorder()
);

console.log(
  "this is the elements printed out in postOrder:",
  binaryTree.postorder()
);

console.log(
  "this is the elements printed out in inOrder:",
  binaryTree.inorder()
);
