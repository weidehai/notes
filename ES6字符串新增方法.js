/*
*includes,startsWith,endsWith
* includes是区分大小写的
* repeat
* padStart padEnd
* 字符串补全
* trimStart trimEnd
* 清除空白字符串(trim是清除两边的字符串)
 */
const {log} = console;

let name = 'weidehai';
log(name.includes('wei'));
log(name.startsWith('we'));
log(name.endsWith('hai'));

let hello = 'hello';
log(hello.repeat(10));

let month = '5';
//月份显示为两位数，不足的前面补零
log(month.padStart(2,'0'));

let verbos = '  i am a programer  '
log(verbos.trimEnd());
log(verbos.replace(/\s/g,""));

