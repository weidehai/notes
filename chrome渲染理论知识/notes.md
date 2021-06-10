## 浏览器帧率问题

为什么chrome浏览器帧率最高是60帧，浏览器进行了锁帧，每一秒只输出60张画面，约16.6ms输出一张画面（猜测是可以调的）





## 浏览器渲染流程图

![webkit渲染过程](https://i.loli.net/2021/06/05/ZrSkBIuCAfeXFvg.png)

renderTree就是将dom和css组合在一起，并且过滤掉不可见元素

- 一些不会渲染输出的节点，比如script、meta、link等。
- 一些通过css进行隐藏的节点。比如display:none。注意，利用visibility和opacity隐藏的节点，还是会显示在渲染树上的。只有display:none的节点才不会显示在渲染树上

layout就是排版，这里会计算出每个元素真正显示在屏幕上的位置信息，这个信息在不同的窗口大小是不同的（如果使用了相对单位）

