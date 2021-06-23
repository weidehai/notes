applyuse = {name:'apply'}
calluse = {name:'call'}
binduse = {name:"bind"}

function fn(){
    console.log(this.name)
    console.log(arguments)
}

fn1 = fn.bind(binduse,12,13)
//fn1.apply(applyuse)
fn1.call(calluse,1,2,3)

打印

bind
Arguments(5) [12, 13, 1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]

可以看见，call传入的this没有生效，因为通过bind绑定this无法被修改，但是参数还是可以传，可以看到传的参数是可以叠加的

当使用new操作符的时候，bind是无效的

当使用 `bind` 在 `setTimeout` 中创建一个函数（作为回调提供）时，作为 `thisArg` 传递的任何原始值都将转换为 `object`

证明：

```
function kkkk(){
    console.log(this)
}

setTimeout(kkkk.bind('1111'),1000)
//这里打印String {"1111"}
```

绑定函数也可以使用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的 `this` 值会被忽略，但前置参数仍会提供给模拟函数。

证明：

```
function kkkk(age){
    console.log(this)
    this.age = age
}
fn = kkkk.bind('1111',123)
new fn
//kkkk {age: 123}
```

作为构造函数使用的绑定函数

```
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function() {
  return this.x + ',' + this.y;
};
var emptyObj = {};
var YAxisPoint = Point.bind(emptyObj, 0/*x*/);
console.dir(YAxisPoint)

var yy = new YAxisPoint(2)

yy instanceof YAxisPoint; // true 这里为什么是true
//按照instanceof的原理，先获取YAxisPoint的prototype属性（假设是Y），然后顺着yy的原型链查找，看看是否能找到Y
//这里打印YAxisPoint这个函数，发现这个函数自身并没有这个prototype属性，然后看其原型链，发现也没有
```

![image-20210623154948411](https://i.loli.net/2021/06/23/ms9gncPClEwJu4F.png)

猜想：因为new一个bind生成的函数实际上会调用这个函数的TargetFunction属性指向的函数，而这个函数就是我们的原始函数，那么在instanceof语句中应该是获取TargetFunction函数的prototype属性

实现一个支持new操作符的bind函数的polyfill

```
Funtion.prototype.mybind(thisArg){
    let	baseArg = Array.prototype.slice.call(arguments)
    let fn = this
	function bindFn(){
		let otherArg = Array.prototype.slice.call(arguments)
		let allArg =  baseArg.concat(otherArg)
		fn.call(this.isPrototypeOf(bindFn)?this:thisArg,allArg)
	}
	return bindFn
}
function aaa(age){this.age=age}

binduse = {kkk:12}

// let aaa1 = aaa.bind(binduse,90)

// console.log(new aaa1(100))

aaa.bind(binduse,90)()

//expect binduse = {kkk:12,age:90}
```



