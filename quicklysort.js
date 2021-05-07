/*
**快速排序
 */

function QuicklySort(list,low,high) {
    if(low < high){
        let position = cut(list,low,high);
        QuicklySort(list,low,position);
        QuicklySort(list,position+1,high);
    }
}

function QuicklySort2(list,low,high) {
    let stack = [];
    let h,l,p;
    stack.push(low);
    stack.push(high);
    while (stack.length>0) {
        h = stack.pop();
        l = stack.pop();
        p = cut(list, l, h);
        if (p===h){
            continue
        }
        stack.push(p+1);
        stack.push(h);
        if (p===l || h-l<=3){
            continue;
        }
        stack.push(l);
        stack.push(p);
    }
}

function cut(list,low,high){
    let temp = list[low];
    while (low < high){
        while (low < high && list[high] >= temp){
            high--;
        }
        list[low] = list[high];
        while (low < high && list[low] <= temp){
            low++;
        }
        list[high] = list[low]
    }
    list[low] = temp;
    //console.log(list);
    return low;
}


let l = [0,12,136,9856,136,135,1326,1356,4,9,10,12,136,9856,136,135,1326,135,622,5];

let now = Date.now();
QuicklySort2(l,0,l.length-1);
console.log(Date.now()-now);
console.log(l);
// let now1 = Date.now();
// QuicklySort(l,0,l.length-1);
// console.log(Date.now()-now1);

//f(n) = n+2*n/2+2*n/4+2*n/8+...+2*n/2^(k-1)
//T(n) = O(f(n))
//T(n) = 2*T(n/2) + n
//T(n/2) = 2*T(n/4) + n/2
//T(n) = 2*(2*T(n/4) + n/2) + n = 2^2*T(n/4) + 2*n