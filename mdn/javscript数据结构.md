## Number

尽管一个数字常常仅代表它本身的值，但JavaScript提供了一些[位运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)。 这些位运算符和一个单一数字通过位操作可以用来表现一些布尔值。然而自从 JavaScript 提供其他的方式来表示一组布尔值（如一个布尔值数组或一个布尔值分配给命名属性的对象）后，这种方式通常被认为是不好的。位操作也容易使代码难以阅读，理解和维护。

在一些非常受限的情况下，可能需要用到这些技术，**比如试图应付本地存储的存储限制**。 位操作只应该是用来优化尺寸的最后选择。

<!--比如本地只能存八个字符，那么最大个数字9999999，要存草果8个值的数字可以采用位运算，因为位运算的左移1位相当于乘以2-->

## BigInt

`BigInt`不能与数字互换操作。否则，将抛出[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)

```
a=10n
b=20
a+b //VM5624:1 Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
bigint类型和number类型进行加法操作，不会有隐式类型转换，需要显示转化，但是需要注意的是bigint转number的精度损失
```

## Symbol

数据类型 “**symbol**” 是一种基本数据类型，该类型的性质在于这个类型的值可以用来创建    <u>匿名</u>   的对象属性。



## Object

ECMAScript定义的对象中有两种属性：数据属性和访问器属性。(也就是说所有的对象属性只有两种，要么是数据属性，要么是访问器属性)

那么什么是数据属性呢

在javascript的对象中，对每一个属性都有一组特性描述（这些描述不会直接显示在对象中），需要使用js提供的api getOwnPropertyDescriptor获取

```
a={age:'111'}
Object.getOwnPropertyDescriptor(a,'age')
```

![image-20210623211531648](https://i.loli.net/2021/06/23/QlgvEZknWCaRX3M.png)

![image-20210623211547825](https://i.loli.net/2021/06/23/axhPwOupYBRe5Kd.png)

根据标准，可以知道a对象的age属性是一个数据属性

```
a={age:'111',get name(){return 'wone'}}
Object.getOwnPropertyDescriptor(a,'name')
```

![image-20210623211744563](https://i.loli.net/2021/06/23/eGJzd9rx2yHKiIt.png)

![image-20210623211806818](https://i.loli.net/2021/06/23/OrnB2z8mKPJEI9C.png)

根据标准，可以知道a对象的name属性是一个访问器属性

## Array

[数组](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array)是一种使用**整数作为键(integer-key-ed)属性和长度(length)属性**之间关联的常规对象

## typed arrays

**JavaScript typed arrays** are array-like objects that provide a mechanism for reading and writing raw binary data in memory buffers.

类型数组是一个类似数组的对象，提供了一种可以在内存缓冲区中读写原始二进制数据的机制

Each entry in a JavaScript typed array is a raw binary value in one of a number of supported formats, from 8-bit integers to 64-bit floating-point numbers.

类型数组中每一个实体/元素都是一个原始二进制值（必须是js规定的格式中的一种，从8位二进制整数到64位浮点数）

However, typed arrays are not to be confused with normal arrays, as calling Array.isArray() on a typed array returns false. Moreover, not all methods available for normal arrays are supported by typed arrays (e.g. push and pop).

JavaScript typed arrays split the implementation into **buffers** and **views**

js中的类型数组有两种 buffer和view

ArrayBuffer 就是 buffer型的类型数组

A buffer (implemented by the ArrayBuffer object) is an object representing a chunk of data; it has no format to speak of and offers no mechanism for accessing its contents. In order to access the memory contained in a buffer, you need to use a view. A view provides a context — that is, a data type, starting offset, and the number of elements — that turns the data into a typed array.

buffer型的类型数组代表了一个数据的某一块（部分）内容，buffer型类型数组无法访问其内容，如果需要访问内容，就需要使用view型的类型数组

### ArrayBuffer

The [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)at is used to represent a generic, fixed-length binary data buffer. You can't directly manipulate the contents of an `ArrayBuffer`; instead, you create a typed array view or a [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)sents the buffer in a specific format, and use that to read and write the contents of the buffe

### DataView

The [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)vel interface that provides a getter/setter API to read and write arbitrary data to the buffer. This is useful when dealing with different types of data, for example. Typed array views are in the native byte-order (see [Endianness](https://developer.mozilla.org/en-US/docs/Glossary/Endianness)) of your platform. With a `DataView` you are able to control the byte-order. It is big-endian by default and can be set to little-endian in the getter/setter methods.





```
let buffer = new ArrayBuffer(16);
//申请一段16个字节的内存空间
let int32View = new Int32Array(buffer);
//规定类型数组的每个实体的类型，这里是32位整数，也就是16*8/32=4，把刚才申请的16个字节的内存分为4部分
for (let i = 0; i < int32View.length; i++) {
  int32View[i] = i * 2;
}
//This fills out the 4 entries in the array (4 entries at 4 bytes each makes 16 total bytes) with the values 0, 2, 4, and 6.
let int16View = new Int16Array(buffer);
int16View[0] = 32;
console.log('Entry 0 in the 32-bit array is now ' + int32View[0]);
for (let i = 0; i < int16View.length; i++) {
  console.log('Entry ' + i + ': ' + int16View[i]);
}
for (let i = 0; i < int32View.length; i++) {
  console.log('Entry ' + i + ': ' + int32View[i]);
}
```

In other words, the two arrays are indeed viewed on the same data buffer(共享同一段内存), treating it as different formats.

```
let buffer = new ArrayBuffer(24);

// ... read the data into the buffer ...

let idView = new Uint32Array(buffer, 0, 1);
let usernameView = new Uint8Array(buffer, 4, 16);
let amountDueView = new Float32Array(buffer, 20, 1);
//先将buffer按照指定数据格式分割，在取offset和length
```

