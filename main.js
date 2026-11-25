import { Tree } from "./tree.js";


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


const arr = [1, 2, 4, 3, 8, 5, 6, 7, 10, 12, 11, 24];
const n = new Tree(arr);
console.log(`Include(${8}): ${n.include(8)}`)
n.insert(15)
n.deleteItem(12);
// let values = [];
// n.levelOrderForEach((val) => values.push(val * 2));
// console.log(values);
// values = [];
// n.inOrderForEach((val) => values.push(val * 2));
// console.log(values);
// values = [];
// n.preOrderForEach((val) => values.push(val * 2));
// console.log(values);
// values = [];
// n.postOrderForEach((val) => values.push(val * 2));
// console.log(values);
prettyPrint(n.root);
