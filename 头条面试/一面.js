/*
**浏览器的两种缓存机制
* 1.强缓存 cache-control expires
* 2.协商缓存 last-modify/if-modify-since   Etag/if-None-Match
 */

/*
vue 双向绑定的原理
监听输入框的input事件
如何实现父子组件的双向绑定
1.使用$emit方法，即父组件@xxx去监听子组件发生的事件，子组件$emit去触发这个监听的事件，并把需要双向响应的参数传入
2.使用model对象
 */

/*
nextThick的原理
 */

/*
如何防止对象被修改
1ct.preventExtensions()。调用改方法，则不能向对象中新添加属性和方法了，但是可以修改对象中存在的属性
2.Object.isExtensible()这个方法可以确定对象是否为可篡改
3.Object.seal()。密封的对象不能新添加属性、不能删除属性。拥有了不可扩展对象的特性。
4.Object.freeze()：冻结的对象，即是不可扩展的，也是密封的，而且其属性的特性[[Writable]]被设置为false，也就是说属性值也不能修改。
注意：修改了configurable只是属性不能被删除，特性（指的是属性的数据属性和访问器属性，而非值）不能改变.Obje
 */

/*
Object.assign和Array.concat方法是深拷贝还是浅拷贝
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

obj.fun();  //this===>obj   因为fun执行时所在的作用域为对象obj
obj.fun1(); //this===>在node中{}，在浏览器中是window，因为对象字面量是没有this的。所以指向了全局

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
        //innerobj是在fun中定义的，所以this指向fun的this，而fun是obj调用的，this指向obj，故innerobj的this指向obj，所以这里主要看fun是谁调用的
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

obj1.fun()
obj1.fun.call({}) //这样就可以动态指定箭头函数的this
obj1.fun1();



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

    //如果直接调用fn1，即把fn1作为一个普通函数调用，obj在fn1中定义，fn1中的this指向global，所以obj的this指向global
    //如果把fn1作为构造函数调用，则this指向fn1
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
//3.我们将这个空对象的__proto__成员指向了Base函数对象prototype成员对象
//4.在这个对象上添加方法和属性
//5.返回this
fn1("xiaoming")
new fn1("weidehai");





/*
对http2.0的了解(对比http1.0说明)
http2.0是对1.0的增加，不是替代，2.0保留了原先的所有标准，并在此基础上建立了新的标准，主要是spdy协议
spdy协议目的是优化http协议的性能，通过压缩，多路复用和优先级技术缩短页面的加载时间，同时在安全方面也进行了增强
spdy协议的核心是减少tcp的连接数
----------------http1.0的缺点-------------
1.一次只允许在一个tcp连接上发一个请求，存在请求队列阻塞的问题
2.单向请求，只能由客户端发起
3.请求报文与响应报文首部信息冗余量大
4.数据未压缩
-----------http2.0的改进--------------------
1.二进制传输，2.0采用的新的编码机制，在http和tcp中间增加了一个二进制分帧层，用来分割数据，分割单位为帧，2.0中一个重要的概念，是帧和流，帧是最小的
  数据单位，每个帧会标识自己属于哪个流，流由多个数据帧组成
2.多路复用，即一个tcp连接中存在多个请求，即多个流，多个流可以同时发送数据，因为帧上的流标识可以保证服务器正确识别数据对应的请求，但由于tcp的重传机制
  若发生丢包的情况（因为tcp是一种可信的连接，发生丢包会重传，udp不会），也会阻塞请求队列
3.Header压缩 1）使用压缩算法压缩数据  2）维护键值对，若客户端不改变Header信息，那么只需要发送键名，服务端从键值对中获取值
4.服务器主动Push
 */

/*
tcp和udp的区别，及使用场景
--------------tcp-------------
优：
tcp是面向连接的，正式通信之前需要建立连接
tcp提供可靠的服务，也就是说，通过tcp传输的数据无差错，不丢失，不重复，按序到达
tcp是面向字节流的
缺：
一个tcp连接只能是一对一的连接
tcp连接占用资源多
tcp传输速度慢
场景：
需要保证数据完整，正确性的应用
如：文本聊天，邮件发送，文件传输等
------------udp-----------------
优：
udp是基于数据报的
udp对系统资源要求少
udp支持一对多
udp传输速度块，实时性高
缺：
udp不保证数据顺序
udp可能丢包
场景：
重视交互的实时性，效率性，多丢包不敏感。需要一对多传输的情况
如：直播，实时游戏，物联网
 */

/*
常见http状态码及其含义
---------------------分类----------------
五大类：
1**  信息。服务器收到请求，请求继续执行
2**  成功。请求被成功接受并处理
3**  重定向。需要进一步的操作来完成
4**  客户端错误。无法完成请求或请求包含错误语法
5**  服务端错误。服务器在处理请求的过程中发生错误
--------------常见状态码--------------
200   服务器已成功处理了请求。
206   服务器成功处理了部分请求。

301   已永久移动到新位置，即永久重定向。
302   暂时跳转到其他页面，即暂时重定向。
304   客户端有缓冲的文档并发出了一个条件性的请求。服务器告诉客户端，原来缓冲的文档还可以继续使用。

400   错误请求，服务器无法解析该请求。
401   未授权请求，没有进行身份验证或验证未通过。
403   禁止访问服务器，拒绝此请求。
404   未找到服务器，找不到请求的网页。

500   服务器内部错误服务器遇到错误，无法完成请求。
502   错误网关服务器作为网关或代理，从上游服务器收到无效响应。
 */





/*
*实现一个深拷贝（并且考虑循环引用）
 */
//深度优先遍历
const visited = new WeakMap()
function deepcopy(origin) {
    let target = Array.isArray(origin)?[]:{}
    if (visited.get(origin)){
        return visited.get(origin)
    }
    visited.set(origin,target)
    for (let key in origin){
        if(origin[key]===null){
            target[key] = null
            continue
        }
        if (typeof origin[key] !== "object") {
            target[key] = origin[key]
        }else {
            target[key] = deepcopy(origin[key])
        }
    }
    return target
}

//DFS循环版
function DFS(origin) {
    let keys = Object.keys(origin)
    let target = Array.isArray(origin)?[]:{}
    let current_key = keys.pop()
    let stack = []
    let visited = new WeakMap()
    visited.set(origin,target)
    while(current_key){
        if (origin[current_key]===null || origin[current_key]!=="object"){
            target[current_key] = origin[current_key]
            current_key = keys.pop()
            if (!current_key){
                stack_out = stack.pop()
                if (stack_out){
                    origin = stack_out.origin
                    keys = stack_out.keys
                    target = stack_out.target
                }else{
                    break
                }
            }
        }else {
            if (visited.get(origin[current_key])){
                target[current_key] = visited.get(origin[current_key])
            }
            stack.push({
                "origin":origin,
                "target":target,
                "keys":keys
            })
            target = Array.isArray(origin[current_key])?[]:{}
            visited.set(origin[current_key],target)
            origin = origin[current_key]
            keys = Object.keys(origin)
            current_key = keys.pop()
        }
    }
    return target
}


//广度优先遍历
let queue = []
let temp_key = []
let temp_target = []
function deepcopy2(origin,target=null,key=""){
    target = target?target:Array.isArray(origin)?[]:{}
    if (visited.get(origin)){
        target[key] = visited.get(origin)
        return
    }
    visited.set(origin,target)
    target = key?target[key]:target
    for(let key in origin) {
        if (origin[key] === null || typeof origin[key] !== "object") {
            target[key] = origin[key]
        } else {
            target[key] = Array.isArray(origin[key])?[]:{}
            queue.push(origin[key])
            temp_key.push(key)
            temp_target.push(target)

        }
    }
    origin = queue.shift()
    while (origin){
        deepcopy2(origin,temp_target.shift(),temp_key.shift())
        origin = queue.shift()
    }
    return target
}


//广度优先遍历循环版本
function BFS(origin){
    let visited = new WeakMap()
    let target = Array.isArray(origin)?[]:{}
    let result = target
    let queue = []
    let temp_target = []
    visited.set(origin,target)
    while (origin) {
        for (let key in origin) {
            if (origin[key] === null || typeof origin[key] !== "object") {
                target[key] = origin[key]
            } else {
                if (visited.get(origin[key])){
                    target[key] = visited.get(origin[key])
                    continue
                }
                target[key] = Array.isArray(origin[key]) ? [] : {}
                queue.push(origin[key])
                temp_target.push(target[key])

            }
        }
        origin = queue.shift()
        target = temp_target.shift()
    }
    return result
}

let a = {
    name:"xiaoming",
    age:25,
    sex:null,
    money:NaN,
    say:function () {
        console.log("my name is xiaoming")
    },
    friend:["wei","li"],
    course:{major:"math",other:"biologcal"}
}

let a1 = {
    x:1
}

a.next = a1
a1.next = a

// b = deepcopy(a)
// console.log(b)
//
// c = DFS(a)
// console.log(c)
// c = deepcopy2(a)
// console.log(c)

c = BFS(a)
console.log(c)