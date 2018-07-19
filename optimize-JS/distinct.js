//数组去重
var arr = [];

//考虑百万级数据
for (var i = 0; i < 1000000; i++) {
    arr.push(parseInt(Math.random() * 1000))
}

var arr2 = arr
    //利用两层循环
function repeat1(arr) {
    for (var i = 0, result = []; i < arr.length; i++) {
        if (result.indexOf(arr[i]) == -1) //indexOf方法其实就是封装了循环，效率依旧低
            result.push(arr[i])
    }
    return result
}

//利用hash----推荐      在百万级以上的数组中，效率是repeat1的80倍以上
function repeat2(arr) {
    for (var i = 0, result = [], hash = {}; i < arr.length; i++) {
        if (hash[arr[i]] === undefined) {
            hash[arr[i]] = true;
            result.push(arr[i]);
        }
    }
    return result
}