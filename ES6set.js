/*
***ES6新增数据结构Set
* 它类似于数组，但是成员的值都是唯一的，没有重复的值。
* 方法：add,delete,has,size,keys,values,entries,forEach
* 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
 */


const s =new Set([1,1,1,2,3,4,5,6,4,4,2,8,9]);
const {log} = console;
s.add(7);

log(...s);

const str = 'weidehai';
let kk = new Set(str);
log([...kk].join(''));

log(kk.size,kk.add('q'),kk.has('q'),kk.delete('q'));

for (let key of kk.keys()){
    log(key);
}
for (let v of kk.values()){
    log(v);
}
for (let e of kk.entries()){
    log(e);
}



/*
****
* javaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
---------------------------------------------------
const data = {};
const element = document.md.getElementById('myDiv');

data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
---------------------------------------------------
*上面代码原意是将一个 DOM 节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串[object HTMLDivElement]。
*为了解决这个问题，ES6相关 提供了 Map 数据结构和算法。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
*也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
 */

//作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
//方法has,get,delete,set
const map = new Map([['name','weidehai'],['age',22],['sex','male']]);
log(map.get('name'));
map.set('height','163cm');
console.log(map);



//------------------
//注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
//const map = new Map();
//map.set(['a'], 555);
//map.get(['a']) // undefined
//上面代码的set和get方法，表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，因此get方法无法读取该键，返回undefined。
//-------------------







