/*
*****基础知识：
* 回调函数：
* 1.同步回调：立即执行，执行完成后才结束，不会放入回调队列
* 2.异步回调：先放入回调队列，将来在主线程有空闲时才到队列中取出来执行
 */

setTimeout(function () {
    console.log("settimeout是一个异步回调函数,即使延迟时间设置为0也不会马上执行")
},0);

console.log("这是在settimeout之后的语句，但是会在之前执行");
console.log("这是在settimeout之后的语句，但是会在之前执行");
console.log("这是在settimeout之后的语句，但是会在之前执行");
console.log("这是在settimeout之后的语句，但是会在之前执行");
console.log("这是在settimeout之后的语句，但是会在之前执行");
console.log("这是在settimeout之后的语句，但是会在之前执行");

/*
****promise对象有三个状态：pending，初始化时是这个；resolved；rejected
*Promise构造函数是同步还是异步执行，then呢 ?   --------同步，同步
* Promise和setTimeout的区别 ?
* promise的回调函数在微队列中，settimeout的回调在宏队列中，主线程任务执行完毕，回取宏队列任务，在执行前会检查微队列是否有任务，有的话先将微队列执行完，在执行本次宏队列任务
* promise如何实现then处理 ?
* 如何实现 Promise.all ?
* 如何实现 Promise.finally ?
 */

const p = new Promise((resolve,reject)=>{
    setTimeout(function () {
        let date = Date.now();
        if(date%2==0){
            resolve(`执行成功！！！${date}`);
        }else {
            reject(`执行失败-----${date}`);
        }
    })
});

p.then(
    value => {console.log(value)},
    reason => {console.log(reason)}
).then(
    value => {console.log(value)},
    reason => {console.log(reason)}
);

console.log('-------');



function f() {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(5)
        },1000)
    })
}


f()