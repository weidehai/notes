/*
1.slice(不改变原数组)
Array和String对象都有
在Array中  slice(i,[j])
i为开始截取的索引值,负数代表从末尾算起的索引值，-1为倒数第一个元素
j为结束的索引值，缺省时则获取从i到末尾的所有元素
2.splice(改变原数组)
存在Array中,方法向/从数组中添加/删除项目，然后返回被删除的项目.该方法会改变原始数组
splice(index,howmany,item1,itemx )
index : 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
howmany: 必需。要删除的项目数量。如果设置为 0，则不会删除项目。
item1...itemX : 可选。向数组添加的新项目
3.split
在String中 split（separator，howmany）
separator：必需。字符串或正则表达式，从该参数指定的地方分割 stringObject。
howmany： 可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
4.substring(不改变原字符串)
剪切字符串，返回被剪切的下来的字符串
在String中  substring(start,stop)
start：表示剪切的开始位置，
stop：表示结束位置。
注意：第二个参数应该大于第一个参数。如果出现第一个参数大于第二个参数的情况，substring方法会自动更换两个参数的位置。
5.substr(不改变原字符串)
在String中，substr（start，length）；
start：子字符串的开始位置，
length：子字符串的长度。
*/
