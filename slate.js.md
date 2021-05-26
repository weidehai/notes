its logic is implemented with a series of plugins（slate的逻辑是通过插件来实现的）

我的理解：slate会提供一些基础的能力，也就是只提供核心功能（比如选取，范围，序列化等），而将富文本的能力做成接口，由开发者自行来定制需要实现的富文本能力

The `<Editable>` component acts like `contenteditable`. Anywhere you render it will render an editable richtext document for the nearest editor context

Editable组件最终会被渲染成contenteditable属性为true的dom节点

![image-20210522235033690](https://i.loli.net/2021/05/22/xEZw7j4nusSkKqf.png)

This offers a sense of what can be done with Slate's event handlers. Each one will be called with the event object, and you can use your editor to perform commands in response. Simple!

每一个事件句柄的调用都会传入对应的事件对象，在回调中可以使用editor来执行相应的命令，editor中的命令也是可以扩展的

![image-20210522235342654](https://i.loli.net/2021/05/22/zbCki8J45SfMeRq.png)

In our previous example, we started with a paragraph, but we never actually told Slate anything about the paragraph block type. We just let it use its internal default renderer, which uses a plain old <div>

But that's not all you can do. Slate lets you define any type of custom blocks you want, like block quotes, code blocks, list items, etc.

在value值中，只有一个节点就是paragraph节点，我们没有告诉slate该以何种dom标签来渲染这个节点（也就是我们没有指定自定义的渲染方式），slate会使用默认的div标签来渲染这个节点

slate当然支持自定义标签来渲染，接下来就让我们来学习如何使用自定义标签渲染节点吧	

![image-20210523000906833](https://i.loli.net/2021/05/23/wKqylaTjCHbBf36.png)

type设置条件表达式，动态开关状态

For every format you add, Slate will break up the text content into "leaves"

所有的格式化中，其文本内容都会被渲染到叶子节点上

命令其实就是将我们的一些执行逻辑封装成一个函数，达到可复用的目的

You can emulate this strategy for any format you like. You can serialize to HTML, to Markdown, or even to your own custom JSON format that is tailored to your use case.

序列化和反序列化就是在保存数据的时候使用的，可以让我们在保存数据的时候自定义需要保存成的格式，在渲染时通过反序列化渲染

## 描述dom树

slate.js回在内部维护一个树结构的对象来描述真实的dom结构



树中的节点有三种类型

1.editor类型：树的根节点就是这个类型

2.element类型：类似于dom对象的HTMLElement对象

3.text类型：文本节点

![image-20210522093924365](C:\Users\24339\AppData\Roaming\Typora\typora-user-images\image-20210522093924365.png)

## 命令

在进行富文本编辑的时候，所有的操作比如：插入文本，删除文本，分隔段落，添加格式等都可以看做是一条命令

## 内建约束

1. **所有 `Element` 节点最后必须包含至少一个 `Text` 节点。** 如果一个元素节点不包含任何子节点，那么会添加一个空的文本节点作为它的唯一子节点。这个约束确保选择范围 (`selection`)的锚点 (`anchor`)和焦点 (`focus`) 总是指向任意节点内部 (通过依赖文本节点的引用)。这样，空元素（或者 `void` 类型对象）就无法被选择。
2. **两个相邻的有同样属性的文本会被合并。** 如果两个相邻的文本节点有相同的格式，它们会被合并到一个文本节点中。这样会避免文本节点无限制扩展数量，因为添加和删除格式都会分割文本节点。
3. **块节点要么只能包含其他块节点，要么包含内联节点和文本节点。** 比如，一个 `paragraph` 块节点不能同时包含另一个 `paragraph` 块节点及一个 `link` 内联元素。允许包含的子节点由第一个子节点所决定，任何其他不被允许的子节点会被移除。这确保了常见的富文本行为（比如“把一个块元素分割成两个”）始终如一。
4. **行内节点既不能是父块节点的第一个或最后一个子块，也不能挨着子数组中的另一个行内节点。** 如果是这种情况，将添加一个空文本节点来满足当前的约束条件。
5. **顶级的编辑器节点只能包含块节点。** 如果任何顶级子级是内联节点或文本节点，它们将被删除。这样可以确保编辑器中始终存在块节点，从而使诸如「将块分成两个」之类的行为按预期工作。

这些默认约束都是强制性的，因为它们保证 `Slate` 文档有 *更好的* 可预测性。

在每一次对一个节点（或者他的后代）应用插入或者更新操作时都会调用 `normalizeNode` 函数来规范化插入内容，slate允许扩展编辑器的 `normalizeNode` 函数



![image-20210522125856094](https://i.loli.net/2021/05/22/gMREC7sYtf1mW8p.png)





![image-20210522125938880](https://i.loli.net/2021/05/22/c1lnJSezgAUErmh.png)

renderElement会返回一个符合JSX.Element接口的对象，这个对象正好是createElement需要的参数，jsx最终也被编译成creatElement的形式

![image-20210522215502889](https://i.loli.net/2021/05/22/i8KRdoNsyDLA6Il.png)

## slate组件

![image-20210522221304870](https://i.loli.net/2021/05/22/AQmnZj6TW2xXYgH.png)

slate组件是provider上下文组件，provider跟踪的数据可以被editable获取





主要讲解slate的核心库，插件是开发者自己实现（依赖与核心库）



/**

 \* The `Editor` interface stores all the state of a Slate editor. It is extended

 \* by plugins that wish to add their own helpers and implement new behaviors.

 */

BaseEditor是基类，通过插件继承基类可以扩展自定义的行为



ReactEditor.toDOMNode(editor, editor)

这里获取了真实的dom节点

getRootNode

- Calling it on an element inside a standard web page will return an [`HTMLDocument`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDocument) object representing the entire page.
- Calling it on an element inside a shadow DOM will return the associated [`ShadowRoot`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot).



ReactEditor BaseEditor EditorInterface

Editor对象实现了EditorInterface

Editor = BaseEditor 

ReactEditor 扩展自BaseEditor 





## 四种节点对象类型

### Editor节点对象

是整个文档树的根节点，对象中有文本编辑操作的方法，获取编辑状态的方法等，通过children指针指向其子节点

### Elements对象

构成了文档的中间层，就是除了叶子节点和editor节点剩下的都是中间层，中间层可以嵌套

Elements make up the middle layers of a richtext document

根据dom对象可将，中间层元素可以分为两种类型：块级元素和行内元素

All elements default to being "block" elements. They each appear separated by vertical space, and they never run into each other.

slate默认将所有element设置为块级元素

Note that inline nodes cannot be the first or last child of a parent block, nor can it be next to another inline node in the children array. Slate will automatically space these with { text: '' } children by default with normalizeNode.

如果行内节点的父节点是块级元素，则行内节点不能是第一个或者最后一个子节点，如果有过个类型为行内节点的子节点，那么这些子节点不能互为相邻的兄弟节点，如果相邻了slate会自动使用一个空白的叶子节点来分割他们

### void节点对象

Elements default to being non-void, meaning that their children are fully editable as text. But in some cases, like for images, you want to ensure that Slate doesn't treat their content as editable text, but instead as a black box.

不可编辑的节点对象

### text节点对象

Text nodes are the lowest-level nodes in the tree, containing the text content of the document, along with any formatting

text节点叶子节点，包含了文本和样式属性



onDOMSelectionChange

监听原生事件selectionchange，每当getSelection的值，也就是selection发生变化就会触发



EDITABLE组件内部自己维护着一个状态

 // Keep track of some state for the event handler logic.

 const state = useMemo(

  () => ({

   isComposing: false,

   isDraggingInternally: false,

   isUpdatingSelection: false,

   latestElement: null as DOMElement | null,

  }),

  []

 )



![image-20210524170650893](https://i.loli.net/2021/05/24/RQfeEyJ6BU8m9dA.png)

判断选区的起始节点和结束节点是否是可编辑的



## Path 

Path arrays are a list of indexes that describe a node's exact position in a Slate node tree

path数组由描述节点在slate节点数中的位置的索引组成

