import { Tree } from "./tree.js";


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

const randomNumber = (min, max) => {
  let mn = Math.floor(Math.random() * min);
  let mx = Math.floor(Math.random() * max);
  return Math.max(mn, mx);
} 


let arr = [];
for (let i = 0; i < 16; i++){
  let r = randomNumber(0, 100);
  arr.push(r);
}

const n = new Tree(arr);
console.log(n.isBalanced());

let values = [];
n.levelOrderForEach((val) => values.push(val));
console.log("Level Order Traversal: ",values);
values = [];
n.inOrderForEach((val) => values.push(val));
console.log("In Order Traversal: ",values);
values = [];
n.preOrderForEach((val) => values.push(val));
console.log("Pre oder Traversal: ",values);
values = [];
n.postOrderForEach((val) => values.push(val));
console.log("Post Order Traversal: ",values);

for (let i = 0; i < 10; i++){
  let r = randomNumber(100, 200);
  n.insert(r);
}

console.log("Is Balanced: ",n.isBalanced())
prettyPrint(n.root);

n.rebalance()
console.log("Is Balanced: ",n.isBalanced())
prettyPrint(n.root);

values = [];
n.levelOrderForEach((val) => values.push(val));
console.log("Level Order Traversal: ",values);
values = [];
n.inOrderForEach((val) => values.push(val));
console.log("In Order Traversal: ",values);
values = [];
n.preOrderForEach((val) => values.push(val));
console.log("Pre oder Traversal: ",values);
values = [];
n.postOrderForEach((val) => values.push(val));
console.log("Post Order Traversal: ",values);
