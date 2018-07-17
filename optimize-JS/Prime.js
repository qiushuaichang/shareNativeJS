// 判断一个数是不是质数
function isPrime(n) {
    if (n <= 3) return true; //小于3的数都是质数

    else if (n % 2 == 0) return false; //被2整除的数都不是质数

    else {
        for (var i = 3; i < Math.sqrt(n); i += 2) {
            //Math.sqrt(n)因为如果一个数不是质数，那么它的两个因数一定有一个小于等于sqrt（），因此只要找较小的因子就可以了
            if (n % i == 0) return false
        }
    }
}

//测试百万级数据搜索查询速度
var arr = [];
for (var i = 0; i < 1000000; i++) {
    arr.push(parseInt(Math.random() * 1000000))
}

console.time("isPrime")
for (var i = 0; i < arr.length; i++) {
    isPrime(arr[i])
}
console.timeEnd("isPrime")