/*
***选择排序
 */


function InsertSort(list) {
    let i,j;
    let len = list.length;
    for(i=1;i<len;i++){
        if(list[i]<list[i-1]){
            let temp = list[i];
            for (j=i-1;list[j]>temp;j--){
                if(j<0) break;
                list[j+1] = list[j]
            }
            list[j+1] = temp;
        }
    }
}


let arr = [23,46,6,7,34,6,325,467,80,34];

InsertSort(arr);
console.log(arr);
