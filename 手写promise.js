let Promise = (function () {
    /*
    @@@@@Promise构造函数
    @@@@参数：excutor---function
     */
    function MyPromise(excutor) {
        const self = this;
        self.state = 'pending';
        self.data = undefined;
        self.callbacks = []; //每个元素的数据结构{onresolved:function onresolved(){},onrejected:function onrejected(){}}
        function resolve(value){
            console.log('success');
            if(self.state !== 'pending') return;
            self.state = 'resolved';
            self.data = value;
            if(self.callbacks.length>0){
                setTimeout(()=>{
                    self.callbacks.forEach((callbacksobj)=>{
                        callbacksobj.onResolved();
                    })
                })
            }
        }
        function reject(reason){
            if(self.state !== 'pending') return;
            self.state = 'reject';
            self.data = reason;
            if(self.callbacks.length>0){
                setTimeout(()=>{
                    self.callbacks.forEach((callbacksobj)=>{
                        callbacksobj.onRejected();
                    })
                })
            }
        }
        try{
            //执行器是用户指定的，需要捕获异常，如出现异常直接判定为失败
            excutor(resolve,reject)
        }catch (e) {
            reject(e)
        }

    }


    /*
    *@@@@@resolve方法----语法糖
    *参数:
    *   value----成功获取到的数据
    * 功能：返回一个成功的promise对象
    * 返回值：promise
     */
    MyPromise.resolve=function(value){
        return new MyPromise((resolve,reject)=>{
            if (value instanceof MyPromise){
                value.then(resolve,reject);
            }else {
                resolve(value);
            }
        })
    };

    /*
    *@@@@@reject方法----语法糖
    *参数:
    *   reason-----失败的原因
    *功能：返回一个失败的promise对象
    * 返回值：promise
     */
    MyPromise.reject=function(reason){
        return new MyPromise((resolve,reject) => {
            reject(reason)
        })
    };
    /*
    *@@@@@then方法
    *参数:
    *   onresolved-----成功回调函数
    *   onrejected-----失败回调函数
    * 功能：指定成功和失败的回调函数
    * 返回值：返回一个promise对象
     */
    MyPromise.prototype.then=function(onResolved,onRejected){
        onRejected = typeof onRejected==="function" ? onRejected : reason=>{throw reason};
        onResolved = typeof onResolved==='function' ? onResolved : value => value;
        return new MyPromise((resolve,reject)=>{
            const self = this;
            function handle(callback) {
                try{
                    const result = callback(self.data);
                    if (result instanceof MyPromise){
                        result.then(resolve,reject);
                    }else {
                        resolve(result)
                    }
                }catch (e) {
                    reject(e)
                }
            }
            console.log(self.state);
            if (self.state === 'pending'){
                self.callbacks.push(
                    {
                        onResolved(){
                            handle(onResolved);
                        },
                        onRejected(){
                            handle(onRejected);
                        }
                    }
                );
            }else if(self.state === 'resolved'){
                setTimeout(()=>{
                    handle(onResolved)
                })
            }else {
                setTimeout(()=>{
                    handle(onRejected)
                })
            }
        })
    };
    /*
    *@@@@@catch方法
    *参数:
    *   onrejected-----失败回调函数
    * 功能：指定成功和失败的回调函数
    * 返回值：返回一个promise对象
     */
    MyPromise.prototype.catch=function(onRejected){
        return this.then(undefined,onRejected)
    };

    /*
    *@@@@@all方法
    *参数:
    *   promise对象数组
    * 功能：判断promise数组中所有对象是否都能执行成功,如果有执行失败的，返回最先执行失败的那个，如果没有，返回执行成功的结果的数组，数组顺序和promise顺序一致
    * 返回值：promise
     */
    MyPromise.all=function(promises){
        let resolvedCount = 0;
        const result = new Array(promises.length);
        return new MyPromise((resolve,reject)=>{
            promises.forEach((p,index)=>{
                MyPromise.resolve(p).then(
                    value => {
                        resolvedCount++;
                        result[index] = value;
                        if (resolvedCount===promises.length){
                            resolve(result)
                        }
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })

        })
    };

    /*
    *@@@@@race方法
    *参数:
    *   promise数组
    * 功能：按顺序执行promise数组中的每一个任务，返回最先执行完毕的那一个，无论成功或者失败，只要有一个执行完毕了，后面的都不用执行
    * 返回值：promise
     */
    MyPromise.race=function(promises){
        return new MyPromise((resolve,reject)=>{
            promises.forEach((p,index)=>{
                MyPromise.resolve(p).then(
                    value => {
                        resolve(value);
                    },
                    reason=>{
                        reject(reason);
                    }
                )
            })
        })
    };

    return MyPromise
})();



let mypromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1);
    },1000);
});

mypromise.then(
    value => {
        console.log(value);
        return '1'
    },
    reason => {
        console.log(reason);
        return '2'
    }
).then(
    value => {
        console.log(value);
        return new Promise((resolve,reject)=>{
            reject('faild');
        })
    },
    reason => {
        console.log(reason)
    }
).then(
    value => {
        console.log(value)
    },
    reason => {
        console.log('reason:' + reason)
    }
)


let promise2 = Promise.resolve(3);
promise2.then((value)=>{console.log(value)});

let p1 = Promise.resolve(100);
let p2 = Promise.resolve(2);
let p3 = Promise.reject(200);

let p4 = Promise.all([p1,p2,p3]);
p4.then(
    value=>{
        console.log(value)
    },
    reason=>{
        console.log(reason)
    }
);

let p5 = Promise.race([p1,p2,p3]);
p5.then(
    value=>{
        console.log(value);
    },
    reason=>{
        console.log(reason);
    }
)
