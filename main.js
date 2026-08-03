import { Tree } from "./Tree.js";

function randomArray(length){
    let array = []
    for(let i = 0; i<length; i++){
        array.push(Math.floor(Math.random()*100 + 1));
    }
    return array;
}

let treeArray = randomArray(20);
let tree = new Tree(treeArray);
console.log(tree.isBalanced());
tree.preOrderForEach((item)=>console.log(item));
tree.postOrderForEach((item)=>console.log(item));
tree.inOrderForEach((item)=>console.log(item));
tree.insert(101);
tree.insert(102);
tree.insert(103);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
tree.preOrderForEach((item)=>console.log(item));
tree.postOrderForEach((item)=>console.log(item));
tree.inOrderForEach((item)=>console.log(item));