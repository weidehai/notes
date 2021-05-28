## slate简介

引用官方文档的话：Slate是一款轻量级，可完全自定义（通过实现一系列的插件），可受控的开发富文本编辑器的框架

该如何理解这句话呢？经过一段时间的学习，我尝试将自己对Slate理解总结出来

首先，Slate还是基于contenteditable工作的，我之前基于原生的contenteditable做过一个简单的富文本编辑器，就我在开发过程中的感受来讲，我个人认为基于contenteditable的富文本编辑器的开发有以下痛点：

1.文档的不可控性

​	不管是document.execommand，Range.insertNode, Range.surroundContents，删除，换行，输入字符等都是浏览器实现的，所以我们很难预期或者控制文档在同一个操作/命令下能够有统一的渲染结果

2.选区/范围的不可控性，边界判断复杂性

​	在富文本编辑器开发者，我们常常会获取通过selection和range来判断光标位置或者是改变内容，但是由于文档的不可控性，导致在视觉上处于同一位置的光标，获取其选取和范围的结果可能大相径庭，同时一个选区可能包含多个结点，在节点边界判断的时候非常麻烦

而Slate的出现就是为了解决这些原生开发的痛点的。可以说Slate是一个可受控的富文本编辑器开发框架，其可受控的特性主要依赖两点（也就是上面说的那两点）

1.可受控的文档

​	在Slate内，会维护一个文档树（editor）对象，而我们的真实dom也是依赖这颗树渲染的，这个文档树对象必须符合Slate的规定或者说是约束，这样文档就能够到达可预期性，统一性的目的，也是就说文档是受控的

2.可受控选区/范围

​	在Slate内，同时还会维护一个选取（selection）对象，这个对象是通过原生的selection对象经过处理，转化而来，同理，要让选区是受控的，Slate会将selection对象处理成符合Slate约束的选区对象

所以总的来说，Slate就是通过维护一颗真实dom的映射对象，一个模拟真实选区的selection对象，以及定义了一系列的约束规则来保证文档和选区受控的富文本编辑器开发框架

所以我们也就能理解为什么说Slate是轻量级，可自定义，插件化的富文本编辑器框架了，因为Slate只实现了文本编辑最基本，也是最核心的内容（dom树，选区），有了这些基础的功能，对于开发者所需要的富文本操作功能，可以自行通过插件的形式自定义开发（因为说到底，所有的富文本功能无非都是在操作选区，修改dom树）



## Slate架构

首先我们先看下Slate源码结构

![image-20210527164057179](https://i.loli.net/2021/05/27/CQuidmjo6VIEzPl.png)

正如前面说的，Slate是一个轻量的框架一样，Slate代码中包含的模块很少，其实真正算的上核心代码的也就slate和slate-react两个，一个是视图层一个是核心逻辑层，再看看每个模块里面有什么

1.slate模块

![image-20210527164535585](https://i.loli.net/2021/05/27/LilHfMPJF24zCAg.png)

可以看到slate分为两部分：interface和transform

（1）interface

​	interface文件夹里面分门别类的定义了一些接口函数（也就是slate暴露出来的公共api），这些函数有可能是功能函数，比如根据路径获取某个节点，迭代文档节点，也有可能是检查函数，比如检查某个节点是node类型还是text类型等，和任何一门框架和语言一样，如果需要基于Slate开发就需要熟悉这些api，完整详细的api可以看官网文档

（2）transform

​	transform里面实现的功能其实就是对editor对象进行真正的更改的代码，所有对editor对象进行更改的操作都会调用transform里面的方法，可以看到transform里面也分门别类的放了三个文件，分别对应着对node，text，selection的更改，也就验证了我们之前所说的，所有的文本操作，其实最后都是对dom和selection的操作，而在slate中，dom对象的映射正是由node和text节点组成，除了这三个文件，里面还有一个general文件，而editor对象真正的修改正是调用了这个文件里面的transform函数来实现的

2.slate-react模块

![image-20210527164633550](https://i.loli.net/2021/05/27/EYiOtq3vnRs9lez.png)

slate-react其实就是slate的视图层，这里简单介绍下components模块和hooks模块

1.components模块

​	这个文件夹包含了视图层所有用到的组件，其实从这里我们大概也能看出Slate整个视图层的架构了，下面我会具体分析

2.hooks模块

​	这个文件夹里面包含的都是React中的ContextProvider组件，方便传递数据用的，但有一个例外，就是use-children文件，这个文件是用来动态渲染dom对象的，使用的是广度优先遍历算法构建组件的，下面会具体分析，editor内部维护的dom文档树对象每一次更新，都需要重新渲染



### 总体架构

按照Slate源码在这里，我先粗略的将slate应用分为视图层和核心层，见下图

![image-20210527175724201](https://i.loli.net/2021/05/27/JBzaeolsqQ1U9hF.png)

上面说过，所有对editor的操作最后都会调用transform模块下general.ts文件中的transform方法来修改，而我们知道，作为文本编辑器，实现撤销/重做是最基本的功能，所以在修改editor状态前，需要先保留之前的快照在修改，Slate使用了immer这个数据持久化库来实现快照的保留，看看transform的实现

![image-20210527180500762](https://i.loli.net/2021/05/27/1LB3UPdnlHcCjhi.png)

createDraft创建快照，applyToDraft修改对象（op对象中newproperties存储了需要修改的数据），最后finishDraft完成修改，生成新的对象



### 视图层

上面的视图层算比较清晰明了，但是在视图层还有三个比较重要的函数，他们是用来动态渲染文档根对象editor对象的chidren的，分别是，useChildren,renderElement,renderLeaf,接下来我们就来看看这三个函数是如何配合工作的

首先我们先看useChildren的具体实现

![image-20210527181717218](https://i.loli.net/2021/05/27/Es95iQHa37OrJG1.png)

和容易看出，就是对children进行遍历，然后判断如果是Element类型的就将ElementComponent组件加入数组，否则就将TextCompoenent组件加入数组，接下来在看看ElementComponent组件

![image-20210527182233064](https://i.loli.net/2021/05/27/aysfSRA4GFQBn5N.png)

可以看到ElementComponent一进来又会去调用useChildren，这是一个递归嵌套渲染的过程，返回条件是节点是TextCompoenent，其实就是广度优先遍历，再看一下ElementComponent的返回，可以看到renderElement是在ElementComponent中调用

![image-20210527182619113](https://i.loli.net/2021/05/27/vhFkCgcXV64WOHI.png)

看到这里其实就可以大概想象出ElementComponent的渲染结构了，在看一下TextCompoenent的源码

![image-20210528091329298](https://i.loli.net/2021/05/28/T6Sb8ZF3M7AQkxa.png)

![image-20210528091343207](https://i.loli.net/2021/05/28/C9rLJVTO6HUBwYI.png)

遍历所有的叶子节点，将其放入数组中渲染，就是这里的Leaf组件，而renderLeaf正是在Leaf组件中调用的

![image-20210528091758181](https://i.loli.net/2021/05/28/Bo4YDswQGxdn2NC.png)

![image-20210528091808101](https://i.loli.net/2021/05/28/sJbqvY71POm6flQ.png)

renderLeaf的children是一个String组件，String组件会渲染成TextString或ZeroWidthString，看名字也知道，如果存在文本就返回TextString

![image-20210528091920302](https://i.loli.net/2021/05/28/NznwlRJobckh6SG.png)

总结如下图：

![image-20210528092433321](https://i.loli.net/2021/05/28/enJ9XxlUqG7D38u.png)

（标红出来的层级是由renderElement或renderLeaf控制的，我们可以传入自定义的函数来渲染，同时不要忘记将children渲染进去，保证Slate文档的完整性）



### 核心层

对于研究内核代码，我更喜欢的是做一个简单的样例，然后找到一个自己想要研究的点，从这里开始跟踪下去进行测试、研究，所幸Slate官方已经有了丰富的样例，从github上clone项目到本地，安装好以来后，执行yarn run start就可以看到了，



#### insertBreak和setSelection源码解读

一开始我选择的是最简单的plain text这个样例进行研究，这个样例上我研究了两个点：一是我们在进行文本换行的时候，slate是如何处理的 ；二是当我们改变焦点（改变光标位置）的时候，slate是如何处理的



##### 1.文本换行

因为是文本编辑器，那么我们的各种逻辑的入口函数基本都是按键事件和鼠标事件的回调，找到源码，可以看到在编辑器上监听了各种事件

![image-20210528094628438](https://i.loli.net/2021/05/28/GbNYmIuOfQBUXxK.png)

![image-20210528094701215](https://i.loli.net/2021/05/28/4qQmBpCUNPR7Dax.png)

![image-20210528094713958](https://i.loli.net/2021/05/28/IToxtrwVqhQ6pZk.png)

而文本换行就是按下Enter键，触发keydown，然后就可以从这里跟踪下去，总结流程如下：

- 按下Enter键

- 事件检查

  基本所有的事件在触发的时候都要进行事件检查，判断是否要处理事件还是丢弃（三个条件）

  - 1.readOnly  //当前编辑区不能是readOnly
  - 2.hasEditableTarget  //事件触发元素要是可编辑的
  - 3.isEventHandled  //存在多个事件处理函数时先执行其他的函数， 最后判断return event.isDefaultPrevented() || event.isPropagationStopped()的结果来决定是否要在当前函数处理事件

- 触发keydown事件

  ![image-20210528155008247](https://i.loli.net/2021/05/28/ud2yFX4UAnR6mhG.png)

  keydown里面的splitblock是在不支持beforeinput事件时的后备选择

- 触发beforeinput事件

  ![](https://i.loli.net/2021/05/28/JFsBxD3lVyuA24q.png)

  里面对大部分的输入类型都进行了拦截，然后调用核心层命令进行处理，换行的输入类型就属于insertLineBreak，执行Editor.insertBreak命令，这里用到了依赖注入的设计模式，这里调用的是Editor的静态方法insertBreak，将当前实例editor传入，最终还是调用editor实例的insertBreak方法

- Transforms.splitNodes

  Transforms.splitNodes(editor, { always: true })切割node（调用具体的转化类型（就是上面的3中类别，node，text，selection，这里的splitnode就是node类型的转化），真正的将数据更新到editor上是通过apply（应用）调用Transforms.transform(editor, op)更新）关键逻辑代码如下：

  ```
  for (const [node, path] of Editor.levels(editor, {   //这里遍历path的层级，对每一层节点都要进行切割
      at: lowestPath,
      reverse: true,
      voids,
  })) {
      let split = false
      if (path.length < highestPath.length || path.length === 0 || (!voids && Editor.isVoid(editor, node))) {
      	break
      }
  
      const point = beforeRef.current!
      const isEnd = Editor.isEnd(editor, point, path)
  
      if (always || !beforeRef || !Editor.isEdge(editor, point, path)) {
      	split = true
      	const properties = Node.extractProps(node)
      	editor.apply({
      		type: 'split_node',
      		path,
      		position,
  		    properties,
      	})
      }
      position = path[path.length - 1] + (split || isEnd ? 1 : 0)
  }
  ```

  

- editor.apply（split_node）

  从Transforms.splitNodes进来后会调用editor.apply，这里会传递一个重要的参数op，里面存储了修改editor状态所需要的信息，例如path，offset，properties，newProperties等，这个参数会一直传递到状态修改完毕为止，这里会把我们的onchange会调用放入事件队列（其实所有的操作都会经过这里，统一在这里将渲染回调放入事件循环队列）

  ```
  if (!FLUSHING.get(editor)) {
      FLUSHING.set(editor, true)
  
      Promise.resolve().then(() => {
          FLUSHING.set(editor, false)
          editor.onChange()
          editor.operations = []
      })
  }
  ```

- Transforms.transform(editor, op) 这里要开始执行真正的状态更新了

  - createDraft(editor.children) editor.selection && createDraft(editor.selection)  //保存文档和选区的快照
  - applyToDraft(editor, selection, op) //更新状态
  - finishDraft(editor.children)  finishDraft(selection)//完成状态更新生成新的editor对象

- applyToDraft（split_node）

  Transforms.transform主要逻辑就在于applyToDraft，applyToDraft共设置了九种操作类型：insert_node，merge_node，move_node，remove_node，set_node，split_node，insert_text，remove_text，set_selection，我们的各种操作都会被转化成这个九种的一种进行处理，这里的换行就是split_node，接下来看看split_node的实现

  const { path, position, properties } = op //上面说了这个op对象会一直传递，里面存了修改信息，这里先获取出来（这里讲一下path的寻址原理：path是一个数组，里面的每一个元素都是一个索引，空数组表示根元素，第一个元素（索引）表示根节点下的第几个子元素，第二个元素（索引）表示这个子元素下的第几个子元素，依次类推），举个例子，比方有这么一段文档对象树

  ```
  {
      type: 'paragraph',
      children: [
      	{ text: 'This is editable ' },
      	{ text: 'rich', bold: true },
      ],
  },
  {
  	type: 'paragraph',
  	children: [
  		{ text: 'bold', bold: true },
  	],
  },
  ```

  那么Path[0,1]就代表{ text: 'rich', bold: true },[1,0]就代表{ text: 'bold', bold: true }，path[0]就代表{type: 'paragraph',children: [{ text: 'This is editable ' }，{ text: 'rich', bold: true }]},特殊的path[]代表editor实例，所以说editor实例时根节点

  ```
  const node = Node.get(editor, path)  // 查找路径对应的节点
  const parent = Node.parent(editor, path) // 获取路径对应节点的父节点   
  const index = path[path.length - 1]  //获取当前节点的索引
  let newNode: Descendant
  if (Text.isText(node)) {  // 对文本节点的处理
  	const before = node.text.slice(0, position)  
  	const after = node.text.slice(position)
  	//position就是当前光标所在文本的偏移位置，这里的逻辑就是把文本从光标位置截成两半
  	node.text = before  //修改当前几点的文本为光标之前的那段
  	newNode = {  //光标之后的那段会形成一个新的文本节点
  		...(properties as Partial<Text>),
  		text: after,
  	}
  } else {  
  // 对非文本节点的处理，逻辑都是一样的，只不过这里是Element类型（Slate将节点分为三种类型，Editor，Element，Text）的节点，我们需要修改的是children属性
  	const before = node.children.slice(0, position)
  	const after = node.children.slice(position)
  	node.children = before
  	newNode = {
  		...(properties as Partial<Element>),
  		children: after,
  	}
  }
  parent.children.splice(index + 1, 0, newNode)  //上面说了index是当前节点的索引，这里就是将newNode插入当前节点后面，至此文档树的修改就完成了
  //修改完了文档树，还需要修改选区的状态
  if (selection) {
  	for (const [point, key] of Range.points(selection)) {
  		selection[key] = Point.transform(point, op)!
  	}
  }
  ```

- finishDraft

  ```
  editor.children = finishDraft(editor.children)
  if (selection) {
  	editor.selection = isDraft(selection) ? (finishDraft(selection) as Range) : selection
  } else {
  	editor.selection = null
  }
  ```

  可以看到children和selection都是在这个时候应用到editor实例上的

- onchange回调

  执行完finishDraft后，主线程的逻辑也就完了，前面说了在apply的时候onchange回调被放入事件队列，这时浏览器就会到事件循环队列中取出onchange事件执行，重新渲染react
  
  1.dom的重新渲染：
  
  ![image-20210528161526780](https://i.loli.net/2021/05/28/csWJrf7GD9lN1qO.png)
  
  ​	在创建编辑器的时候将文档树value绑定到组件上，设置回调函数来更新setValue文档书
  
  2.selection的更新
  
  ​	在Editable组件上使用了LayoutEffect这个hooks来同步更新selection，每次渲染都会更新
  
  ![image-20210528161908677](https://i.loli.net/2021/05/28/qgWIXTy6H5kml48.png)

关键算法图解：

这里的关键算法在于如何切割节点并组成新的文档对象树，这里用一个最简单的例子，简单整理了一下这里的算法思路，如下图：

文档对象树如下：

```
{
    type: 'paragraph',
    children: [
    	{ text: 'This' }
    ],
},
```

视图如下：

![image-20210528120337414](https://i.loli.net/2021/05/28/CxfYVFwbvrBN1iG.png)

在Path=[0,0]，offset=3的位置按下Enter键

![image-20210528131723903](https://i.loli.net/2021/05/28/HAtKRV9QTGSsvxO.png)

![image-20210528131826538](https://i.loli.net/2021/05/28/DRVyYBu8so4eZwW.png)



![image-20210528132314310](https://i.loli.net/2021/05/28/YFWOBcAjxEa6mgG.png)

（绿色框表示新增的，红色表示删除的）

一个关键的点在于，如何找到上一次split的文本节点并将其放到到下一个新的paragraph中,关键在循环的最后这行代码

![image-20210528131552164](https://i.loli.net/2021/05/28/IltviMW9FHoKqX1.png)

在每次循环过后，都会跟新position位置，这个位置就是保存了上一次切割后生成的新节点的位置



##### 2.焦点

对于上面已经讲过的东西就不再展开了，补充一个概念Location

type Location = Path | Point | Range （Location可以是Path，Point，Range中的任何一个）

1. Path:就是一个索引数组，上面说过了
2. Point：就是焦点位置，由Path和offset组成，因为要确定一个位置不仅需要知道在哪个节点内，还需要知道在这个节点内的偏移位置
3. Range：就是一段范围，两个点就可以组成一段范围，也就是两个Point，一个起始点，一个终止点

下面直接进入源码分析

- 操作鼠标切换焦点

- 触发onSelectionChange事件，这里的逻辑做了函数节流处理throttle

  ```
  throttle(() => {
      if (
          !readOnly &&
          !state.isComposing &&
          !state.isUpdatingSelection &&
          !state.isDraggingInternally
      ) {
          const root = ReactEditor.findDocumentOrShadowRoot(editor)  //获取原生document对象
          const { activeElement } = root
          const el = ReactEditor.toDOMNode(editor, editor)  //editor实例转化为dom对象
          const domSelection = root.getSelection() //获取原生选区
  
          if (activeElement === el) {
          	state.latestElement = activeElement
          	IS_FOCUSED.set(editor, true)
          } else {
          	IS_FOCUSED.delete(editor)
          }
  
          if (!domSelection) {
          	return Transforms.deselect(editor)
          }
  
      	const { anchorNode, focusNode } = domSelection   //获取选区的起点和终点
  
      	const anchorNodeSelectable = hasEditableTarget(editor, anchorNode) || isTargetInsideVoid(editor, anchorNode)
      	const focusNodeSelectable = hasEditableTarget(editor, focusNode) || isTargetInsideVoid(editor, focusNode)
      	//判断选区可编辑性
  
          if (anchorNodeSelectable && focusNodeSelectable) {
          	const range = ReactEditor.toSlateRange(editor, domSelection, {exactMatch: false,}) //将原始选区转化为slate range
      		Transforms.select(editor, range) //设置选区
      	} else {
      		Transforms.deselect(editor)
      	}
      }
  }, 100)
  ```

  这里的关键逻辑就在于转化ReactEditor.toSlateRange，将真实原生selection转化为slate的range对象，也是整个setSelection的关键逻辑

  ```
  const { exactMatch } = options
  const el = isDOMSelection(domRange) ? domRange.anchorNode : domRange.startContainer //在原生定位光标的对象有两个：selection对象和range对象，需要区分
  let anchorNode
  let anchorOffset
  let focusNode
  let focusOffset
  let isCollapsed
  if (el) {
      if (isDOMSelection(domRange)) {
          anchorNode = domRange.anchorNode
          anchorOffset = domRange.anchorOffset
          focusNode = domRange.focusNode
          focusOffset = domRange.focusOffset
          if (IS_CHROME && hasShadowRoot()) {
              isCollapsed =
              domRange.anchorNode === domRange.focusNode &&
              domRange.anchorOffset === domRange.focusOffset
          } else {
          	isCollapsed = domRange.isCollapsed
          }
      } else {
          anchorNode = domRange.startContainer
          anchorOffset = domRange.startOffset
          focusNode = domRange.endContainer
          focusOffset = domRange.endOffset
          isCollapsed = domRange.collapsed
      }
      // 获取当前焦点的起始节点，在起始节点内的偏移位置，终止节点，在终止节点内的偏移位置，选区是否折叠
  }
  
  if (
      anchorNode == null ||
      focusNode == null ||
      anchorOffset == null ||
      focusOffset == null
  ) {
      throw new Error(
      `Cannot resolve a Slate range from DOM range: ${domRange}`
      )
  }
  
  const anchor = ReactEditor.toSlatePoint(
      editor,
      [anchorNode, anchorOffset],
      exactMatch
  )
  //toSlatePoint将原生的点对象转化为slate点对象
  if (!anchor) {
  	return null as T extends true ? Range | null : Range
  }
  
  const focus = isCollapsed ? anchor : ReactEditor.toSlatePoint(editor, [focusNode, focusOffset], exactMatch)
  //如果选区是折叠的，那么终止节点和起始节点重合，将起始节点赋值给终止节点
  if (!focus) {
  	return null as T extends true ? Range | null : Range
  }
  
  return ({ anchor, focus } as unknown) as T extends true ? Range | null : Range
  ```

  其实toSlateRange的主要逻辑都在toSlatePoint中，因为range就是point组成的，计算出两个ponit组合一下就变成range了

  ```
  const [nearestNode, nearestOffset] = exactMatch ? domPoint : normalizeDOMPoint(domPoint)
  //判断匹配模式，如果是精确匹配就直接使用domPoint，不是的话就要序列化一下domPoint，之前说过光标在同一个地方，获取到的原生selection是不确定的，所以需要序列化保证统一
  //normalizeDOMPoint函数的注释 Normalize a DOM point so that it always refers to a text node.就知道序列化后的节点是指向text文本节点的，看了下指向逻辑，就是循环判断，直到node不是Element类型的节点，然后返回
  while (isDOMElement(node) && node.childNodes.length) {
  	const i = isLast ? node.childNodes.length - 1 : 0
  	node = getEditableChild(node, i, isLast ? 'backward' : 'forward')
  }
  //序列化完成之后
  let leafNode = parentNode.closest('[data-slate-leaf]') //序列化完成后，在判断一下当前node是否在叶子节点内
  if (leafNode) {  
      textNode = leafNode.closest('[data-slate-node="text"]')!  //如果在，就获取文本节点，然后计算出文本节点的偏移量
      const window = ReactEditor.getWindow(editor)
      // 创建dom文档对象，方便调用原生api操作，此时只是在js内存中操作，不会渲染到视图，也不需要渲染到视图
      const range = window.document.createRange()
      range.setStart(textNode, 0)
      range.setEnd(nearestNode, nearestOffset)
      const contents = range.cloneContents()   
      const removals = [
      ...Array.prototype.slice.call(
      contents.querySelectorAll('[data-slate-zero-width]')
      ),
      ...Array.prototype.slice.call(
      contents.querySelectorAll('[contenteditable=false]')
      ),
      ]
      //零宽字符和不可编辑字符是不算在offset里面的，所以需要删除，我们这里只是在js对象上操作，还没真正挂载到dom上，所以不会影响视图
  
      removals.forEach(el => {
      el!.parentNode!.removeChild(el)
      })
  
      // COMPAT: Edge has a bug where Range.prototype.toString() will
      // convert \n into \r\n. The bug causes a loop when slate-react
      // attempts to reposition its cursor to match the native position. Use
      // textContent.length instead.
      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10291116/
      offset = contents.textContent!.length   //计算出offset
      domNode = textNode  //保存这个节点，下面有用
  }
  const slateNode = ReactEditor.toSlateNode(editor, textNode!)   //使用上面保存的原生dom节点来获取slate节点，这里其实在渲染的时候，slate就已经把原生dom节点和slate节点做了映射存在map中（ELEMENT_TO_NODE这个map对象，渲染的时候在使用ref引用真实dom节点，遍历slate文档树时将树中每一个节点和真实dom设进map中），只需要get一下就可以了
  const path = ReactEditor.findPath(editor, slateNode)   //根据节点获取path
  return { path, offset } as T extends true ? Point | null : Point
  ```

- Transforms.select(editor, range)

  ```
  select(editor: Editor, target: Location): void {
      const { selection } = editor
      target = Editor.range(editor, target)
  
      if (selection) {
        Transforms.setSelection(editor, target)
        return
      }
  
      if (!Range.isRange(target)) {
        throw new Error(
          `When setting the selection and the current selection is \`null\` you must provide at least an \`anchor\` and	 			\`focus\`, but you passed: ${JSON.stringify(target)}`
        )
      }
  
      editor.apply({
        type: 'set_selection',
        properties: selection,
        newProperties: target,
      })
    },
  ```

- editor.apply（set_selection）

- Transforms.transform(editor, op)

- applyToDraft（set_selection）

  ```
  case 'set_selection': {
        // debugger;
        const { newProperties } = op
  
        if (newProperties == null) {
          selection = newProperties
        } else {
          if (selection == null) {
            if (!Range.isRange(newProperties)) {
              throw new Error(
                `Cannot apply an incomplete "set_selection" operation properties ${JSON.stringify(
                  newProperties
                )} when there is no current selection.`
              )
            }
  
            selection = { ...newProperties }
          }
  
          for (const key in newProperties) {
            const value = newProperties[key]
  
            if (value == null) {
              if (key === 'anchor' || key === 'focus') {
                throw new Error(`Cannot remove the "${key}" selection property`)
              }
  
              delete selection[key]
            } else {
              selection[key] = value
            }
          }
          //因为这里需要更改的数据已经在外层计算好了，到这里只需要遍历newProperties上的状态赋值到editor的selection就可以了
        }
  
        break
      }
  ```

- finishDraft

- onchange回调

  

#### insertText源码解读

之前自己用原生写的富文本编辑器实现了一个代码块的功能，现在用slate实现一下

实现的功能如下：

1.插入代码块（pre标签）

2.代码块内换行不切断节点，而是插入\n

3.按下ctrl+q退出代码块，如果pre标签没有下一个兄弟节点，则插入新的节点，如果有就跳到这个节点后面

主要实现逻辑和api如下

1.自定义监听事件

![image-20210528150856033](https://i.loli.net/2021/05/28/t14kBXLAlynpN6z.png)

2.自定义渲染函数（renderElement）

![image-20210528153400408](https://i.loli.net/2021/05/28/Cs8YFxljzQbrhwn.png)

2.插入代码块 Editor.setNode()

![image-20210528152212950](https://i.loli.net/2021/05/28/T73wDmHu5sbqWzE.png)

2.代码块内换行 Editor.insertText

​	判单当前焦点在代码块内的话，就不执行默认事件，而是使用insertText api在当前文本后面插入换行符

3.判断当前焦点是否在代码块内

![image-20210528152306892](https://i.loli.net/2021/05/28/ZV9xbXL4h3EstTd.png)

5.退出代码块

​	这里有两种情况，首先遍历editor的每一层，reverse可以控制遍历方向，这里需要从叶子节点开始遍历，设置reverse为true，使用match函数指定需要匹配的节点，拿到这个节点使用Editor.next api获取这个节点的下一个兄弟元素，如果获取到了，直接把焦点设置到下一个兄弟元素上（Transforms.select(editor,nextSilbingNode[1])），并将选区折叠到尾部（Transforms.collapse(editor,{edge:'end'})）

​	如果没有兄弟元素，那么就直接使用Editor.insertBreak(editor)换行，同时将节点标签改成正常的paragraph标签

在这个样例中，我研究了一下insertText的执行流程

- insertText

  ```
  if (marks) {
      const node = { text, ...marks }
      Transforms.insertNodes(editor, node)
  } else {
  	Transforms.insertText(editor, text)
  }
  //如果当前editor上是有marks状态的就需要调用insertNodes方法，因为marks是标记文本的样式（blod，italic等），这些样式需要新的标签来包裹文本
  ```

- Transforms.insertText(editor, text)

- editor.apply({ type: 'insert_text', path, offset, text })  

- Transforms.transform(editor, op)

- applyToDraft（insert_text）

  ```
  case 'insert_text': {
      const { path, offset, text } = op
      if (text.length === 0) break
      const node = Node.leaf(editor, path)
      const before = node.text.slice(0, offset)
      const after = node.text.slice(offset)
      node.text = before + text + after
  
      if (selection) {
          for (const [point, key] of Range.points(selection)) {
              selection[key] = Point.transform(point, op)!
          }
      }
  
      break
  }
  //这里逻辑比较简单，将原始文本切割在和新文本拼接起来
  ```

- finishDraft

- onchange回调

  

#### 总结与感受

上面的3个例子，对Transform模块的三个部分各选了一个命令进行分析，其实已经能大概的总结出slate的一套工作流程或者说是模板了:

​						command--editor.command---Transforms.command---editor.apply(command)---Transforms.transform---applyToDraft---finishDraft

是一套非常统一的流程，也能让我更明白为什么说slate是基于插件开发的框架，插件是slate的一等公民，因为插件就是各种命令的封装，而slate的内核工作流程正是通过命令来传递的

同时还有一点就是slate暴露出来的api非常丰富，简洁干净，细粒度也非常高，能够满足我们绝大部分的对节点和选区增删改查的需求



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

同样，withHistory也是新增了一个history状态对象，两个命令函数redo和undo，也就是实现了撤销/重做的命令，最后返回editor对象，这样我们创建出来的editor就同时拥有了withHistory，withReact，createEditor三个函数所赋予的editor的命令



## 结尾

以上就是我对slate学习的一个简单入门的总结，希望能够加入咱们这个开源项目的研发团队，继续跟着各位大佬交流学习，研究，和一群志同道合的人一起做一件有挑战的事