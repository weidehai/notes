/*
1.利用解构实现两个变量的交换
 */

const {log} = console
let x = 10,y=20;

[x,y] = [y,x];
log(x);


/*
*2.利用数组推导，计算出数组[1,2,3,4]每一个元素的平方组成的新数组
 */

let arr = [1,2,3,4];
arr.forEach((value,index) => {
    arr[index] = Math.pow(value,2)
})
log(arr);



/*
*3.简述同步和异步的区别：
* --------------------------
* 我们首先要知道js的特性单线程。所谓单线程就是在没有完成这件事情的之前不会去做下件事情
那么同步也就是好理解了。上件事情没有完成，就继续做上件事情，等上件事情完成后才会去做下一件事情，js的大部分编程都是同步的。
异步就完全不同了，将异步任务交给子线程处理，每个任务都有一个或者多个回调函数(callback),子线程处理完成之后将回调函数放入任务队列，主线程在合适的时间取出任务队列中的任务执行
后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的
说到这里就不得不说下异步运行机制
（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
（4）主线程不断重复上面的第三步。
 */



/*
**4.创建、添加、复制、删除、替换、查找节点
 */

//创建：
// let ul = document.md.createElement('ul');
// let li1 = document.md.createElement('li');
// let li2 = document.md.createElement('li');
// let textnode = document.md.createTextNode('weidehai');
//
// //添加
// ul.appendChild(li1);
// li1.append(textnode);
    // ul.insertBefore(li2,li1);
//
// //删除
// ul.removeChild(li1);
//
// //替换
// let li3 = document.md.createElement('li3');
// ul.replaceChild('li3');

//复制---参数设置为 true，克隆节点及其属性，以及后代；设置为 false，克隆节点本身
//ul.cloneNode(false);


//查找
// let i = document.md.getElementsByClassName('i');
// let j = document.md.getElementsByTagName('i');
// let k = document.md.getElementById('i');
// let l = document.md.querySelectorAll('#id');
// let n = document.md.querySelector('.class');//传入一个选择器参数,类似css语法的选择器
// let m = document.md.getElementsByName('weidehai')


/*
*5.实现一个克隆函数，能够对5种基本数据类型进行克隆 string，number，array，boolean，object
 */

function clone(obj) {
    switch (typeof obj) {
        case "string":
            return obj;
        case "number":
            return obj;
        case "boolean":
            return obj;
        case "undefined":
            return obj;
        case "object":
            if(obj.constructor===Array) {
                let newarr = [];
                for (let v of obj) {
                    newarr.push(v);
                }
                return newarr;
            }else {
                let newobj = {};
                for (let key in obj){
                    if(typeof obj[key] === "object"){
                        newobj[key] = clone(obj[key]);
                    }else {
                        log(obj[key]);
                        newobj[key] = obj[key];
                    }
                }
                return newobj;
            }
    }
}

log(typeof NaN,typeof undefined,typeof null,);
log([1,2,3].constructor);
log(Object.prototype.toString.call([1,2,3]));
let a;
let b = clone(a);
a=2;
log(b,a);
let arr2 = [4,5,6];
let arr3 = clone(arr2);
arr2[1] = 7;
log(arr3,arr2);


let myobj = {
    name:'weidehai',
    sex:'male',
    age:22,
    broter:{
        name: 'liming',
        sex: 'male',
        age:23
    }
};
let clonewei = clone(myobj);
myobj.broter.name = 'wangjiawei';
log(clonewei);



/*
*消除一个数组种的重复元素,用set
 */

let myarr = [1,2,3,4,5,4,2,6,];
log([...new Set(myarr)]);


/*
***写一个返回闭包的函数
 */


function bibao() {
    let k = 10;
    function inline() {
        log(`父函数的k:${k}`);
    }
    return inline;
}

let b1 = bibao();
log(b1);
b1();

/*
***使用递归完成1到100的累计
 */

function accumulation(result=0,newvalue=1) {
    if(newvalue>100) return result;
    result = result + (newvalue++);
    return accumulation(result,newvalue);
}
log(accumulation());

/*
*javascript有哪几种数据类型
* 1.number，string，boolen，array，object，function,undefined,null
 */

/*
*console.log(1+'2')和console.log(1-'2')的打印结果
 */

log(1-'2',1+'2');


/*
***js事件委托是什么，原理是什么
*把本应该添加到某个元素上的事件委托给他的父级，从而减少DOM交互达到网页优化。利用的原理是冒泡的原理和event.target，事件会冒泡到父级元素
* 同时event.target会保存这个事件是从哪个元素冒泡而来
* 优点：
* 1.相比为每个子元素添加一个事件可以节省内存
* 2.即使父元素添加了新的节点这个节点仍然可以通过冒泡来触发这个事件
 */


/*
***如何改变函数内部的this指向
*call,bind,apply
* call和apply的区别就是传参的形式不一样，两者都是立即执行
*   call传递参数的方法call(obj,arg1,arg2,....)
*   apply传递参数的方法apply(obj,[arg1,arg2,....])
* bind绑定了this后，返回一个函数，并没有执行
*   bind传参与call一样
 */

function multiplication() {
    return this.x*this.y*this.z;
}

let data = {
    x:1,
    y:2,
    z:3
};

log(multiplication.apply(data));
log(multiplication.call(data));
log(multiplication.bind(data)());


function multiplication2(x,y,z) {
    log(this);
    return x*y*z;
}

let t = 'weidehai';

log(multiplication2.apply(t,[1,2,3]));
log(multiplication2.call(t,1,2,3));
log(multiplication2.bind(t,1,2,3)());

/*
**列举几种跨域的解决方式并说明原理
* 1.jsonp
* 原理：<script>标签种的js文件加载不受同源策略限制，所以可以用这个方法来获取数据，具体原理
*   在服务端建立一个js文件，假设是callback.js,代码如下
*callbackfunction({data:data})
*   客户端html文件引用这个js
* <script src="others_server/callback.js"></script>
*   然后写下一下脚本
* <script>callbackfunction(data){console.log("这是服务端传来的数据:" + data)}</script>
* 因为js文件会被解释器执行，所以解释器会执行callbackfunction({data:data})，也就是说会调用这个callbackfunction函数，参数是{data:data}
* 2.CORS
* CORS需要浏览器和服务器同时支持。
*整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。
*浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口,就可以跨源
*当发起一次跨域请求，浏览器会自动检测这次请求为跨域，自动在头信息之中添加一个Origin字段，这个Origin字段就表示了访问来的来源，由服务器根据这个站点来判断是否要返回数据
*规定服务的返回响应头必须要有Access-Control-Allow-Origin字段，如果没有这个字段浏览器就会报错
 */


/*
***谈谈垃圾回收的机制及内存管理
* Javascript具有自动垃圾回收机制(GC:Garbage Collecation)，也就是说，执行环境会负责管理代码执行过程中使用的内存
* js的垃圾回收机制：每隔一段时间，就会gc，来回收那些没有被任何变量引用的对象
* 不再使用的变量也就是生命周期结束的变量，当然只可能是局部变量，全局变量的生命周期直至浏览器卸载页面才会结束。
* 局部变量只在函数的执行过程中存在，而在这个过程中会为局部变量在栈或堆上分配相应的空间，以存储它们的值，然后在函数中使用这些变量，直至函数结束
* 闭包中由于内部函数的原因，外部函数并不能算是结束。
* 到底哪个变量是没有用的？所以垃圾收集器必须跟踪到底哪个变量没用，对于不再有用的变量打上标记，以备将来收回其内存。
* 用于标记的无用变量的策略可能因实现而有所区别，通常情况下有两种实现方式：标记清除和引用计数。引用计数不太常用，标记清除较为常用。
* 1.标记清除：
* 垃圾回收器在运行的时候会给存储在内存中的所有变量都加上标记（当然，可以使用任何标记方式）。然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记（闭包）。
* 而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后，垃圾回收器完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间
* 2.引用计数：
* 引用计数的含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋给该变量时，则这个引用类型值的引用次数就是1。
* 同时如果这个值又被赋给另一个变量，则该值的引用次数加1；而当引用这个值的变量被赋了另一个值，那原来的值的引用次数就减1，当引用次数为0时就回收
* ----------------------------------------------------------
* 循环引用为什么会造成内存泄漏？
*
function circularReference() {
  let obj1 = {
	};
	let obj2 = {
 	 b: obj1
	};
	obj1.a = obj2;
}
*分析上面一段代码。给obj1赋值为空对象，这个空对象引用+1，接下来 obj2 的 b 属性又指向了 obj1 这个对象，所以此时 obj1 这个对象的引用计数为 2。同理 obj2 这个对象的引用计数也为2.
*当代码执行完后，会将变量 obj1 和 obj2 赋值为 null（这里不要以为置为null就释放了内存，其实没有，上面说了，当一个变量指向另一个值时，那么这个变量原来指向的值的引用会-1，而原来是2，-1后变成1），所以并不会进行垃圾回收，但是这两个对象已经没有作用了，在函数外部也不可能使用到它们，所以这就造成了内存泄露。
* -------------------------------------------------------------------
 */

/*
**js继承的方法有哪些？
* 1.原型继承
* ---------------------------
* 优点：1、实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）
　缺点：1、新实例无法向父类构造函数传参。？？？？
　　　　2、继承单一。
　　　　3、所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）
* ------------------------------------------
* 2.借用构造函数继承
*-------------------------------------
* 特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。
　　　　2、解决了原型链继承缺点1、2、3。
　　　　3、可以继承多个构造函数属性（call多个）。
　　　　4、在子实例中可向父实例传参。？？？？？？？？？？？
　缺点：1、只能继承父类构造函数的属性。
　　　　2、无法实现构造函数的复用。（每次用每次都要重新调用）
　　　　3、每个新实例都有父类构造函数的副本，臃肿。
* ------------------------------------
* 3.组合继承
* -------------------------------------
* 特点：1、可以继承父类原型上的属性，可以传参，可复用。
　　　　2、每个新实例引入的构造函数属性是私有的。
　缺点：调用了两次父类构造函数（耗内存）
* -------------------------------------
* 4.原型式继承
* ------------------------------------------------------
* 特点：类似于复制一个对象，用函数来包装。
　缺点：1、所有实例都会继承原型上的属性。
　　　　2、无法实现复用。（新实例属性都是后面添加的）
* -------------------------------------------------------
* 5.寄生式继承
* --------------------------------------------
* 优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
　缺点：没用到原型，无法复用。
* ----------------------------------------------
* 6.寄生组合式继承
*
 */

function parent() {
    this.run = function () {
        log('running....');
    }
    this.jump = function () {
        log('jumping.....')
    }
}

parent.prototype.sing = function () {
    log('singing......')
}

function children(name) {
    this.name = name
}

children.prototype = new parent();
//children.prototype.constructor = children;
let c = new children('weidehai');
//c.run();
//c.jump();
c.sing();
let cc = new children.prototype.constructor('xiaoming');
log(cc.name);
function children1() {
    parent.call(this);
}

let c1 = new children1();
c1.run();

//原型式继承(基类继承)
function baseObjectPerson(name,friend) {
    this.name = name;
    this.friend = friend;
    this.say = function () {
        log('saying....')
    }
    this.eat = function () {
        log('eating....')
    }
}

function objectCreate(baseObject,name,friend) {
    function F() {}
    F.prototype = new baseObject(name,friend);
    return new F();
}

let xiaoming = objectCreate(baseObjectPerson,'xiaoming','wangwei');
log(xiaoming.name);
log(xiaoming.friend);
xiaoming.eat();

let bo = {
    name:'weidehai',
    friend:'hanmeimei'
}

let w = Object.create(bo,{age:{
        writable:true,
        configurable:true,
        value:22
    },sex:{
        writable:true,
        configurable:true,
        value:'male'
    }});
log(w.name,w.friend,w.age,w.sex);
//寄生继承
//自己不去没有直接去继承父类，而是借助一个空对象继承父类的原型，自己在去继承这个空对象

function shell() {}
shell.prototype = parent.prototype;
function son() {
    parent.call(this);
}

son.prototype = new shell();

/*
***箭头函数和普通函数的区别
 */
//1.语法不同
function normal() {
    log('i am a normal function');
    log('i invoked by ' + this)
}
let arrow = ()=>{
    log('i am a arrow function');
    log('i invoked by ' + this)
}

normal();
arrow();
//2.箭头函数都是匿名函数，普通函数可以是匿名也可以是具名
//3.箭头函数的this指向固定，指向其被定义的环境，普通函数的this指向不固定，指向调用其的对象
//4.箭头函数不能用于构造函数,不具有原型对象，不具有arguments对象



/*
**new 操作符干了什么
* 1.创建一个空对象
* 2.将空对象的原型指向构造函数的原型
* 3.绑定this指向空对象，执行构造函数的代码
* 4.若构造函数的返回值是值类型，返回新创建的对象，若是引用类型则返回这个引用类型
 */



/*
*ajax原理：异步的原理，将ajax耗时请求交给浏览器的专门的线程去处理，并指定一个回调函数，当请求返回时，将数据作为参数传入回调函数，并将回调函数放入任务队列，
* js主线程执行完任务后，根据事件循环机制，会不断的到任务队列中取出任务执行
 */

/*
*模块化开发怎么做
* 1.立即执行函数
* 2.commondjs
* 3.AMD,CMD
* 4.ES6模块
 */

/*
*异步加载js的方法
* 1.将js放在body标签后
* 2.Script Dom Element
* (function(){
    var scriptEle = document.md.createElement("script");
    scriptEle.type = "text/javasctipt";
    scriptEle.async = true;
    scriptEle.src = "http://cdn.bootcss.com/jquery/3.0.0-beta1/jquery.min.js";
    var x = document.md.getElementsByTagName("head")[0];
    x.insertBefore(scriptEle, x.firstChild);
 })();
 *上面的代码会将在onload处阻塞
 * (function(){
    if(window.attachEvent){
        window.attachEvent("load", asyncLoad);
    }else{
        window.addEventListener("load", asyncLoad);
    }
    var asyncLoad = function(){
        var ga = document.md.createElement('script');
         ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.md.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.md.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    }
})();
  *添加监听事件，进入了onload后再请求js脚本，这样就不会在onload处阻塞了
* 3.<script>标签的defer="defer"属性
* <script type="text/javascript" defer></script>
* 4.es6模块type="module"属性
* 浏览器对于带有type=”module”的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性 。如下：
* <script type="module" src="XXX.js"></script>
 */



/*
***xml（可扩展标记语言）和json（数据交换格式）的区别
* 1.xml是重量级的，json是轻量级的  ----体积
* 2.xml在传输过程中比较占带宽，json占带宽少，易于压缩。  ----速度
* 3.xml和json都用在项目交互下，xml多用于做配置文件，json用于数据交互。
* 4.数据描述方面，JSON对数据的描述性比XML较差
* 5.xml数据结构层次更加清晰
 */



/*
*webpack如何实现打包
* webpack是js静态模块打包器，在webpack里一切文件皆模块
* 1.从入口文件开始进行词法和语法的解析，生成AST
* 2.根据AST找出依赖模块，对于非js模块，调用对应loader进行解析
* 3.将各个引用模块解析成一个立即执行函数输出
* 4.将高级语法转化为低级语法
* 5.将输出内容写入一个bundle.js目标文件
 */


/*
**web安全
* 1.sql注入
* 如果后端sql查询语句写的不好，例如使用拼接方式构建查询语句，就有了能造成sql注入漏洞，因为后端经常会根据前端传来的参数进行查询，那么用户就可以通过输入sql命令来
* 达到查询数据库中其他信息的目的
* ----预防办法1.通过使用占位符预编译sql语句，使得用户传来的参数只作为参数使用而不是语句的一部分
* 2.xss跨站攻击
* 原理：攻击者根据网站提供的一些功能，例如发表文章，添加链接等等，通过这些功能将一些html标签或js脚本上传到服务器，别返回给浏览者，而这些用户上传的东西是不安全的
* -----预防措施：1.首先代码里对用户输入的地方和变量都需要仔细检查长度和对”<”,”>”,”;”,”’”等字符做过滤；其次任何内容写到页面之前都必须加以encode
* 3.CSRF跨站点请求伪造
* CSRF是代替用户完成指定的动作，需要知道其他用户页面的代码和数据包。
* 要完成一次CSRF攻击，受害者必须依次完成两个步骤：
* 1.登录受信任网站A，并在本地生成Cookie。
* 2.在不登出A的情况下，访问危险网站B。
* ------CSRF的防御:1.服务端的CSRF方式方法很多样，但总的思想都是一致的，就是在客户端页面增加伪随机数。通过验证码的方法
*                  2.客户端在上传cookie中添加随机hash值，因为根据同源策略，cookie不能被外站获取，所以也就无法伪造
*xxx登录了A银行网站，就会留下登录cookie，当A访问B，B去	访问A网站，会带上A的cookie，存在风险
*token防御原理：在A服务器返回给浏览器页面时带上一个token，只有在A本网站能获取到这个token，服务器认证cookie之前要认证token，外站访问A是没有token的
 */


/*
***promise
* promise是js中对异步编程的解决方案之一
* 异步编程涉及到对结果的获取判断，异常的处理、回调函数的执行以及异步嵌套的问题等
* 以前的异步编程会造成回调地狱，嵌套过多代码就很难看懂了，易读性差
* promise支持链式回调、异常处理优化等优点，逐渐称为异步编程的主流解决方案
 */


/*
**AMD 和 CMD
* AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
* CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
* 这些规范的目的都是为了 JavaScript 的模块化开发，特别是在浏览器端的。
* 1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
* 2. CMD 推崇依赖就近，AMD 推崇依赖前置
* 3. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一
 */


/*
**web开发中会话跟踪的方法
* HTTP是一种无状态协议，每当用户发出请求时，服务器就会做出响应，客户端与服务器之间的联系是离散的、非连续的。当用户在同一网站的多个页面之间转换时，根本无法确定是否是同一个客户
* 会话跟踪技术就可以解决这个问题。当一个客户在多个页面间切换时，服务器会保存该用户的信息。
* 1.URL(统一资源定位符)是Web上特定页面的地址，URL重写的技术就是在URL结尾添加一个附加数据以标识该会话,把会话ID通过URL的信息传递过去，以便在服务器端进行识别不同的用户
* 2.Cookie：一个 Cookie 是一个小的，已命名数据元素。服务器使用 SET-Cookie 头标将它作为 HTTP响应的一部分传送到客户端，客户端被请求保存 Cookie 值，在对同一服务器的后续请求使用一个Cookie 头标将之返回到服务器。与其它技术比较，Cookie 的一个优点是在浏览器会话结束后，甚至在客户端计算机重启后它仍可以保留其值。
* 3.Session
* 4.隐藏表单域，将会话ID添加到HTML表单元素中提交到服务器,此表单元素并不在客户端显示 。
 */

/*
***js内置对象：Number，String，Boolean,Math，Date，Json，Object，Function,null,Array,Error,Global,Regexp,Arguments,
 */


/*
*null和undefiend的区别
* 1.null转化为数值0，undefined转化为数值是NaN
* 2.（1）变量被声明了，但没有赋值时，就等于undefined。
    （2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。
    （3）对象没有赋值的属性，该属性的值为undefined。
    （4）函数没有返回值时，默认返回undefined。
 */

/*
****use strict是一种ECMAscript 5 添加的（严格）运行模式,这种模式使得 Javascript 在更严格的条件下运行,
* 使JS编码更加规范化的模式,消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为。
* 默认支持的糟糕特性都会被禁用，比如不能用with，也不能在意外的情况下给全局变量赋值;
* 全局变量的显示声明,函数必须声明在顶层，不允许在非函数代码块内声明函数,arguments.callee也不允许使用；
* 消除代码运行的一些不安全之处，保证代码运行的安全,限制函数中的arguments修改，严格模式下的eval函数的行为和非严格模式的也不相同;
* 提高编译器效率，增加运行速度;
 */



/*
**js延迟加载的方式
* 1.async，defer
*   async属性是HTML5新增的。作用和defer类似，但是它将在下载后尽快执行，不能保证脚本会按顺序执行。它们将在onload 事件之前完成。
*   浏览器会并行下载 defer 属性的script，而不会阻塞页面后续处理。defer能保证js按顺序执行
* 2.在window.onload中动态添加script标签
* 3.在body标签之后载入js
 */

/*
**常见的兼容性问题
 */
/*
------------------------------------------------------------------------------------
//获取浏览器视口宽高
window.innerHeight || document.md.documentElement.clientHeight || document.md.body.clientHeight;
window.innerWidth || document.md.documentElement.clientWidth || document.md.body.clientWidth;
//页面滚动条距离顶部的距离：
document.md.documentElement.scrollTop || document.md.body.scrollTop;

document.md.documentElement.scrollLeft || document.md.body.scrollLeft;

//事件获取
e = e || window.event;
//事件源
e.target || e.srcElement

//事件监听
addEventListener();  removeEventListener()
attachEvent();detachEvent()

//获取所有的非行内样式
getComputedStyle(ele)
ele.currentStyle


//事件冒泡阻止,默认事件阻止
e.stopPropagation() || e.cancelBubble = true
e.preventDefault() || e.returnValue = false

//获取键码
e.keyCode || e.which;
--------------------------------------------------------------------------------------------
 */



/*
json和jsonp的区别?
1、区别如下：
    （1）、定义不同
    JSON是一种基于文本的数据交换方式（不支持跨域），而JSONP是一种非官方跨域数据交互协议。
    （2）、核心不同
    json的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是动态添加<script>标签来调用服务器提供的js脚本。
 */




/*
***手写一个类的继承
 */

class Person {
    constructor(name,age,sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    eat(){
        log('eating')
    }

}

class Wdh extends Person{
    constructor(props) {
        super(props);
    }
}

let student = new Wdh('weidehai',22,'male');
log(student.name);
log(student.eat());

/*
**拖拽会用到哪些事件
 */
//ele.ontouchstart || ele.onmousedown
//ele.ontouchmove || ele.onmousemove
//ele.ontouchend || ele.onmouseup



/*
路由就是链接或者说是url，浏览器根据不同的地址转跳到不同页面展示不同效果
前端路由：以描点的形式设置里，支持单页转跳
后端路由：需要向服务器发起请求，服务器决定需要转跳的页面和展示的效果
 */

/*
***xmlhttprequest 异步http请求对象，这个对象能发起http请求与服务器交互，且无需刷新页面
*xmlhttprequest.readystate状态码
* 0----未初始化
* 1----正在向服务器发送请求
* 2----已经接收到数据
* 3----正在解析数据
* 4----数据已经解析完成
 */

/*
**js上下文栈和作用域链
* 执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念，JavaScript 中运行任何的代码都是在执行上下文中运行。
* 执行上下文的生命周期包括三个阶段：创建阶段→执行阶段→回收阶段，我们重点介绍创建阶段。
* 创建阶段（当函数被调用，但未执行任何其内部代码之前）会做以下三件事：
*   创建变量对象：首先初始化函数的参数arguments，提升函数声明和变量声明。
*   创建作用域链
*   确定this指向
* 当函数执行的时候,首先会形成一个新的私有的作用域，然后依次按照如下的步骤执行：
*   如果有形参，先给形参赋值
*   进行私有作用域中的预解释，函数声明优先级比变量声明高，最后后者会被前者所覆盖，但是可以重新赋值
*   私有作用域中的代码从上到下执行
* 函数多了，就有多个函数执行上下文，每次调用函数创建一个新的执行上下文，那如何管理创建的那么多执行上下文呢？
* JavaScript 引擎创建了执行栈来管理执行上下文。可以把执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则。
* 从上面的流程图，我们需要记住几个关键点：
*   JavaScript执行在单线程上，所有的代码都是排队执行。
*   一开始浏览器执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。
*   每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行完成后，当前函数的执行上下文出栈，并等待垃圾回收。
*   浏览器的JS执行引擎总是访问栈顶的执行上下文。
*   全局上下文只有唯一的一个，它在浏览器关闭时出栈。
* 作用域：
* ES6相关 到来JavaScript 有全局作用域、函数作用域和块级作用域（ES6新增）。
* 我们可以这样理解：作用域就是一个独立的地盘，让变量不会外泄、暴露出去。也就是说作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。
*   函数作用域：顾名思义就是在这个函数体里边才能访问的变量；当然可以利用闭包来实现跨区域访问局部作用域的变量；
*   块级作用域：ES6新增，用let命令新增了块级作用域，外层作用域无法获取到内层作用域，非常安全明了。即使外层和内层都使用相同变量名，也都互不干扰；
 */



/*
**js类型转化规则
* 1.显式转化（强制转化）
* 2.隐式转化
* a、字符串和数字之间：字符串先被转换成数字，再进行比较
* b、其他类型和布尔值之间：布尔值要先被转换为数字，再进行比较
* c、null 和 undefined之间的相等比较：null == undefined  // 返回true
* d、对象和非对象之间的比较：对象会被先转换为标量基本类型（字符串/数字/布尔值），然后再进行比较
*
 */






/*
***说几条写JavaScript的基本规范？
* 1.避免定义全局变量，减少全局无染
* 2.变量尽量定义在函数头部或者使用var提升
* 3.for循环必须要加花括号
* 4.Switch语句中必须带有default分支
* 5.不要再一行内声明多个变量
* 6.写注释
* 7.变量命名--驼峰式，下划线式
 */



/*
**函数表达式和函数声明
* 函数表达式分为：
* 1.匿名函数表达式
* 2.命名函数表达式  命名函数表达式的函数名只能在函数体内部使用
 */

//函数声明
function fn1(){
    console.log(fn1.name)
};
//函数表达式
//1.匿名函数表达式
let fn2 = function () {
    console.log(fn2.name)
};
//2.命名函数表达式
let fn3 = function fnn() {
    console.log(fn3.name)
    console.log(fnn.name)
    //命名函数表达式内部函数名永远指向fnn
};
fn1();
fn2();
fn3();

//fnn(); //报错

/*
**补充
* 在javaScript中，对象的属性分为两种类型：数据属性和访问器属性。
* 一、数据属性
* 1.数据属性：它包含的是一个数据值的位置，在这可以对数据值进行读写。
* 2.数据属性包含四个特性，分别是：
* configurable：表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或能否把属性修改为访问器属性，默认为true
* enumerable:表示能否通过for-in循环返回属性
* writable：表示能否修改属性的值
* value：包含该属性的数据值。默认为undefined
* 如下面定义的_Name就是一个数据属性，通过Object.getpropertydescriptor(obj,name)就可以看到这个属性的特性
* 当然可以通过Object.defineproperty(obj,key,{
*   四大特性
* })
* 的方式来修改默认的特性，特性决定了这个属性的行为
*二、访问器属性
* 1.访问器属性：这个属性不包含数据值，包含的是一对get和set方法，在读写访问器属性时，就是通过这两个方法来进行操作处理的。
* 2.访问器属性包含的四个特性：
* configurable：表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或能否把属性修改为访问器属性，默认为false
* enumerable:表示能否通过for-in循环返回属性,默认为false
* Get：在读取属性时调用的函数,默认值为undefined
* Set：在写入属性时调用的函数,默认值为undefined
 */

/*
**get和set关键字
* get和set关键字用来定义某个属性的读写行为
* 在set函数体中，一切的return都是无效的，当只有set函数时，那这个属性是只写的，当只有get函数时，那这个属性是只读的，
* 同时有set、get函数，这个属性可读可写。    
 */
var test = {
    _Name: "Limei",
    _Age: 20,

    get name() { return this._Name;},
    set age(age) {this._Age = age;},
    get age() { return this._Age;}
};
console.log(test.name + "" + test.age);//Limei 20
test.name = "Lily";
test.age = 18;
console.log(test.name + "" + test.age);//Limei 18
console.log(test._Name + "" + test._Age);//Limei 18


/**
 * meta头设置不允许页面缩放
 * <meta name=viewport content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
 */

/**
 * document.location相对路径和绝对路径
 * http://www.baidu.com/test  --当前路径在根路径下
 * http://www.baidu.com/test/test_child --当前路径在test路径下
 * location替换
 * ./xxxx  ---表示相对路径替换
 * ../xxxx   ----表示先跳到上一级路径替换
 * /xxxx   ---绝对路径替换
 */

/*
atob方法和btoa方法，用来进行base64的编解码
btoa，是吧字符串进行base64编码，原理就是把字符串对应的ascii转化为二进制，在连起来按6位一组划分，然后高位补两个0，在转化为10进制，去base64编码
表中找十进制对应的字符（如果输入的是数字，先把数字转化为字符串）
 */




