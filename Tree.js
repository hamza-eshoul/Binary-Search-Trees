const Node = require("./Node");

class Tree {
  constructor(arr) {
    this.root = sortArrAndBuildTree(arr);
  }

  insert(value, child = this.root) {
    if (child.left == null && value < child.data) {
      return (child.left = new Node(value, null, null));
    }

    if (child.right == null && value > child.data) {
      return (child.right = new Node(value, null, null));
    }

    if (value < child.data) {
      child = child.left;
    } else {
      child = child.right;
    }

    return this.insert(value, child);
  }

  delete(value, child = this.root) {
    // case 1 : node to be deleted has no children
    if (
      child.left !== null &&
      child.left.right == null &&
      child.left.left == null &&
      child.left.data == value
    ) {
      return (child.left = null);
    }

    if (
      child.right !== null &&
      child.right.right == null &&
      child.right.left == null &&
      child.right.data == value
    ) {
      return (child.right = null);
    }

    // case 2 : node to be deleted has ONE child
    // node to be deleted has ONE right child
    if (child.left == null && (child.right !== null) & (child.data == value)) {
      let child_right_right = child.right.right;
      let child_right_left = child.right.left;
      child.data = child.right.data;
      child.right = child_right_right;
      child.left = child_right_left;

      return;
    }
    // node to be deleted has ONE left child
    if (child.right == null && child.left !== null && child.data == value) {
      let child_left_right = child.left.right;
      let child_left_left = child.left.left;
      child.data = child.left.data;
      child.right = child_left_right;
      child.left = child_left_left;
    }

    // case 3 : node to be deleted has two children
    if (child.left !== null && child.right !== null && child.data == value) {
      function findNextBiggest(child) {
        if (child.left.left == null) {
          let childData = child.left.data;
          child.left = null;

          return childData;
        }

        child = child.left;

        return findNextBiggest(child);
      }

      function findNextBiggestSM(child) {
        let childData = child.right.data;
        child.right = child.right.right;

        return childData;
      }

      if (child.right.left == null) {
        const nextBiggest = findNextBiggestSM(child);
        child.data = nextBiggest;
        return;
      } else {
        const nextBiggest = findNextBiggest(child.right);
        child.data = nextBiggest;

        return;
      }
    }

    if (value < child.data) {
      child = child.left;
    } else {
      child = child.right;
    }

    return this.delete(value, child);
  }

  find(value, child = this.root) {
    if (child == null) {
      return null;
    }

    if (value == child.data) {
      return child;
    }

    if (value < child.data) {
      child = child.left;
    } else {
      child = child.right;
    }

    return this.find(value, child);
  }

  levelOrder(func, arrQueue = [this.root], arrValues = []) {
    if (arrQueue.length == 0) {
      if (func === undefined) {
        return arrValues;
      } else {
        return;
      }
    }

    if (arrQueue[0] !== null) {
      if (func === undefined) {
        arrValues.push(arrQueue[0].data);
      } else {
        func(arrQueue[0]);
      }

      arrQueue.push(arrQueue[0].left, arrQueue[0].right);
    }

    arrQueue.shift();

    return this.levelOrder(func, arrQueue, arrValues);
  }

  preorder(func, child = this.root, arrValues = []) {
    if (child == null) {
      return;
    }

    if (func === undefined) {
      arrValues.push(child.data);
    } else {
      func(child);
    }

    this.preorder(func, child.left, arrValues);
    this.preorder(func, child.right, arrValues);

    if (func === undefined) {
      return arrValues;
    } else {
      return;
    }
  }

  inorder(func, child = this.root, arrValues = []) {
    if (child == null) {
      return;
    }

    if (child.left == null) {
      if (func === undefined) {
        arrValues.push(child.data);
      } else {
        func(child);
      }
    }

    this.inorder(func, child.left, arrValues);
    if (!arrValues.includes(child.data)) {
      if (func === undefined) {
        arrValues.push(child.data);
      } else {
        func(child);
      }
    }
    this.inorder(func, child.right, arrValues);

    if (func === undefined) {
      return arrValues;
    } else {
      return;
    }
  }

  postorder(func, child = this.root, arrValues = []) {
    if (child == null) {
      return;
    }

    if (child.left == null && child.right == null) {
      if (func === undefined) {
        arrValues.push(child.data);
      } else {
        func(child);
      }
    }

    this.postorder(func, child.left, arrValues);
    this.postorder(func, child.right, arrValues);
    if (!arrValues.includes(child.data)) {
      if (func === undefined) {
        arrValues.push(child.data);
      } else {
        func(child);
      }
    }

    if (func === undefined) {
      return arrValues;
    } else {
      return;
    }
  }

  height(node, heightCounter = -1) {
    if (node == null) {
      if (heightCounter == -1) {
        heightCounter = 0;
        return heightCounter;
      }
      return heightCounter;
    }

    heightCounter++;

    const leftNode = this.height(node.left, heightCounter);
    const rightNode = this.height(node.right, heightCounter);

    return Math.max(leftNode, rightNode);
  }

  depth(node, child = this.root, depthCounter = 0) {
    if (node == null) {
      return null;
    }

    if (child.data == node.data) {
      return depthCounter;
    }

    if (node.data < child.data) {
      child = child.left;
    } else {
      child = child.right;
    }

    depthCounter++;

    return this.depth(node, child, depthCounter);
  }

  isBalanced(child = this.root, difHeight) {
    if (child == null) {
      return;
    }

    if (child.left !== null && child.right !== null) {
      difHeight =
        Math.max(this.height(child.left), this.height(child.right)) -
        Math.min(this.height(child.left), this.height(child.right));
    }

    if (difHeight > 1) {
      return false;
    }

    this.isBalanced(child.left, difHeight);
    this.isBalanced(child.right, difHeight);

    return true;
  }

  rebalance(child = this.root, newArr = [], difHeight) {
    if (this.isBalanced()) {
      return null;
    }

    if (child == null) {
      return newArr;
    }

    if (child.left !== null && child.right !== null) {
      difHeight =
        Math.max(this.height(child.left), this.height(child.right)) -
        Math.min(this.height(child.left), this.height(child.right));
    }

    if (difHeight > 1) {
      if (this.height(child.right) > this.height(child.left)) {
        newArr.push(child.data);
        let nextChild;

        for (let i = 0; i <= this.height(child.right) - difHeight + 1; i++) {
          if (i == 0) {
            nextChild = child.right;
            newArr.push(nextChild.data);
            if (this.height(nextChild.right) > this.height(nextChild.left)) {
              nextChild = nextChild.right;
            } else {
              nextChild = nextChild.left;
            }
          } else {
            if (nextChild.left == null) {
              nextChild = nextChild.right;
            } else {
              nextChild = nextChild.left;
            }
          }

          newArr.push(nextChild.data);
        }
        this.rebalance(child.left, newArr);
        return newArr;
      } else if (this.height(child.left) > this.height(child.right)) {
        newArr.push(child.data);
        let nextChild;
        for (let i = 0; i <= this.height(child.left) - difHeight + 1; i++) {
          if (i == 0) {
            nextChild = child.left;
            newArr.push(nextChild.data);
            if (this.height(nextChild.right) > this.height(nextChild.left)) {
              nextChild = nextChild.right;
            } else {
              nextChild = nextChild.left;
            }
          } else {
            if (nextChild.left == null) {
              nextChild = nextChild.right;
            } else {
              nextChild = nextChild.left;
            }
          }
          newArr.push(nextChild.data);
        }
        this.rebalance(child.right, newArr);
      }
    }

    newArr.push(child.data);
    this.rebalance(child.left, newArr);
    this.rebalance(child.right, newArr);

    return (this.root = sortArrAndBuildTree(newArr));
  }
}

function buildTree(arr) {
  if (arr.length == 2) {
    return new Node(arr[0], new Node(arr[1], null, null), null);
  }
  if (arr.length == 1) {
    return new Node(arr[0], null, null);
  }

  const rootTree = createMidTree(arr);

  const leftHalf = splitLeftHalf(arr);
  const rightHalf = splitRightHalf(arr);

  const finalLeftHalf = buildTree(leftHalf);
  const finalRightHalf = buildTree(rightHalf);

  const treeNodes = new Node(rootTree[1], finalRightHalf, finalLeftHalf);

  return treeNodes;
}

function createMidTree(arr) {
  const start = 0;
  const end = arr.length - 1;
  const mid = Math.floor((start + end) / 2);

  return [null, arr[mid], null];
}

function splitLeftHalf(arr) {
  return arr.slice(0, Math.floor((arr.length - 1) / 2));
}

function splitRightHalf(arr) {
  return arr.slice(Math.ceil(arr.length / 2), arr.length);
}

function sortArrAndBuildTree(arr) {
  // sort the array
  const sortedArray = arr.sort((a, b) => {
    return a - b;
  });

  //   remove duplicates
  const transformedArr = sortedArray.filter((item, index) => {
    return arr.indexOf(item) === index;
  });

  return buildTree(transformedArr);
}

function levelOrderFunc(node) {
  console.log(node.data);
}

function preOrderFunc(node) {
  console.log(node);
}

function inOrderFunc(node) {
  console.log(node.data);
}

function postOrderFunc(node) {
  console.log(node.data);
}

module.exports = Tree;
