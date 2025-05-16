import { Tree, prettyPrint } from "./bst.js";

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(testArr);

prettyPrint(tree.root);