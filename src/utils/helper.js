
export function convertCommitsTree(arr) {
    var tree = [],
        mappedArr = {},
        arrElem,
        mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for(var i = 0, len = arr.length; i < len; i++) {
        arrElem = arr[i];
        mappedArr[arrElem.sha] = arrElem;
        mappedArr[arrElem.sha]['children'] = [];
    }


    for (var sha in mappedArr) {
        if (mappedArr.hasOwnProperty(sha)) {
            mappedElem = mappedArr[sha];
            // If the element is not at the root level, add it to its parent array of children.
            if (mappedElem.parents.length) {

                mappedElem.parents.forEach(parent=>{

                    mappedArr[parent['sha']]['children'].push(mappedElem);
                })


            }
            // If the element is at the root level, add it to first level elements array.
            else {
                tree.push(mappedElem);
            }
        }
    }
    return tree;
}


