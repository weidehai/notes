

JavaScript提供三种不同的值比较操作：

- 严格相等比较 (也被称作"strict equality", "identity", "triple equals")，使用 [===](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity) ,
- 抽象相等比较 ("loose equality"，"double equals") ，使用 [==](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality)
- 以及 [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) （ECMAScript 2015/ ES6 新特性）

这三个运算符的原语中，没有一个会比较两个变量是否结构上概念类似。对于任意两个不同的非原始对象，即便他们有相同的结构， 以上三个运算符都会计算得到 false 。(总结：对象比较的是地址)

## triple equals

全等操作符比较两个值是否相等，两个被比较的值在比较前都不进行隐式转换。如果两个被比较的值具有不同的类型，这两个值是不全等的。否则，如果两个被比较的值类型相同，值也相同，并且都不是 number 类型时，两个值全等。最后，如果两个值都是 number 类型，当两个都不是 NaN，并且数值相同，或是两个值分别为 +0 和 -0 时，两个值被认为是全等的。



## double equals

double equals比较涉及到类型的隐式转化，转化规则如下

![image-20210624170338237](https://i.loli.net/2021/06/24/b9Udn3EkjAFgf6K.png)

![image-20210624172336465](https://i.loli.net/2021/06/24/AlGvi6zRykBtTuX.png)

