在1995 年 Netscape 一位名为 Brendan Eich 的工程师创造了 JavaScript，随后在 1996 年初，JavaScript 首先被应用于 Netscape 2 浏览器上。最初的 JavaScript 名为 LiveScript，但是因为一个糟糕的营销策略而被重新命名，该策略企图利用Sun Microsystem的Java语言的流行性，将它的名字从最初的 LiveScript 更改为 JavaScript



几个月后，Microsoft 随 IE 3 发布推出了一个与之基本兼容的语言 JScript。又过了几个月，Netscape 将 JavaScript 提交至 [Ecma International](https://www.ecma-international.org/)（一个欧洲标准化组织）， [ECMAScript](https://developer.mozilla.org/zh-CN/docs/Glossary/ECMAScript) 标准第一版便在 1997 年诞生了，随后在 1999 年以 [ECMAScript 第三版](https://www.ecma-international.org/publications/standards/Ecma-262.htm)的形式进行了更新，从那之后这个标准没有发生过大的改动。由于委员会在语言特性的讨论上发生分歧，ECMAScript 第四版尚未推出便被废除，但随后于 2009 年 12 月发布的 ECMAScript 第五版引入了第四版草案加入的许多特性。第六版标准已经于 2015 年 6 月发布。

1997---- [ECMAScript](https://developer.mozilla.org/zh-CN/docs/Glossary/ECMAScript)1

1999---[ECMAScript](https://developer.mozilla.org/zh-CN/docs/Glossary/ECMAScript)3

2009---[ECMAScript](https://developer.mozilla.org/zh-CN/docs/Glossary/ECMAScript)5

2015---[ECMAScript](https://developer.mozilla.org/zh-CN/docs/Glossary/ECMAScript)6/[ECMAScript](https://developer.mozilla.org/zh-CN/docs/Glossary/ECMAScript)2015



Adobe Acrobat、Adobe Photoshop、SVG 图像、Yahoo! 的 Widget 引擎，[Node.js](https://nodejs.org/) 之类的服务器端环境，NoSQL 数据库（如开源的 [Apache CouchDB](https://couchdb.apache.org/)）、嵌入式计算机，以及包括 [GNOME](https://www.gnome.org/) （注：GNU/Linux 上最流行的 GUI 之一）在内的桌面环境等等都包含 JavaScript 解释器







JavaScript 是一种多范式的动态语言

什么是多范式？

一、命令式

二、函数式

三、面向对象

所谓编程范式（programming paradigm），指的是计算机编程的基本风格或典范模式。借用哲学的术语，如果说每个编程者都在创造虚拟世界，那么编程范式就是他们置身其中自觉不自觉采用的世界观和方法论。我们知道，编程是为了解决问题，而解决问题可以有多种视角和思路，其中普适且行之有效的模式被归结为范式。比如我们常用的“面向对象编程”就是一种范式。由于着眼点和思维方式的不同，相应的范式自然各有侧重和倾向，因此一些范式常用‘oriented’来描述。换言之，每种范式都引导人们带着某种的倾向去分析问题、解决问题，这不就是“导向”吗？如果把一门编程语言比作兵器，它的语法、工具和技巧等是招法，它采用的编程范式则是心法。编程范式是抽象的，必须通过具体的编程语言来体现。它代表的世界观往往体现在语言的核心概念中，代表的方法论往往体现在语言的表达机制中。一种范式可以在不同的语言中实现，一种语言也可以同时支持多种范式。比如，PHP可以面向过程编程，也可以面向对象编程。任何语言在设计时都会倾向某些范式，同时回避某些范式，由此形成了不同的语法特征和语言风格。抽象的编程范式须要通过具体的编程语言来体现。范式的世界观体现在语言的核心概念之中，范式的方法论体现在语言的表达机制中。一种语言的语法和风格与其所支持的编程范式密切相关。

动态语言的动态主要表现在两个方面：

1.动态编译

要执行的时候才，每次执行都要编译

2.动态类型

一个变量的类型不能在编译时确定，任意类型的值都可以赋值给这个变量，变量的类型会发生变化





类型：

Number

String

Symbol

Boolean

Null

Undefined

Object

​	Array,Date,RegExp,Function,Error

(typeof的两个异常现象：typeof Null === object typeof Function === "function")





javascript中的所有数字都被储存为64为双精度浮点数，但是在具体实现的时候，整数值通常（看浏览器实现）被视为32位整型变量，主要是为了方便进行位运算





JavaScript 中的字符串是一串[Unicode 字符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Values,_variables,_and_literals#Unicode.E7.BC.96.E7.A0.81)序列。这对于那些需要和多语种网页打交道的开发者来说是个好消息。更准确地说，它们是一串UTF-16编码单元的序列，每一个编码单元由一个 16 位二进制数表示。每一个Unicode字符由一个或两个编码单元来表示。（那也就是说一个字符最多占四个字节，最多也只能表示unicode编码为四个字节的字符）