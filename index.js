class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(array) {
        array.sort((a, b) => a - b);
        const uniqueArray = [...new Set(array)];
        this.root = buildTree(uniqueArray, 0, uniqueArray.length - 1);
    }

    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        let currentNode = this.root;

        while(true) {
            if (value < currentNode.data) {
                if (currentNode.left === null) {
                    currentNode.left = new Node(value);
                    break;
                } else {
                    currentNode = currentNode.left;
                }
            } else if (value > currentNode.data) {
                if (currentNode.right === null) {
                    currentNode.right = new Node(value);
                    break;
                } else {
                    currentNode = currentNode.right;
                }
            } else {
                break;
            }
        }
    }

    findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
    
    deleteItem(node, value) {
        if (node === null) return;

        if (value < node.data) {
            node.left = this.deleteItem(node.left, value);
        } else if (value > node.data) {
            node.right = this.deleteItem(node.right, value);
        } else {
            if (node.left === null && node.right === null) {
                return null;
            } else if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            } else {
                let successor = this.findMin(node.right);
                node.data = successor.data;
                node.right = this.deleteItem(node.right, successor.data);
            }

        }

        return node;
    }

    delete(value) {
        this.root = this.deleteItem(this.root, value);
    }


    find(value) {
        let node = this.root;

        while (node !== null) {
            if (value < node.data) {
                node = node.left;
            } else if (value > node.data) {
                node = node.right;
            } else {
                return node;
            }
        }
        return null;
    }

    levelOrderForEach(callback) {
        if (typeof callback !== "function") {
        throw new Error("Callback function is required!");
        }

        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift(); 
            callback(current); 
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }

    inOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback function is required!");
        }

        function traverse(node) {
            if (node === null) return;

            traverse(node.left);
            callback(node);            
            traverse(node.right);      
        }

        traverse(this.root);
    }

    preOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback function is required!");
        }

        function traverse(node) {
            if (node === null) return;

            callback(node);            
            traverse(node.left);       
            traverse(node.right);      
        }

        traverse(this.root);
    }

    postOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback function is required!");
        }

        function traverse(node) {
            if (node === null) return;

            traverse(node.left);       
            traverse(node.right);
            callback(node);           
        }

        traverse(this.root);
    }

    height(value) {
        let node = this.find(value);
        if (node === null) return null;
        return calcHeight(node);
    }


    depth(value) {
        let node = this.root;
        let height = 0;
        
        while (node !== null) {
            if (value < node.data) {
                node = node.left;
                height++;
            } else if (value > node.data) {
                node = node.right;
                height++;
            } else {
                return height;
            }
        }
        return null;
    }

    isBalanced(node = this.root) {
        if (node === null) return true;

        const leftHeight = calcHeight(node.left);
        const rightHeight = calcHeight(node.right);

        const diff = Math.abs(leftHeight - rightHeight);

        if (diff > 1) return false;
        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        const values = [];

        this.inOrderForEach(node => values.push(node.data));

        this.root = buildTree(values, 0, values.length - 1);
    }
}

function buildTree(array, start, end) {

    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);

    return node;
}

function calcHeight(node) {
    if (node === null) return -1;  
    return 1 + Math.max(calcHeight(node.left), calcHeight(node.right));
}


export function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};










