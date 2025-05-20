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

    insert(value, node = this.root) {
        // If there is no root, assign the new value as root
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }
        // Do not allow duplicates
        if (value === node.data) return;
        // Left / right tree recursion
        if (value < node.data) {
            if (node.left === null) {
                node.left = new Node(value);
                return;
            }
            this.insert(value, node.left);
        } else {
            if (node.right === null) {
                node.right = new Node(value);
                return;
            }
            this.insert(value, node.right);
        }
    }

    deleteItem(value, node = this.root) {
        // If tree is empty
        if (node === null) return null;
        // Navigate left/right until value is found
        if (value < node.data) {
            node.left = this.deleteItem(value, node.left);
        } else if (value > node.data) {
            node.right = this.deleteItem(value, node.right);
        } else {
            // Value found
            // If is a leaf node (no children)
            if (node.left === null && node.right === null) {
                return null;
            }
            // If node has one child (right)
            if (node.left === null) return node.right;
            // If node has one child (left)
            if (node.right === null) return node.left;
            // If node has two children
            let minRight = node.right;
            // Get the smallest value on the right subtree
            while (minRight.left !== null) {
                minRight = minRight.left;
            }
            // Replace current node’s value with the in-order successor
            node.data = minRight.data;
            // Delete the in-order successor node
            node.right = this.deleteItem(minRight.data, node.right);
        }
        return node;
    }

    find(value, node = this.root) {
        // If empty tree or value not found
        if (node === null) return null;
        // If value matches current node
        if (value === node.data) return node;
        // Recursively check left or right
        if (value < node.data) {
            return this.find(value, node.left);
        } else {
            return this.find(value, node.right);
        }
    }

    levelOrder(callback) {
        // Make sure there's a callback
        if (typeof callback !== "function") {
            throw new Error("Callback function required for levelOrder()");
        }

        const queue = [];
        // Start with root node
        if (this.root) queue.push(this.root);

        // Breadth-first search
        while (queue.length > 0) {
            const current = queue.shift();
            callback(current);

            // Add left/right children to the queue
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }

    inOrder(callback, node = this.root) {
        // Require a callback
        if (typeof callback !== "function") {
            throw new Error("Callback function required for inOrder()");
        }

        if (node !== null) {
            this.inOrder(callback, node.left);
            callback(node);
            this.inOrder(callback, node.right);
        }
    }

    preOrder(callback, node = this.root) {
        // Require a callback
        if (typeof callback !== "function") {
            throw new Error("Callback function required for preOrder()");
        }

        if (node !== null) {
            callback(node);
            this.preOrder(callback, node.left);
            this.preOrder(callback, node.right);
        }
    }

    postOrder(callback, node = this.root) {
        // Require a callback
        if (typeof callback !== "function") {
            throw new Error("Callback function required for postOrder()");
        }

        if (node !== null) {
            this.postOrder(callback, node.left);
            this.postOrder(callback, node.right);
            callback(node);
        }
    }

    height(value, node = this.root) {
        // If tree is empty or node not found
        if (node === null) return null;

        if (value < node.data) {
            return this.height(value, node.left);
        } else if (value > node.data) {
            return this.height(value, node.right);
        } else {
            // Found the node, now calculate height from here down
            const calc = (node) => {
                if (node === null) return -1;
                const leftHeight = calc(node.left);
                const rightHeight = calc(node.right);
                return 1 + Math.max(leftHeight, rightHeight);
            };
            return calc(node);
        }
    }

    depth(value, node = this.root, currentDepth = 0) {
        // If tree is empty or value not found
        if (node === null) return null;
        // Found the node
        if (value === node.data) return currentDepth;
        // Keep going left/right and increase depth count
        if (value < node.data) {
            return this.depth(value, node.left, currentDepth + 1);
        } else {
            return this.depth(value, node.right, currentDepth + 1);
        }
    }

    isBalanced(node = this.root) {
        // Helper to check balance and calculate height at the same time
        const check = (node) => {
            if (node === null) return 0;
            const left = check(node.left);
            if (left === -1) return -1;

            const right = check(node.right);
            if (right === -1) return -1;

            // If height difference is too big, it's not balanced
            if (Math.abs(left - right) > 1) return -1;

            return 1 + Math.max(left, right);
        };

        // If we got -1 anywhere, it’s not balanced
        return check(node) !== -1;
    }

    rebalance() {
        // Grab all values in sorted order
        const values = [];
        this.inOrder((node) => values.push(node.data));
        // Rebuild tree from scratch with sorted values
        this.root = this.buildTree(values);
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