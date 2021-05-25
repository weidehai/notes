/*
*forEach,map,filter,reduce,some,every
* arr.reduce(callback, initialValue) 迭代数组的所有项，累加器，数组中的每个值（从左到右）合并，最终计算为一个值
* arr.every(callback) 依据判断条件，数组的元素是否全满足，若满足则返回ture
* arr.some(callback) 依据判断条件，数组的元素只要有一个满足返回ture
 */
let arr = [1,2,3,4,5];
const {log} = console;
arr.forEach((value,index,a)=>{
    log(value,index,a)
});


log(arr.filter((value => value<4)));

log(arr.every(value => value<6));
log(arr.some(value => value>=5));

log(arr.reduce((prevalue,curvalue)=> { return prevalue+curvalue}));

//reduce的一个坑
let a = [1,2,3,4,5]
a.reduce((a,b)=>{return a.push(b)},[])
//这里会报错push is not a function,这是因为push方法返回的不是push后的新数组而是push后的新数组的长度，所以第二次在push就错了


// 数组slice返回数组，没有的话就是空数组