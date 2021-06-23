## Number

尽管一个数字常常仅代表它本身的值，但JavaScript提供了一些[位运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)。 这些位运算符和一个单一数字通过位操作可以用来表现一些布尔值。然而自从 JavaScript 提供其他的方式来表示一组布尔值（如一个布尔值数组或一个布尔值分配给命名属性的对象）后，这种方式通常被认为是不好的。位操作也容易使代码难以阅读，理解和维护。

在一些非常受限的情况下，可能需要用到这些技术，**比如试图应付本地存储的存储限制**。 位操作只应该是用来优化尺寸的最后选择。

<!--比如本地只能存八个字符，那么最大个数字9999999，要存操作个值的数字可以采用位运算，因为位运算的左移1位相当于乘以2-->

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

