## 查看内存的几种方式

### 任务管理查看

![image-20210518104905087](https://i.loli.net/2021/05/18/QeL6YhtsyJ7poqr.png)

适用于粗略查找，需要查找大量内存泄漏，只需要看内存如果是一直增加就可以判断了

### preformance monitor

同上

![image-20210518105055028](https://i.loli.net/2021/05/18/QIp7snaxPeTRYHk.png)

这里有时间线可以看，比较清晰

![image-20210518105156636](https://i.loli.net/2021/05/18/xKTFZA6Y9qugCPk.png)

### preformance memory

![image-20210518105338345](https://i.loli.net/2021/05/18/PimQzseDRfg1w8Z.png)

### memory

![image-20210518105412445](https://i.loli.net/2021/05/18/ungYD9tbTwZW3h6.png)

这里可以详细的看到堆内存上有哪些对象，这里可以记录当前的内存快照，然后进行操作，再次记录一次内存快照，对两次快照进行对比，可以看出哪些对象删除了，是查看内存泄漏的好工具

![image-20210518105636807](https://i.loli.net/2021/05/18/vTUxdqiXb1mg6P8.png)

**注意，记录快照之前，先清除console控制台的内容，因为这里面的内容也会对程序中的对象进行引用，不清除会影响后续的内存分析判断**

![image-20210518105946430](https://i.loli.net/2021/05/18/2XSPZOkat8EcYCb.png)





> 参考文章
>
> https://rocka.me/article/debugging-memory-leak-in-vue2#Retainers