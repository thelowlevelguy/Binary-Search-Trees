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

    include(value){
        let root = this.root
        while(root !== null && root.data !== value){
            if (root.data > value) {
                root = root.left;
            }else{
                root = root.right;
            }
        }
        //false it not found or root is null
        return root !== null ?  root.data === value : false;
    }

    insert(value){
        if (this.include(value)) return
        let parent = null;
        let root = this.root
        while(root !== null){
            parent = root;
            if (root.data > value){
                root = root.left
            }else{
                root = root.right;
            }
        }
        //root is null here, but is either left or right;
        root = new Node(value);
        if (parent === null){
            this.root = root;
        }else{
            if (parent.data > value){
                parent.left = root
            }else{
                parent.right = root
            }
        }
    }

    deleteItem(value){
        //As all node has different keys, so we can get 
        //each node  based on the value
        if (!this.include(value)) return
        let parent = null;
        let node = this.root
        while(node !== null && node.data !== value){
            if (node.data > value) {
                parent = node;
                node = node.left;
            }else{
                parent = node;
                node = node.right;
            }
        }

        function shiftNodes(root, parent, n, side){
            if (parent === null){
                root = side;
            }else if (n === parent.left){
                parent.left = side
            }else{
                parent.right = side
            }
        }

        //no left node, take the right one;
        if (node.left === null){
            shiftNodes(this.root, parent, node, node.right);
        //no right node, take the left one
        }else if (node.right === null){
            shiftNodes(this.root, parent, node, node.left);

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
}