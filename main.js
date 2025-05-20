import { Tree, prettyPrint } from "./bst.js";

// Random number generator for starting array
function getRandomArray(size = 15) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}

// 1. Make tree from random numbers
let randomNumbers = getRandomArray();
console.log("Random numbers:", randomNumbers);
let tree = new Tree(randomNumbers);

console.log("\nInitial tree:");
prettyPrint(tree.root);

// 2. Check if it's balanced
console.log("Is balanced?", tree.isBalanced());

// 3. Print all elements in level, pre, post, and in order
console.log("\nLevel Order:");
tree.levelOrder((node) => console.log(node.data));

console.log("\nPreorder:");
tree.preOrder((node) => console.log(node.data));

console.log("\nInorder:");
tree.inOrder((node) => console.log(node.data));

console.log("\nPostorder:");
tree.postOrder((node) => console.log(node.data));

// 4. Add big numbers to mess up the balance
tree.insert(110);
tree.insert(120);
tree.insert(130);
tree.insert(140);
tree.insert(150);

console.log("\nTree after adding big numbers:");
prettyPrint(tree.root);
console.log("Is balanced now?", tree.isBalanced());

// 5. Rebalance it
tree.rebalance();

console.log("\nTree after rebalancing:");
prettyPrint(tree.root);
console.log("Balanced again?", tree.isBalanced());

// 6. Print all elements again
console.log("\nLevel Order:");
tree.levelOrder((node) => console.log(node.data));

console.log("\nPreorder:");
tree.preOrder((node) => console.log(node.data));

console.log("\nInorder:");
tree.inOrder((node) => console.log(node.data));

console.log("\nPostorder:");
tree.postOrder((node) => console.log(node.data));