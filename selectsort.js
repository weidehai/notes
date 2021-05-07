/*
***选择排序
 */


function SelectSort(list) {
    let i,j;
    let len = list.length;
    for(i=0;i<len;i++){
        for(j=i+1;j<len;j++){
            if(list[i]>list[j]){
                [list[j],list[i]] = [list[i],list[j]];
            }
        }
    }
}


let arr = [23,46,6,7,34,6,325,467,80,34];

SelectSort(arr);
console.log(arr);
