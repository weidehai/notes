![image-20210601143650936](https://i.loli.net/2021/06/01/viDmUyLcWs9f485.png)

光标处不加括号会报错，因为方括号会被认为是对arr.filter的结果取数组成员，而这里的本意是对min解构赋值



a=(1,2,3)  //a=3





![image-20210601152539009](https://i.loli.net/2021/06/01/H9CwYM75r4Nn8js.png)

{}+{}.length   //NaN 第一个{}被看作空代码块，第二个与+符号作用被看作空的对象字面量，先取length（返回undefined），+undefined=NaN

({}+{}).length 



<u>+0 === -0</u>  //true

+0不应该等于-0，但实际上都是0，又应该相等

