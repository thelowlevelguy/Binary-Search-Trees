import { Node } from "./node.js";

export class Tree {
    constructor(arr) {
        //init with array
        this.root = (function (){
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

}