// 1.手写bind，call，apply，eventsub
// 2.数组扁平化
// 3.基本排序算法，选择排序，冒泡排序，快速排序，归并排序
// 4.看过的书籍（js高级编程，熟悉目录结构，重点章节）
// 5.重绘，回流
// 6.BFC
// 7.promise的链式调用，all，race方法，错误捕获，resolve和reject方法
// 8.web安全 sql注入，xss跨站脚本攻击，csrf跨站访问
// 9.手写防抖（一段时间内只处理最新的事件）和节流(一段事件内只处理一次事件)
// 10.手写实现new操作符
// 11.手写instanceof方法


//手写bind
Function.prototype.myBind = function (custom_ctx) {
    let _self = this
    console.log(this)
    console.log(custom_ctx)
    custom_ctx.func = this
    console.log(custom_ctx)
    //改造，使之支持new
    //1.构造原型链
    function FN() {}
    FN.prototype = this.prototype
    f.prototype = new FN()

    /*
    此时的this指向调用myBind的函数也就是原函数，将原函数赋值给custom_ctx（就是指定的目标this）的func属性，就是拷贝一份函数过去
    这样执行custom_ctx.func就相当于执行了原函数，this指向custom_ctx，因为是custom_ctx调用的函数
     */
    function f(arguments) {
        if (this instanceof _self){
            //如果是new一个对象，返回的就是f这个函数的this，将this绑定为f函数的this，则原函数的属性就会写到f这个函数的this上，看起来就像new了原函数一样，对目标this没有影响
            _self.call(this,arguments)
        }else{
            custom_ctx.func(arguments)
        }
    }
    return f
    // bind函数会形成闭包
}
/*
从上面的代码执行结果中我们发现一点，第一次bind绑定的对象是固定的，也就是后面通过bind或者call再次绑定的时候，就无法修改这个this了，从es5文档中我们能找到答案。
When the [[Call]] internal method of a function object, F, which
was created using the bind function is called with a this value and a
list of arguments ExtraArgs, the following steps are taken:
Let boundArgs be the value of F’s [[BoundArgs]] internal property.
Let boundThis be the value of F’s [[BoundThis]] internal property.
Let target be the value of F’s [[TargetFunction]] internal property.
Let args be a new list containing the same values as the list
boundArgs in the same order followed by the same values as the list
ExtraArgs in the same order.
Return the result of calling the [[Call]] internal method of target
providing boundThis as the this value and providing args as the
arguments.
这段话中说到如果我们在一个由bind创建的函数中调用call，假设是x.call(obj,y,z,…)并且传入this，和参数列表的时候会执行下面的步骤：
1.首先用三个参数分别保存函数x函数的内部属性中存的this值、目标函数和参数 列表。
2.然后执行目标函数的内部call函数，也就是执行目标函数的代码，并且传入1中保存的this和实参(这里的实参是目标函数本来就有的也就是bind时传入的实参加上调用call时传的实参)
重点在1中，从es5的bind函数说明中我们知道，当我们用一个函数调用bind的时候，返回的函数中会保存这三个参数。所以最后调用call的时候执行的函数是目标函数，也就是调用了bind的函数，
传入的this也是bind调用时传入的，这些都是无法被修改的了，但是参数是调用bind和call时的叠加，这是我们唯一可以修改的地方。执行两次bind的原理可以参考bind的源码，
和call的差不多，也是目标函数和this是被固定的了，只有参数列表会叠加。
*/
let a = {
    name:"weidehai",
    say(words){
        console.log(words)
    }
}
let b = {
    name:"xiaoming"
}

function c(name){
    this.name = name
    console.log(this.name)
}


a.say()
a1 = a.say.myBind(b)

c1 = c.myBind(b)
c1("lilei")
c2 = new c1("weidehai")
/*
这里希望new一个新的实例，这个新的实例应该和b无关，但实际上已经改变了b的name
原因是new c1就会执行custom_ctx.func(arguments)，此时c中的this还是b，所以b改变了，如果想要不影响就需要判断，如果是new操作，就不能让this指向b
 */
console.log(b.name)
console.log(c2.name)

//数组扁平化
let arr = [[1,[2]],3,4,[5],6,7,[8,9,[10,11,[12,13]]]]

//[].concat(...arr)
while (arr.some(Array.isArray)){
    arr = [].concat(...arr)
}
console.log(arr)
arr = [[1,[2]],3,4,[5],6,7,[8,9,[10,11,[12,13]]]]
let find_bracket = /[\[\]]/g
// 1、map
// 首先map 就是将原数组 映射成 新的数组；
// 2、filter
// 对数组中的每个元素都执行一次指定的函数（callback），并且创建一个新的数组，该数组元素是所有回调函数执行时返回值为 true 的原数组元素。
// 它只对数组中的非空元素执行指定的函数，没有赋值或者已经删除的元素将被忽略，同时，新创建的数组也不会包含这些元素。

//filter
{
    let newarr=[]
    newarr = arr.toString().replace(find_bracket, "").split(",").filter(value => {
        return parseInt(value)
    })
    console.log(newarr)
}
//foreach
{
    let newarr=[]
    arr.toString().replace(find_bracket, "").split(",").forEach(value => {
        newarr.push(parseInt(value))
    })
    console.log(newarr)
}
//reduce
{
    let newarr=[]
    newarr = arr.toString().replace(find_bracket, "").split(",").reduce((previousValue,currentValue) => {
       previousValue.push(parseInt(currentValue))
       return previousValue
    },[])
    console.log(newarr)

}
//map
{
    let newarr=[]
    newarr= arr.toString().replace(find_bracket, "").split(",").map(value => {
        return parseInt(value)
    })
    console.log(newarr)

}

//手写事件订阅
class EventSub {
    constructor(){
        this.events = {}
    }
    on(type,handle){
        if (!this.events[type]){
            this.events[type] = []
        }
        this.events[type].push(handle)
    }
    off(type,handle){
        if (!this.events[type]){
            throw "this event not exist"
        }
        let pos = this.events[type].indexOf(handle)
        this.events[type].splice(pos,1)
    }
    once(type,handle){
        let self = this
        function f(...rest) {
            handle(...rest)
            self.off(type,f)
        }
        this.on(type,f)
    }
    emit(type,...rest){
        if (!this.events[type] || !this.events[type].length){
            return
        }
        this.events[type].forEach((handle)=>{
            handle(...rest)
        })
    }
}


let eventsub = new EventSub()
function myhandle1(...rest) {
    console.log(...rest)
}
function myhandle2(...rest) {
    let k = [...rest]
    console.log(k[2])
}
function myhandle3(...rest) {
    let k = [...rest]
    console.log(k[3])
}

eventsub.on("click",myhandle1)
eventsub.on("click",myhandle2)
eventsub.once("click",myhandle3)
eventsub.emit("click",1,2,3,4)
eventsub.off("click",myhandle1)
eventsub.emit("click",1,2,3,4)


//手写new
function mynew(origin,...args) {
    let obj = {}
    obj.__proto__ = origin.prototype
    let result = origin.call(obj,...args)
    console.log(result)
    if (typeof result === "function" || typeof result === "object"){
        return result
    }
    return obj
}

function test(name,age){
    this.name = name
    this.age = age
    return "22"
}

let t = mynew(test,"lilie","24")
console.log(t)

//手写instanceof
function my_instanceof(origin,target) {
    while (target){

        if (target.__proto__ === origin.prototype){
            return true
        }
        target = target.__proto__
    }
    return false
}

function parent() {

}

parent.prototype = new String("weidehai")


let child = new parent()
let tt = function(){}
console.log(child)
console.log(my_instanceof(parent,child))
console.log(my_instanceof(String,child))
console.log(my_instanceof(Object,child))
console.log(my_instanceof(Object,parent))
console.log(my_instanceof(Object,tt))
console.log(my_instanceof(Object,2222))


//手写冒泡排序
function bubbing_sort(list) {
    let len = list.length
    for (let i=0;i<len;i++){
        for (let j=0;j<len-i-1;j++){
            if (list[j]>list[j+1]){
                [list[j],list[j+1]] = [list[j+1],list[j]]
            }
        }
    }
}

let kk = [92,5,4,13,94,73,1,493,30,20]
//bubbing_sort(kk)
//console.log(kk)

//手写选择排序
function select_sort(list) {
    let len = list.length
    for (let i=0;i<len;i++){
        for (let j=i+1;j<len;j++){
            if (list[i]>list[j]){
                [list[i],list[j]] = [list[j],list[i]]
            }
        }
    }
}
select_sort(kk)
console.log(kk)

//手写快速排序
function quikly_sort(low,high,list,temp) {
    let position
    if (high-low<=1) return;
    position = cut(low,high,list,temp)
    console.log(position)
    console.log(list)
    quikly_sort(low,position,list,list[low])
    quikly_sort(position+1,high,list,list[position+1])
}

function cut(low,high,list,temp) {
    while (low<high){
        while (low<high && list[high]>=temp){
            high--
        }
        [list[low],list[high]] = [list[high],list[low]]

        while (low<high && list[low]<=temp){
            low++
        }
        [list[high],list[low]] = [list[low],list[high]]
    }
    console.log(low,high);
    return low
}

let l = [99,12,136,9856,136,135,1326,1356,4,9,10,12,136,9856,136,135,1326,135,622,5];
quikly_sort(0,l.length-1,l,l[0])
console.log(l)

//手写promise
class MyPromise {
    constructor(executor) {
        this.states = ["pending","fulfilled","reject"]
        this.state = this.states[0]
        this.value = null
        this.callbacks = []
        executor(this.resolve.bind(this),this.reject.bind(this))
    }
    resolve(value){
        if (this.state===this.states[0]){
            this.state = this.states[1]
            this.value = value
        }
    }
    reject(reason){
        if (this.state===this.states[0]){
            this.state = this.states[2]
            this.value = reason
        }
    }
    then(onfulfilled,onreject){
        if (this.state===this.states[1]){
            onfulfilled(this.value)
        }
        if (this.state===this.states[2]){
            onreject(this.value)
        }
    }
    static resolve(value){
        return new MyPromise((resolve,reject)=>{
            resolve(value)
        })
    }


}


// new Promise((resolve,reject)=>{
//     resolve("success")
// }).then(value => {
//     console.log(value)
//     return "ddd"
// }).then(value => {
//     console.log(value)
// })

MyPromise.resolve("weidehai").then(value=>{
    console.log(value)
})


//websocket
/*
websocket的特点：
1.基于TCP的协议，由通信协议和编程API组成。
2.能够在浏览器和服务器之间建立双向连接，以基于事件的方式，赋予浏览器实时通信能力。
即服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话。
3.数据格式比较轻量，性能开销小，通信高效。
4.可以发送文本，也可以发送二进制数据。
websocket的使用场景：
社交聊天、弹幕、多玩家游戏、协同编辑、股票基金实时报价、体育实况更新、视频会议/聊天、基于位置的应用、在线教育、智能家居等需要高实时的场景。
 */
/*
性能优化
对MVC MVP MVVM的了解
对SEO的了解
国内前端行业的发展
怎么看待组件层级嵌套很多层
介绍状态机
1.状态有限
2.通过输入能改变状态
3.状态的转化是有规律的
组件设计原则
对vuex的看法
项目开发流程
怎么看待virtual dom
渐进增强和优雅降级
渐进增强（progressive enhancement）：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。（从被所有浏览器支持的基本功能开始，逐步地添加那些只有新式浏览器才支持的功能，向页面添加无害于基础浏览器的额外样式和功能。当浏览器支持时，它们会自动地呈现出来并发挥作用。）
优雅降级（graceful degradation）：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。（Web站点在所有新式浏览器中都能正常工作，如果用户使用的是老式浏览器，则代码会检查以确认它们是否能正常工作。由于IE独特的盒模型布局问题，针对不同版本的IE的hack实践过优雅降级了，为那些无法支持功能的浏览器增加候选方案，使之在旧式浏览器上以某种形式降级体验却不至于完全失效。）
区别：优雅降级是从复杂的现状开始，并试图减少用户体验的供给，而渐进增强则是从一个非常基础的、能够起作用的版本开始，并不断扩充，以适应未来环境的需要。
为什么利用多个域名来提供网站资源会更有效
请说出三种减少页面加载时间的方法
你都使用哪些工具来测试代码的性能
浏览器标准模式和怪异模式之间的区别是什么
你最喜欢的图片替换方法是什么，你如何选择使用
为什么响应式设计和自适应设计不同
响应式是流布局，它会自动适应屏幕大小，不管是什么设备。响应式使用CSS完成设备判断。这种基于网格的流布局会自动调整网页的高度和宽度来使用不同尺寸的屏幕，并让其现实正确。
自适应则采取多个不同的布局设计，多个屏幕的尺寸，使用哪个布局取决于屏幕类型。自适应作品用屏幕尺寸来决定用哪套布局。
 */