import { Tree, prettyPrint } from "./index.js"; 

const tree = new Tree([1, 3, 4, 6, 8, 10, 12]); 
prettyPrint(tree.root); 
console.log(tree.isBalanced()); 

console.log("In-order:"); 
tree.inOrderForEach(node => console.log(node.data)); 
console.log("Pre-order:"); 
tree.preOrderForEach(node => console.log(node.data));
console.log("Post-order:"); 
tree.postOrderForEach(node => console.log(node.data)); 

tree.insert(15); 
tree.insert(18); 
tree.insert(20); 
prettyPrint(tree.root);

console.log(tree.isBalanced()); 

tree.rebalance(); 
prettyPrint(tree.root); 
console.log(tree.isBalanced()); 

console.log("In-order:"); 
tree.inOrderForEach(node => console.log(node.data)); 
console.log("Pre-order:"); 
tree.preOrderForEach(node => console.log(node.data)); 
console.log("Post-order:"); 
tree.postOrderForEach(node => console.log(node.data));

tree.delete(15);
prettyPrint(tree.root); 
console.log(tree.height(18));
console.log(tree.depth(18));