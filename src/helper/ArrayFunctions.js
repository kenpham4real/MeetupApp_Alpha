'use strict'

// Filter the character: / of the filePath of local photo --> send to storage
export const filterFilePath = (arr) => {
    for(let i = arr.length-1; i >= 0; i--){
        if(arr[i] !== "/"){
            continue;
        }else{
            return arr.slice(i+1, -1)
        }
    }

}

// Find the middle post in the list to apply styling
export const findMidOfThree = (arr,position) => {
        let left = 0, right = 2;
        if(arr.length == 1) return false;
        while(left < arr.length){
            let index = left+1;
            if(arr[index] && position == index){
                return true
            }
            left = right+1;
            right = left+2;    
        }
        
        return false;
    }