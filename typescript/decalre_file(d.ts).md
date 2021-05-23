//类型声明文件d.ts引入的也是d.ts，并且引入的是声明类型文件暴露的类型
FIXME: 下面这句话可能有错误
export const Vue: VueConstructor; //这里Vue不是类型，在其他类型声明文件内也不能导入，只是说明在vue.js或vue.ts中导出的Vue必须是VueConstructor类型
（相当于c中的头文件）



declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}


//表示将.vue文件看作一个Vue对象

import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

//在 d.ts 声明文件中，任何的 declare 默认就是 global 的了，所以你在 d.ts 文件中是不能出现 declare global 的。
//只有在模块文件中的定义，如果想要全局就使用 declare global (FIXME:只要使用了import语句，就是模块文件)
//如果不全局声明，那么就需要在当前js的d.ts中引入这个类型，否则在写js的时候找不到这个类型

不确定的属性
interface xxx {
    [propName:string]:any
}

非空断言
xxx!.xxxx 相当于  xxxx && xxxx.xxx

枚举的反向映射
enum Color{
    red
    yellow
    blue
}

Color[0]-----red


接口也可以使用泛型
interface boy<T>{
    name:T
}

let weidehai:boy<string>


配置文件中的
【baseUrl，path】  路径映射
【types,typeRoot,snode_module中的@type】查找声明文件的地方

include 需要包含的编译文件（注意ts会将有可能作为被输出的文件忽略掉，比如文件夹下有a.ts和a.d.ts,那么a.d.ts是有可能被输出的，因为
编译的时候可以若加上了输出声明文件选项就会输出同名声明文件）

三斜杠指令导入
import导入


&符（交叉类型）
交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

let point: Point = {
  x: 1,
  y: 1
}
遇到同名属性的表现
1.同名基础类型属性的合并
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string
}

type XY = X & Y;
type YX = Y & X;

let p: XY;
let q: YX;
c同名了，最终编译出来c是never
这是因为混入后成员 c 的类型为 string & number，
即成员 c 的类型既可以是 string 类型又可以是 number 类型。很明显这种类型是不存在的，所以混入后成员 c 的类型为 never。

2.同名非基础类型合并
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666
  }
};

console.log('abc:', abc);

最终x会变成
x:{
  {
    d:boolean,
    e:string,
    f:number
  }
}


declare type ExtendableTypes = 'Editor' | 'Element' | 'Text' | 'Selection' | 'Range' | 'Point' | 'InsertNodeOperation' | 'InsertTextOperation' | 'MergeNodeOperation' | 'MoveNodeOperation' | 'RemoveNodeOperation' | 'RemoveTextOperation' | 'SetNodeOperation' | 'SetSelectionOperation' | 'SplitNodeOperation';
这样声明的意思是：ExtendableTypes类型的值必须是后面给出的字符串中的一种

## typescript条件类型

![image-20210522210809382](https://i.loli.net/2021/05/22/sQj14G9EqdMK3A7.png)

> https://itdashu.com/docs/typescriptlesson/2edda/conditionaltype.html

## unknown和 any

any 和 unknown 的最大区别是, unknown 是 top type (任何类型都是它的 subtype) , 而 any 即是 top type, 又是 bottom type (它是任何类型的 subtype ) , 这导致 any 基本上就是放弃了任何类型检查

toptype就是假如我定义了一个unknown类型的变量a

let a:unknown

那么我可以给这个变量赋任何类型的值,应为任何类型都是unknown的子类型，子类型当然可以赋值给父类型

a = "123" //string

a = 12 //number

但是反过来，想把unknown类型的变量赋值给任意具体类型就不可以，就是反向赋值是有类型检查的

而any就是正反都可以，等于放弃了类型检查



export declare 声明变量，并非类型

export interface 声明接口类型



## 约束类型

![image-20210523194944265](https://i.loli.net/2021/05/23/o7yxGVcRaw8dKMi.png)



子类可以赋值给父类

