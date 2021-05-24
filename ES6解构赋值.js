/*
*组数的解构赋值
* 解构赋值允许指定默认值。
 */

let [a,c] = [1,2,3];
let [foo,[[bar],baz]] = [1,[[2],3]];
//本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值
console.log(foo,bar,baz);
console.log(a,c);


let [f,...s] = [1,2,3,4,5]
console.log(f,s);
let [x,y,...z] = [1];
console.log(x,y,z);


///另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功

let [k,[j],p] = [1,[2,3],4];
console.log(k,j,p);

//如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。


let [df=10] = [];
console.log(df);


//默认值可以引用解构赋值的其他变量，但该变量必须已经声明。


let [q=1,w=q] = [,4];
console.log(q,w);



/*
*对象的解构赋值
* 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
 */

//对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
let {name,age,sex} = {name:'weidehai',age:'22',sex:'male'};
const {log} = console;
log(name,age,sex);
//如果变量名与属性名不一致，必须写成下面这样。
let {first:fff} = {first:'1111'};
log(fff);




/*
*字符串的解构赋值
 */

let [ff,sss,ttt] = 'abc';
log(ff,sss,ttt);
let {length:len} = 'abcdfg';
log(len);


let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }