### 类型转化

![image.png](https://i.loli.net/2021/05/11/UxjyJnhCt7ZdizB.png)





![image.png](https://i.loli.net/2021/05/11/mIhsGWVbSRM3794.png)



ToInt32 首先执行ToNumber 强制类型转换，比如"123" 会先被转换为123，然后再执行ToInt32。

![image.png](https://i.loli.net/2021/05/11/fsdPRw8IyLQDXvO.png)

### 宿主对象

其他需要注意的宿主对象的行为差异有：
• 无法访问正常的object 内建方法，如toString();
• 无法写覆盖；
• 包含一些预定义的只读属性；
• 包含无法将this 重载为其他对象的方法；
• 其他……

在我们经常打交道的宿主对象中，console 及其各种方法（log(..)、error(..) 等）是比较
值得一提的。console 对象由宿主环境提供，以便从代码中输出各种值。
console 在浏览器中是输出到开发工具控制台，而在Node.js 和其他服务器端JavaScript 环
境中，则是指向JavaScript 环境系统进程的标准输出（stdout）和标准错误输出（stderr）。

### 全局变量

![image.png](https://i.loli.net/2021/05/13/DXxQGZ9tEPqWKY7.png)

### javascript限制

JavaScript 规范对于函数中参数的个数，以及字符串常量的长度等并没有限制；但是由于
JavaScript 引擎实现各异，规范在某些地方有一些限制。
例如：

```
function addAll() {
var sum = 0;
for (var i=0; i < arguments.length; i++) {
sum += arguments[i];
}
return sum;
}
var nums = [];
for (var i=1; i < 100000; i++) {
nums.push(i);
}
```

addAll( 2, 4, 6 ); // 12
addAll.apply( null, nums ); // 应该是: 499950000
在一些JavaScript 引擎中你会得到正确答案499950000，而另外一些引擎（如Safari 6.x）中
则会产生错误“RangeError: Maximum call stack size exceeded”。
下面列出一些已知的限制：
• 字符串常量中允许的最大字符数（并非只是针对字符串值）；
• 可以作为参数传递到函数中的数据大小（也称为栈大小，以字节为单位）；
• 函数声明中的参数个数；
• 未经优化的调用栈（例如递归）的最大层数，即函数调用链的最大长度；
• JavaScript 程序以阻塞方式在浏览器中运行的最长时间（秒）；
• 变量名的最大长度。
我们不会经常碰到这些限制，但应该对它们有所了解，特别是不同的JavaScript 引擎的限
制各异。

## 异步

到底什么时候控制台I/O 会延迟，甚至是否能够被观察到，这都是游移不定的。如果在调
试的过程中遇到对象在console.log(..) 语句之后被修改，可你却看到了意料之外的结果，
要意识到这可能是这种I/O 的异步化造成的。

如果遇到这种少见的情况，最好的选择是在JavaScript 调试器中使用断点，
而不要依赖控制台输出。次优的方案是把对象序列化到一个字符串中，以强
制执行一次“快照”，比如通过JSON.stringify(..)。