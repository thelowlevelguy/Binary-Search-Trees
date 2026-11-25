import { Node } from "./node.js";

export class Tree {
    constructor(arr) {
        //init with array
        this.root = (function buildTree(){
            function uniqSorted(arr){{
                let mockArray = []
                let sorted = arr.sort((a,b) => a-b);
                sorted.forEach((value) => {
                    if (mockArray.indexOf(value) === -1) mockArray.push(value);
                })
                return mockArray
            }}
            
            function buildTreeRecur(mockArray, start, end){
                if (start > end) return null;
                let mid = Math.floor(start + (end - start) / 2)
                let root = new Node(mockArray[mid])

                root.left = buildTreeRecur(mockArray, start, mid-1)
                root.right = buildTreeRecur(mockArray, mid+1, end)

                return root;
            }
            const mockArray = uniqSorted(arr);
            return buildTreeRecur(mockArray, 0, mockArray.length-1);
        })();
    }

    //return a node and its parent as object
    getNode(value){
        let parent = null;
        let node = this.root
        while(node !== null && node.data !== value){
            parent = node;
            if (node.data > value) {
                node = node.left;
            }else{
                node = node.right;
            }
        }
        let result = {
            parent: parent,
            child : node
        }
        return result;
    }

    include(value){      
        const node = this.getNode(value) 
        return node.child === null ? false : true;
    }

    insert(value){
        let node = this.getNode(value);
        if (node.child !== null) return;
        //else value node didn't exist

        //root is null here, but is either left or right;
        node.child = new Node(value);
        if (node.parent === null){
            this.root = node.child;
        }else{
            if (node.parent.data > value){
                node.parent.left = node.child
            }else{
                node.parent.right = node.child
            }
        }
    }

    deleteItem(value){
        let node = this.getNode(value);
        if (node.child === null) return;

        function shiftNodes(root, parent, child, side){
            if (parent === null){
                root = side;
            }else if (child === parent.left){
                parent.left = side
            }else{
                parent.right = side
            }
        }

        //no left node, take the right one;
        if (node.child.left === null){
            shiftNodes(this.root, node.parent, node.child, node.child.right);
        //no right node, take the left one
        }else if (node.child.right === null){
            shiftNodes(this.root, node.parent, node.child, node.child.left);
        }else{

            let minNode = node.child.right;
            let minNodeParent = node.child;

            while(minNode.left !== null){
                minNodeParent = minNode;
                minNode = minNode.left;
            }

            //mean that the right node has almost one left node
            if (minNodeParent !== node.child){
                //the left side is already null basing on the last while loop
                //ss we set the parent child to the right child of the new node
                shiftNodes(this.root, minNodeParent, minNode, minNode.right)
                minNode.right = node.child.right;   
            }

            shiftNodes(this.root, node.parent, node.child, minNode)
            minNode.left = node.child.left;
        }
    }

    levelOrderForEach(callback){
        if (callback == null) throw new Error("no callback provided");
        if (this.root == null) return;
        let root = this.root;
        //Use thsis array as queue;
        let q = [];
        q.push(root)
        while(q.length !== 0){
            let v = q.shift();
            callback(v.data);
            if (v.left !== null) q.push(v.left);
            if (v.right !== null) q.push(v.right);
        }
    }

    inOrderForEach(callback){
        if (callback == null) throw new Error("no callback provided");
        if (this.root == null) return;
        let root = this.root;

        function inOrderTreeWalk(root){
            if(root != null){
                inOrderTreeWalk(root.left);
                callback(root.data);
                inOrderTreeWalk(root.right);
            }
        }
        inOrderTreeWalk(root);
    }

    preOrderForEach(callback){
        if (callback == null) throw new Error("no callback provided");
        if (this.root == null) return;
        let root = this.root;

        function preOrderTreeWalk(root){
            if(root != null){
                callback(root.data);
                preOrderTreeWalk(root.left);
                preOrderTreeWalk(root.right);
            }
        }
        preOrderTreeWalk(root);
    }

    postOrderForEach(callback){
        if (callback == null) throw new Error("no callback provided");
        if (this.root == null) return;
        let root = this.root;

        function postOrderTreeWalk(root){
            if(root != null){
                callback(root.data);
                postOrderTreeWalk(root.left);
                postOrderTreeWalk(root.right);
            }
        }
        postOrderTreeWalk(root);
    }

    height(value) {
        let node = this.getNode(value);
        if (node.child == null) return;
        
        function findHeightUtil(x) {
            if (!x) return -1;
            
            // Store the maximum height of left and right subtree
            let leftHeight = findHeightUtil(x.left);
            let rightHeight = findHeightUtil(x.right);
            
            // Update height of the current node
            let ans = Math.max(leftHeight, rightHeight) + 1;
            return ans;
        }
 
        return findHeightUtil(node.child)
    }

    depth(value){
        let node = this.getNode(value);
        if (node.child == null) return;

        function findDepth(root, x) {
            if (!root) return -1;
            
            let dist = -1;
            
            // Check if x is the current node or
            // if it exists in the left or right subtree
            if (root.data === x.data ||
                (dist = findDepth(root.left, x)) >= 0 ||
                (dist = findDepth(root.right, x)) >= 0) {
                return dist + 1;
            }
            
            return dist;
        }

        return findDepth(this.root, node.child)
    }

    isBalanced(){
        if (!this.root) return undefined;
        let q = [this.root];

        while(q.length > 0){
            let curr = q.shift();
            if (curr){       
                let hl = curr.left !== null ? this.height(curr.left.data) : -1;
                let hr = curr.right !== null ? this.height(curr.right.data) : -1;
               
                let bh = hr -hl; 
                if (bh < -1 || bh > 1){
                    return false;
                }
                if (curr.left) q.push(curr.left);
                if (curr.rigth) q.push(curr.right);
            }
        }
        return true
    }
}