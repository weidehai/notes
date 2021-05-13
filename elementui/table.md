table-column.js中的compose函数

其实使用的是工具（util.js）中的工具函数

![image.png](https://i.loli.net/2021/05/12/RvKtChda9jEkxOQ.png)

compose(this.setColumnRenders, this.setColumnWidth, this.setColumnForcedProps);

将传入的函数从右到左执行，并把前一个函数的执行结果作为参数传入下一个函数执行