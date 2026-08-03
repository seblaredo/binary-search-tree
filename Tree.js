import { Node } from "./Node.js";
import { Queue } from "./Queue.js";

class Tree {
  constructor(array) {
    array.sort((a, b) => a - b);
    this.duplicates = [];
    array = array.filter((item) => {
      if (this.duplicates.includes(item)) {
        return false;
      } else {
        this.duplicates.push(item);
        return true;
      }
    });
    this.root = this.buildTree(array, 0, array.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node();
    root.value = array[mid];
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }

  includes(value) {
    let temp = this.root;
    while (temp !== null) {
      if (temp.value === value) return true;
      else if (value < temp.value) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }
    }
    return false;
  }

  insert(value) {
    let temp = this.root;
    let newNode = new Node();
    newNode.value = value;
    while (temp !== null) {
      if (temp.value === value) return;
      else if (value < temp.value) {
        if (temp.left === null) {
          temp.left = newNode;
        }
        temp = temp.left;
      } else {
        if (temp.right === null) {
          temp.right = newNode;
        }
        temp = temp.right;
      }
    }
  }

  getInOrderSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  deleteItem(value, root = this.root) {
    if (root === null) {
      return root;
    }

    if (root.value > value) {
      root.left = this.deleteItem(value, root.left);
    } else if (root.value < value) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;
      const succ = this.getInOrderSuccessor(root);
      root.value = succ.value;
      root.right = this.deleteItem(succ.value, root.right);
    }
    return root;
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function!");
    }
    function recursion(node) {
      if (node === null) return;
      recursion(node.left);
      callback(node.value);
      recursion(node.right);
    }
    recursion(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function!");
    }
    function recursion(node) {
      if (node === null) return;
      callback(node.value);
      recursion(node.left);
      recursion(node.right);
    }
    recursion(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function!");
    }
    function recursion(node) {
      if (node === null) return;
      recursion(node.left);
      recursion(node.right);
      callback(node.value);
    }
    recursion(this.root);
  }

  levelOrderForEach(callback) {
    let queue = new Queue();
    queue.queue(this.root);
    while (!queue.isEmpty()) {
      let temp = queue.unqueue();
      if (temp.left !== null) queue.queue(temp.left);
      if (temp.right !== null) queue.queue(temp.right);
      callback(temp.value);
    }
  }

  height(value) {
    let temp = this.root;
    let found = false;
    while (temp !== null && !found) {
      if (temp.value === value) found = true;
      else if (value < temp.value) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }
    }
    if (!found) return undefined;
    else {
      function recursion(node) {
        if (node === null) return -1;
        let leftHeight = recursion(node.left);
        let rightHeight = recursion(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
      }
      return recursion(temp);
    }
  }

  depth(value) {
    let temp = this.root;
    let found = false;
    let depth = -1;
    while (temp !== null && !found) {
      depth++;
      if (temp.value === value) found = true;
      else if (value < temp.value) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }
    }
    if (!found) return undefined;
    else return depth;
  }

  isBalanced() {
    let leftHeight = this.height(this.root.left.value);
    let rightHeight = this.height(this.root.right.value);
    return (Math.abs(leftHeight - rightHeight) <= 1);
  }

  rebalance(){
    let values = []
    this.inOrderForEach((item)=>values.push(item));
    this.root = this.buildTree(values, 0, values.length - 1);
  }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

export {Tree};
