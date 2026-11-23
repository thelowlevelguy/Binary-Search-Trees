import { Tree } from "./tree.js";


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

const plusTwo = (x) => x += 2;

const arr = [1, 2, 4, 3, 8, 5, 6, 7, 10, 12, 11, 24];
const n = new Tree(arr);
console.log(`Include(${9}): ${n.include(9)}`)
n.insert(77)
//n.deleteItem(10);
const values = [];
n.levelOrderForEach((val) => values.push(val * 2));
console.log(values)
prettyPrint(n.root);
