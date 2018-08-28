/**
 * 判断一个单词是否是回文？
 * 回文是指把相同的词汇或句子，在下文中调换位置或颠倒过来，产生首尾回环的情趣，叫做回文，也叫回环。比如 mamam redivider .
 */

 var str = 'redivider';
 function checkPalindrom(str) {  
    return str == str.split('').reverse().join('');
}


return

/**
 * 不借助临时变量，进行两个整数的交换
 * 输入 a = 2, b = 4 输出 a = 4, b =2
*/
// 一
a = a + b;
b = a - b;
a = a - b;
// 二
a ^= b;
b ^= a;
a ^= b;
// 三
a = [a,b];
b = a[0];
a = a[1];
// 四
a = [b,b=a][0];


return

/**
 * 随机生成指定长度的字符串
*/
function randomString(n) {  
    let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
    let tmp = '',
        i = 0,
        l = str.length;
    for (i = 0; i < n; i++) {
      tmp += str.charAt(Math.floor(Math.random() * l));
    }
    return tmp;
  }
