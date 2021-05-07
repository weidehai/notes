/*
***冒泡排序
 */


function BubbingSort(list) {
    let i,j;
    let len = list.length;
    for(i=0;i<len;i++){
        for(j=0;j<len-i;j++){
            if (list[j]>list[j+1]){
                [list[j],list[j+1]] = [list[j+1],list[j]];
            }
        }
    }
}



let arr = [23,46,6,7,34,6,325,467,80,34];

BubbingSort(arr);
console.log(arr);


