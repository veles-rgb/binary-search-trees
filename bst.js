import { mergeSort } from "./mergeSort.js";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        // Sort and clean arr
        this.arr = this.sortAndClean(arr);
        // Set root
        this.root = this.buildTree(this.arr);
    }

    sortAndClean(arr) {
        if (arr.length < 2) return arr;
        // Sort arr
        arr = mergeSort(arr);
        // Remove duplicates from arr
        arr = [...new Set(arr)];
        return arr;
    }

    buildTree(arr, start = 0, end = arr.length - 1) {
        // Base case
        if (start > end) return null;
        // Find middle element
        let mid = start + Math.floor((end - start) / 2);
        // Create root node
        let root = new Node(arr[mid]);
        // Create left sub tree
        root.left = this.buildTree(arr, start, mid - 1);
        // Create right sub tree
        root.right = this.buildTree(arr, mid + 1, end);

        return root;
    }
}

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


export { Tree, prettyPrint };