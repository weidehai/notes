## 查看事件监听器

![image-20210623095318744](https://i.loli.net/2021/06/23/gDtYOH2QqPU3FuJ.png)

搜索event，这两个就是关键

通过addeventListener监听的会在V8和eventlistener中，通过dom onxxxx监听的只会在eventlistener中

![image-20210623095442457](https://i.loli.net/2021/06/23/McSsgqfrRHLyk7X.png)

![image-20210623095512640](https://i.loli.net/2021/06/23/NLsKhGiCPAQJHc5.png)

其实eventlistener引用了v8，internalnode就是绑定这个事件的dom对象

![image-20210623095642473](https://i.loli.net/2021/06/23/Ker3pv2BOYbVyso.png)

![image-20210623095633149](https://i.loli.net/2021/06/23/Gwa3Pd8FOUDflmX.png)

通过onclick绑定的，选中，看下面的Object中的内容，可以看到其绑定的对象



现在浏览器中，addeventlistener不需要remove，浏览器会自动释放dom对象，并移出监听器（在闭包中不会）

![image-20210623101230576](https://i.loli.net/2021/06/23/5ENHRuZbAGfQrWk.png)

![image-20210623101313209](https://i.loli.net/2021/06/23/7US2EBk1zr8xyXK.png)

![image-20210623101413076](https://i.loli.net/2021/06/23/5H8evoSTIUxpnEq.png)

删除后

![image-20210623101504230](https://i.loli.net/2021/06/23/KMQkpTAGJqVRoeI.png)

![image-20210623101843093](https://i.loli.net/2021/06/23/wjt7bZyQ4DxIgkm.png)

在闭包中的情况

![image-20210623101957683](https://i.loli.net/2021/06/23/tARZ6JcoQHdg1p4.png)

点击delh1删除掉h1，但是闭包中仍然引用h1，所以这个dom对象不会被释放

![image-20210623102138882](https://i.loli.net/2021/06/23/RwEUqsFI9vg64Km.png)

删除后

![image-20210623102505698](https://i.loli.net/2021/06/23/IHy2hfMB7PFWLZD.png)

可以看到h1变成detached了，也就是说h1对象虽然在文档中看不见了，但是其没有被删除，处于一种游离状态，其对象仍然存在于内存中，鼠标悬浮依然可以看见对象的内容

