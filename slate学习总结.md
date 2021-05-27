## slate简介

引用官方文档的话：Slate是一款可完全自定义（通过实现一系列的插件）开发富文本编辑器的框架

该如何理解这句话呢？经过一段时间的学习，我尝试将自己对Slate理解总结出来

首先，Slate还是基于contenteditable工作的，我之前基于原生的contenteditable做过一个简单的富文本编辑器，就我在开发过程中的感受来讲，我个人认为基于contenteditable的富文本编辑器的开发有以下痛点：

1.文档的不可控性

​	不管是document.execommand，Range.insertNode, Range.surroundContents，删除，换行，输入字符等都是浏览器实现的，所以我们很难预期或者控制文档在同一个操作/命令下能够有统一的渲染结果

2.选区/范围的不可控性，边界判断复杂性

​	在富文本编辑器开发者，我们常常会获取通过selection和range来判断光标位置或者是改变内容，但是由于文档的不可控性，导致在视觉上处于同一位置的光标，获取其选取和范围的结果可能大相径庭，同时一个选取可能包含多个结点，在节点边界判断的时候非常麻烦

而Slate的出现就是为了解决这些原生开发的痛点的。可以说Slate是一个可受控的富文本编辑框开发框架，其可受控的特性主要依赖两点（也就是上面说的那两点）

1.可受控的文档

​	在Slate内，会维护一个文档树（editor）对象，而我们的真实dom也是依赖这颗树渲染的，这个文档树对象必须符合Slate的规定或者说是约束，这样文档就能够到达可预期性，统一性的目的，也就说文档是受控的

2.可受控选区/范围

​	在Slate内，同时还会维护一个选取（selection）对象，这个对象是通过原生的selection对象经过处理，转化而来，同理，要让选区是受控的，Slate会将selection对象处理成符合Slate约束的选区对象

所以总的来说，Slate就是通过维护一颗真实dom的映射对象，一个模拟真实选区的selection对象，以及定义了一系列的约束规则来保证文档和选区的受控的富文本编辑器开发框架

所以我们也就能理解为什么说Slate是轻量级，可自定义，插件化的富文本编辑器框架了，因为Slate只实现了文本编辑最基本，也是最核心的内容（dom树，选区），有了这些基础的功能，对于开发者所需要的富文本操作功能，可以自行通过插件的形式自定义开发（因为说到底，所有的富文本功能无非都是在操作选区，修改dom树）

## Slate架构

首先我们现在看下Slate源码结构

![image-20210527164057179](https://i.loli.net/2021/05/27/CQuidmjo6VIEzPl.png)

正如前面说的，Slate是一个轻量的框架一样，Slate代码中包含的模块很少，其实真正算的上核心代码的也就slate和slate-react两个，一个是视图层一个是核心逻辑层，再看看每个模块里面有什么

1.slate模块

![image-20210527164535585](https://i.loli.net/2021/05/27/LilHfMPJF24zCAg.png)

可以看到slate分为两部分：interface和transform

（1）interface

​	interface文件夹里面分门别类的定义了一些接口函数，这些函数有可能是功能函数，比如根据路径获取某个节点，迭代文档节点，也有可能是检查函数，比如检查某个节点是node类型还是text类型等，和任何一门框架和语言一样，如果需要基于Slate开发就需要熟悉这些api，完整详细的api可以看官网文档

（2）transform

​	transform里面实现的功能其实就是对editor对象进行真正的更改的代码，所有对editor对象进行更改的操作都会调用transform里面的方法，可以看到transform里面也分门别类的放了三个文件，分别对应对node，text，selection的更改，也就验证了我们之前所说的，所有的文本操作，其实最后都是对dom和selection的操作，而在slate中，dom对象的映射正是由node和text节点组成，除了这三个文件，里面还有一个general文件，而editor对象真正的修改正是调用了这个文件里面的transform函数来实现的

2.slate-react模块

![image-20210527164633550](https://i.loli.net/2021/05/27/EYiOtq3vnRs9lez.png)

slate-react其实就是slate的视图层，这里简单介绍下components模块和hooks模块

1.components模块

​	这个文件夹包含了视图层所有用到的组件，其实从这里我们大概也能看出Slate整个视图层的架构了，下面我会具体分析

2.hooks模块

​	这个文件夹里面包含的都是React中的ContextProvider组件，方便传递数据用的，但有一个例外，就是use-children文件，这个文件是用来动态渲染dom对象的，使用的是广度优先遍历算法构建组件的，下面会具体分析，editor内部维护的dom文档书对象每一次更新，都需要重新渲染

### 总体架构

按照Slate源码在这里，我先粗略的将slate应用分为视图层和核心层，见下图

![image-20210527175724201](https://i.loli.net/2021/05/27/JBzaeolsqQ1U9hF.png)

上面说过，所有对editor的操作最后都会调用transform模块下general.ts文件中的transform方法来修改，而我们知道，最为文本编辑器，实现撤销/重做是最基本的功能，所以在修改editor状态前，需要先保留之前的快照在修改，Slate使用了immer这个数据持久化库来实现快照的保留，看看transform的实现

![image-20210527180500762](https://i.loli.net/2021/05/27/1LB3UPdnlHcCjhi.png)

createDraft创建快照，applyToDraft修改对象（op对象中newproperties存储了需要修改的数据），最后finishDraft完成修改，生成新的对象

### 视图层

上面的视图层算比较清晰明了，但是在视图层还有三个比较重要的函数，他们是用来动态渲染文档根对象editor对象的chidren的，分别是，useChildren,renderElement,renderLeaf,接下来我们就来看看这三个函数是如何配合工作的

首先我们先看useChildren的具体实现

![image-20210527181717218](https://i.loli.net/2021/05/27/Es95iQHa37OrJG1.png)

和容易看出，就是对children进行遍历，然后判断如果是Element类型的就将ElementComponent组件加入数组，否则就将TextCompoenent组件加入数组，接下来在看看ElementComponent组件

![image-20210527182233064](https://i.loli.net/2021/05/27/aysfSRA4GFQBn5N.png)

可以看到ElementComponent一进来又会去调用useChildren，这是一个递归嵌套渲染的过程，返回条件是节点是TextCompoenent，其实就是广度优先遍历，再看一下ElementComponent的返回

![image-20210527182619113](https://i.loli.net/2021/05/27/vhFkCgcXV64WOHI.png)

看到这里其实就可以大概想象出ElementComponent的渲染结构了，如下图



### 核心层

#### slate工作流程







## Slate插件机制

editor可以看作是视图层和核心成沟通的一个桥梁，当然我们也可以直接调用核心层的api，但这不是一种好方法，一方面会降低项目的可维护性，同时不能很好的复用重复的逻辑，好的方法是：将一组操作逻辑封装成一个函数作为命令挂载到editor上

所有的插件都是在editor对象上做手脚，Slate会提供一个createEditor函数来创建一个基础的editor对象，上面说到可以将一组操作逻辑封装成一个函数作为命令挂载到editor上，所以Slate的插件机制，其实就是对editor对象的一种扩展

所以可以认为：Slate开发的最佳实践就是将一组操作逻辑封装成一个函数作为命令挂载到editor上，也就是利用Slate的插件机制来开发，而不是在代码中分散的到处调用核心层api

### 实例分析

因为createEditor函数返回的是editor对象，所以我们的插件只要也返回editor对象，那么就能通过组合函数来对editor实现嵌套式的多重扩展

![image-20210527161158486](https://i.loli.net/2021/05/27/a39YwbT5U1KDXvy.png)

接下来看一看createEditor，withReact，withHistory都做了什么

![image-20210527161421639](https://i.loli.net/2021/05/27/6AEJIYMVryxZe2i.png)

首先createEditor就是定义了一个基础的editor对象，在Slate中，editor对象表示文档的根对象，使用Path：[]获取到的对象就是editor对象，children和selection是两个关键的对象，一个描述了真实dom的映射，一个保存了当前光标所在位置信息，然后还有一些其他的基本命令函数

![image-20210527161829278](https://i.loli.net/2021/05/27/glOFtoSRIEn6Grd.png)

可以看到，withReact就是重写或新增了editor上的命令函数

![image-20210527162035736](https://i.loli.net/2021/05/27/T3Nxz2CFtEfVG7W.png)

统一，withHistory也是新增了一个history状态对象，两个命令函数redo和undo，也就是实现了撤销/重做的命令，最后返回editor对象，这样我们创建出来的editor就同时拥有了withHistory，withReact，createEditor三个函数所赋予的editor的命令

## 案例







