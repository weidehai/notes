/*
**浏览器的两种缓存机制
* 1.强缓存 cache-control expires
* 2.协商缓存 last-modify/if-modify-since   Etag/if-None-Match
 */


/*
*写一个方法能够依次访问数组中的url，如果有失败可以重新访问，到达5次后放弃，使用promise异步,将结果作为数组返回
 */
let urls = ["http://www.baidu.com","http://www.taobao.com","http://www.aliyun.com"];

function batch_request(urls) {
    let result=[];
    for (let url of urls){
        pajax(url,"get",1).then(
            value =>{
                result.push(value);
                if(result.length===5){
                    console.log("所有请求结束，结果",result)
                }
            },
            reason =>{
                result.push(reason);
                if(result.length===3){
                    console.log("所有请求结束，结果",result)
                }
            }
        )
    }
}

function ajax(url,method,times,resolve,reject,body) {
    let ajx = new XMLHttpRequest();
    ajx.open(method,url,true);
    ajx.onreadystatechange=function () {
        if(ajx.readyState===4){
            if(ajx.status===200){
                resolve(ajx.responseText);
            }else {
                if (times>5){
                    reject(ajx.status)
                }else {
                    console.log(`第${times}次请求失败，尝试重新请求${url}`);
                    times++;
                    ajax(url, method, times,resolve,reject,body)
                }
            }
        }
    };
    ajx.send(body)
}


function pajax(url,method,times,body) {
    return new Promise((resolve,reject)=>{
        body = body || null;
        ajax(url,method,times,resolve,reject,body)
    })
}

//batch_request(urls);

/*
*实现一个深拷贝并且考虑循环引用
 */


/*
*说出下面this的指向
*箭头函数的this指向,在哪里定义的就指向那里的this，不受call，apply，bind的影响
*普通函数和匿名函数，谁调用的this就指向谁
 */

//对象在哪里被定义，那么对象内的this就指向那里的this
let obj = {
    name:"xiaoming",
    age:10,
    fun:function () {
        console.log(this)
    },
    fun1:()=>{console.log(this)}
};

//obj.fun();  //this===>obj   因为fun执行时所在的作用域为对象obj
//obj.fun1(); //this===>{}

let obj1 = {
    name:"xiaoming",
    age:10,
    fun:function () {
        let innerobj = {
            name:'lilei',
            age:20,
            innerfun:function () {
                console.log(this)
            },
            innerfun1:()=>{console.log(this)}
        };
        //innerobj.innerfun();
        //innerobj是在fun中定义的，所以this指向fun的this，而fun是obj调用的，this指向obj，故innerobj的this指向obj
        innerobj.innerfun1();
    },
    fun1:()=>{
        //箭头函数中的this指向{}
        //innerobj在箭头函数中定义，innerobj的this指向{}
        let innerobj = {
            name:'lilei',
            age:20,
            innerfun:function () {
                console.log(this)
            },
            innerfun1:()=>{console.log(this)}
        };
        innerobj.innerfun1();
    }
};

//obj1.fun1();



{
    let a =10;
    (()=>{
        console.log(this)
    })()
}


function fn1(name) {
    (()=>{console.log(this)})();
    this.name = name;
    this.say = ()=>{
        console.log(this)
    };

    //obj在fn1中定义，fn1中的this指向global，所以obj的this指向global
    let obj = {
        name:'hanleilei',
        age:this
    };
    console.log(obj)
}
//fn1('weidehai');
//new一个对象时，发生以下事件
//1.新建一个对象
//2.将this指向这个对象
//3.在这个对象上添加方法和属性
//4.返回this
new fn1("weidehai");



let k={
    name:"xiaoming",
    get get_name(){
        return this.name
    },
    //对set_name的赋值操作进行拦截
    set set_name(val){
        this.name = val
    }
}

console.log(k.name)
console.log(k.get_name)
k.set_name = "weidehai"
console.log(k.get_name)