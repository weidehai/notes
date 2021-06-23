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

