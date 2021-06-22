在vuecli编译的时候碰到一个严格模式解析错误的问题，因为在源码中使用了with，因此需要去除use strict，网上找了几种方案都不行，分析出错环境要么是webpack，要么是babel（vuecli其实就是封装了webpack和babel，并且帮你写好了大量的通用配置）

一开始以为是webpack，单独创建了一个文件使用webpack编译，出来的文件没有报错，其实如果只写entry和output，webpack只会做js模块代码的打包，不会有任何的语法改变

那么就是babel了，使用babel编译，确实复现了问题，继续使用网上的方法transform-remove-strict-mode来去除严格模式，还是不行（即使将这个plugin包装成preset放在第一个也不行，后来发现这个插件其实是生效的，只不过报错的地方还没到插件处理，而是在编译的时候就报错了，看下面的堆栈，发现在@babel/parse中出错）

![image-20210622150315766](https://i.loli.net/2021/06/22/nR71crVEmoH8BYe.png)

The Babel parser (previously Babylon) is a JavaScript parser used in [Babel](https://github.com/babel/babel).（babel parse的介绍）

也就是说babel的编译是调用的这个库，看看这个库的api

![image-20210622151331389](https://i.loli.net/2021/06/22/VhJeqE9P2TYpDtn.png)

在看看api的options参数（只截取部分）

![image-20210622151411405](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210622151411405.png)

strictMode和sourceType就是关键

默认情况下，只有在显示声明use strict才使用严格模式，但如果代码文件时模块，就会被解析成严格模式，我们可以指定代码文件是什么类型，

script，module，unambiguous（这个选项会让编译器自己识别是什么类型）

可以显示在babel的配置文件中配置sourceType：“script”,这样就不报错了

module和script的区别：当代码中出现module.exports exports import export等导入导出语句时，就会被认为是module

![image-20210622153220206](https://i.loli.net/2021/06/22/pNqj9FxistUA7WC.png)