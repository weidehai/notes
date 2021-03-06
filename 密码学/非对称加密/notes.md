### 非对称加密原理

一个公钥，一个私钥

公钥所有客户端都可以拿到

私钥只存在于服务器

公钥加密的东西只有私钥可以解密

私钥加密的东西，所有公钥都可以解密

非对称加密不是不能破解只是难以破解，原因就在于大数的质因数分解无法在短时间内完成，而密钥都有过期时间

### 互质

互质是公约数只有1的两个整数,叫做互质整数

### 质因数

质因数（素因数或质因子）在数论里是指能整除给定正整数的**质数**



### 同余符号

“≡”是数论中表示同余的符号

即给定一个正整数n，如果两个整数a和b满足a-b能被n整除，即(a-b)modn=0，那么就称整数a与b对模n同余，记作a≡b(modn)

### 欧拉函数

φ(n)------在小于等于n的正整数中，有多少个与n构成互质的数

### 欧拉定理

两个正整数a和n互质，则有

![img](http://chart.googleapis.com/chart?cht=tx&chl=a^{\phi(n)}\equiv\1 (mod\ n)&chs=60)

### 模反元素

![image-20210607095650906](https://i.loli.net/2021/06/07/pqBQlICtaO46VsT.png)

### RSA算法原理

**第一步，随机选择两个不相等的质数p和q。**60，52

**第二步，计算p和q的乘积n。**61*53=3233

n的长度就是密钥长度。3233写成二进制是110010100001，一共有12位，所以这个密钥就是12位。实际应用中，RSA密钥一般是1024位，重要场合则为2048位。

**第三步，计算n的欧拉函数φ(n)。**

根据公式：φ(n) = (p-1)(q-1)

φ(3233)等于60×52，即3120

**第四步，随机选择一个整数e，条件是1< e < φ(n)，且e与φ(n) 互质。**

e与φ(n)互质，则eφ(n)≡1(modn)，假设这里e选择17

**第五步，计算e对于φ(n)的模反元素d。**

e<span style="color:red">d</span>≡1(modφ(n))=>ed - 1 = kφ(n)=>ex + φ(n)y = 1<span style="color:blue">这个方程的解是一个数组(很大)，每个元素由（x,y）组成</span>

已知 e=17, φ(n)=3120<span style="color:blue">这两个数字是保密的</span>

我们从这个方程的解集中任意取一个来作为d的值

**第六步，将n和e封装成公钥，n和d封装成私钥。**

回顾上面的密钥生成步骤，一共出现六个数字：

> 　　p
> 　　q
> 　　n
> 　　φ(n)
> 　　e
> 　　d

这六个数字之中，公钥用到了两个（n和e），其余四个数字都是不公开的。其中最关键的是d，因为n和d组成了私钥，一旦d泄漏，就等于私钥泄漏。

**那么，有无可能在已知n和e的情况下，推导出d？**

假设已知φ(n)，就可以得出ex + φ(n)y = 1，x就是d，就是17d+3120y=1，当然可以得出这个方程的解集，那么只要我选择的那个解与服务端选择的解一样就可以解密了

因为φ(n)= (p-1)(q-1)，所以要知道p和q，那么就要对n进行因式分解，找到两个互质的因式

大整数的因数分解，是一件非常困难的事情（为什么？）

> "对极大整数做因数分解的难度决定了RSA算法的可靠性。换言之，对一极大整数做因数分解愈困难，RSA算法愈可靠。
>
> 　　假如有人找到一种快速因数分解的算法，那么RSA的可靠性就会极度下降。但找到这样的算法的可能性是非常小的。今天只有短的RSA密钥才可能被暴力破解。到2008年为止，世界上还没有任何可靠的攻击RSA算法的方式。
>
> 　　只要密钥长度足够长，用RSA加密的信息实际上是不能被解破的。"

<span style="color:orange">人类已经分解的最大整数（232个十进制位，768个二进制位）。比它更大的因数分解，还没有被报道过，因此目前被破解的最长RSA密钥就是768位。</span>

公钥加密

假设需要对m加密（m必须是整数（字符串可以取ascii值或unicode值），且m必须小于n）
$$
m^e \equiv c(mod n)
$$
私钥解密
$$
c^d \equiv m (modn)
$$
