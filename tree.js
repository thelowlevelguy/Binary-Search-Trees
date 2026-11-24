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
        //As all node has different keys, so we can get 
        //each node  based on the value
        // if (!this.include(value)) return
        // let parent = null;
        // let node = this.root
        // while(node !== null && node.data !== value){
        //     if (node.data > value) {
        //         //save the parent node before it changes
        //         parent = node;
        //         node = node.left;
        //     }else{
        //         parent = node;
        //         node = node.right;
        //     }
        // }
        let node = this.getNode(value);
        if (node.child === null) return;

        function shiftNodes(root, n, side){
            if (n.parent === null){
                root = side;
            }else if (n === n.parent.left){
                n.parent.left = side
            }else{
                n.parent.right = side
            }
        }

        //no left node, take the right one;
        if (node.child.left === null){
            shiftNodes(this.root, node, node.child.right);
        //no right node, take the left one
        }else if (node.right === null){
            shiftNodes(this.root, node, node.child.left);

        }else{
            //both right and left nodes exist
            //find the sucessor(find the smallest on the greater. 
            // So we go to the right and take the smaller on the left childs)
            let minNode = node.right;
            let minNodeParent = node;

            while(minNode.left !== null){
                minNodeParent = minNode;
                minNode = minNode.left;
            }
            //mean that the right node has almost one left node
            if (minNodeParent !== node){
                shiftNodes(this.root, minNodeParent, minNode, minNode.right)
                minNode.right = node.right;   
            }

            shiftNodes(this.root, parent, node, minNode)
            minNode.left = node.left;
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
}