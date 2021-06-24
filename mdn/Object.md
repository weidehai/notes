## 介绍

在JavaScript中，几乎所有的对象都是`Object`类型的实例，它们都会从`Object.prototype`继承属性和方法。`Object` 构造函数为给定值创建一个对象包装器。`Object`构造函数，会根据给定的参数创建对象，具体有以下情况：

- 如果给定值是 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，将会创建并返回一个空对象
- 如果传进去的是一个基本类型的值，则会构造其包装类型的对象
- 如果传进去的是引用类型的值，仍然会返回这个值，经他们复制的变量保有和源对象相同的引用地址

**当以非构造函数形式被调用时，`Object` 的行为等同于 `new Object()`。**

```
new Object(null) // {}
Object(null) //{}
Object(undefined)  //{}
Object('123') // String{'123'}
Object({name:'wei'})  // {name:'wei'}
Object()  // {}
```

## 属性

### length

1

### name

Object

### __ proto __

Object是一个构造函数，函数也是对象，任何对象都存在__ proto __属性，指向创建这个对象的函数的原型

### [[Scopes]]

Scopes[0]。函数创建时候的预装载作用域链

### prototype

![image-20210624154003732](https://i.loli.net/2021/06/24/tL24uvMEonQz3gB.png)

#### __ defineGetter __

关联一个函数到一个属性。访问该函数时，执行该函数并返回其返回值。（其实就是getter？）

#### __ defineSetter __

关联一个函数到一个属性。设置该函数时，执行该修改属性的函数

#### __ lookupGetter __

返回使用 __ defineGetter __ 定义的方法函数 。

#### __ lookupSetter __

返回使用 __ defineSetter __ 定义的方法函数。

#### hasOwnProperty

返回一个布尔值 ，表示某个对象是否含有指定的属性，而且此属性非原型链继承的。

#### isPrototypeOf

返回一个布尔值，表示指定的对象是否在本对象的原型链中。

#### propertyIsEnumerable

判断指定属性是否可枚举

#### toLocaleString

#### toString

返回对象的字符串表示。

#### valueOf

返回指定对象的原始值。

#### get __ proto __

__ proto __ 属性的getter

#### set __ proto __

__ proto __ 属性的setter

## 静态方法

### assign

方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

方法只会拷贝源对象==**自身的**==并且**==可枚举==**的属性到目标对象

该方法使用源对象的`[[Get]]`和目标对象的`[[Set]]`

```
a={_name:'wei',get name(){return 'wei'},set name(n){this._name=n}}
b = {get name(){return 'wei'}}
c={set name(n){return void 0},get name(){return "wei1"}}
d = {_name:'',set name(n){this._name=n}}
k = Object.assign(c,b) //{}
l = Object.assign(d,b) //{_name:"wei"}
//对象属性分配的过程，先调用b对象name属性的getter，得到wei，在调用对象c属性name的setter，传入wei，这里setter没有做任何处理，所以，
```

```
const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo")

const obj = Object.assign({}, v1, null, v2, undefined, v3, v4);
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```

```
const target = Object.defineProperty({}, "foo", {
    value: 1,
    writable: false
}); // target 的 foo 属性是个只读属性。

Object.assign(target, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4});
// TypeError: "foo" is read-only
// 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。

console.log(target.bar);  // 2，说明第一个源对象拷贝成功了。
console.log(target.foo2); // 3，说明第二个源对象的第一个属性也拷贝成功了。
console.log(target.foo);  // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
console.log(target.foo3); // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
console.log(target.baz);  // undefined，第三个源对象更是不会被拷贝到的。
```



### create



### defineProperty



### defineProperties



### entries



### freeze



### getOwnPropertyDescriptor



### getOwnPropertyNames

返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。(继承的也获取了？)

### getOwnPropertySymbols



### getPrototypeOf



### is

而Object.is的行为方式与三等号相同，但是对于NaN和-0和+0进行特殊处理，所以最后两个不相同，而Object.is（NaN，NaN）将为 `true`

Object.is(+0,-0) //false

### isExtensible



### isFrozen





### isSealed



### keys

方法会返回一个由一个给定对象的==自身==可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。

在ES5里，如果此方法的参数不是对象（而是一个原始值），那么它会抛出 TypeError。在ES2015中，非对象的参数将被强制转换为一个对象。

```
Object.keys("foo");
// TypeError: "foo" is not an object (ES5 code)

Object.keys("foo");
// ["0", "1", "2"]                   (ES2015 code)
```

获取不到Symbol属性

```
f = Symbol('f00')
a={name:"123",[f]:'1'}
Object.keys(a)  //["name"]
Object.getOwnPropertyDescriptor(a,f) //{value: "1", writable: true, enumerable: true, configurable: true}
```

### preventExtensions



### seal



### setPrototypeOf



### values

返回给定对象==自身==可枚举值的数组。