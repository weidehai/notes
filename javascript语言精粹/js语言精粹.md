## 开篇

![image-20210519202904904](C:\Users\24339\AppData\Roaming\Typora\typora-user-images\image-20210519202904904.png)

![image-20210519202934057](https://i.loli.net/2021/05/19/p2RCdMUDLcB87VE.png)

本该作为保留字的保留字

![image-20210519220735492](https://i.loli.net/2021/05/19/csOGl3rgoA4Z8Rd.png)

这意味着undefined，NaN，Infinity不是绝对安全的（undefined可能被赋予其他含义）

## 数字

![image-20210519221032937](https://i.loli.net/2021/05/19/PYLgXRCb4Gm3WoE.png)

![image-20210519221055298](https://i.loli.net/2021/05/19/5cPAlwjh7EbuxmV.png)

javascript能表示的最大，最小整数是多少，原理？

JavaScript能表示的最大，最小小数时多少，原理？

## 语句

![image-20210519221650602](https://i.loli.net/2021/05/19/OX3ZAyiYUmGCHeb.png)

现在用let和const可以创建块作用域了

![image-20210519221923163](https://i.loli.net/2021/05/19/I3OLQj6tigsJZe7.png)

**语句和表达式的每个符号之间是可以插入任意多个空格的**

## 对象

![image-20210519223057299](https://i.loli.net/2021/05/19/ZQ7DowhcWNE5fKJ.png)

## 类数组对象

有length属性。没有任何的数组方法

### 类数组对象的缺陷

## new函数返回值

如果函数返回值是一个对象则返回这个对象，如果不是则返回this

## throw

可以throw一个字符串或者是一个对象,也可以返回一个Error对象 new Error() new TypeError()

throw字符串就是message

## 继承

### 不带new创建对象引发的问题

funtion a(){

​	this.name = "weidehai"

​	this.age = '10'

}

a(),这样的话this会指向全局变量，相当于向全局变量暴露了本应在a实例内部的属性