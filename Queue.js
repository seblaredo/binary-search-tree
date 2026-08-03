import { QueueNode } from "./QueueNode.js";

class Queue {
  constructor() {
    this.root = null;
    this.tail = null;
  }

  queue(node) {
    const temp = new QueueNode();
    temp.node = node;
    if (this.root === null) {
      this.root = temp;
      this.tail = temp;
    } else {
      this.tail.next = temp;
      this.tail = this.tail.next;
    }
  }

  unqueue() {
    if (this.root === null) return undefined;
    const temp = this.root;
    if (this.root === this.tail) {
      this.root = null;
      this.tail = null;
      return temp.node;
    }
    this.root = this.root.next;
    return temp.node;
  }

  isEmpty(){
    return (this.root===null);
  }
}

export {Queue};
