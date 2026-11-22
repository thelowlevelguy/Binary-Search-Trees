import { Tree } from "./tree.js";


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

const arr = []
const n = new Tree(arr);
console.log(`Include(${9}): ${n.include(9)}`)
n.insert(90)
prettyPrint(n.root);
