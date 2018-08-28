var arr = [],
    arr_len = 5000;

for (var i = 1; i <= arr_len; i++) {
    arr.push(i)
}

for (var i = 0; i < arr_len; i++) {
    var currentRandom = parseInt(Math.random() * (arr_len - 1));
    var current = arr[i];
    arr[i] = arr[currentRandom];
    arr[currentRandom] = current;
}

// function defaultSort(arr) {
//     return arr.sort()
// }
//箭头函数
let defaultSort = (arr) => arr.sort();
defaultSort(arr)

//快速排序， 最后会依靠递归，这个方法我很讨厌
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    else {
        var c = arr.splice(parseInt(arr.length - 1) / 2, 1)[0];
        var left = [],
            right = [];
        for (var i = 0; i < arr.length; i++) {
            //写成三元表达式
            arr[i] > c ? right.push(arr[i]) : left.push(arr[i])
        }
        return quickSort(left).concat(c, quickSort(right))  //这个和下边的写法都可以
        // return [].concat(quickSort(left),[c],quickSort(right))
    }
}
arr = quickSort(arr) //必须接住执行后的数组

//插入式排序
function insertSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        var t = arr[i],
            p = i - 1;
        do {
            if (p >= 0 && arr[p] > t) {
                arr[p + 1] = arr[p]
                p--;
            } else {
                arr[p + 1] = t;
                break;
            }
        } while (true)
    }
}
insertSort(arr)


/*
数组比较少的时候 quickSort 是比较快的。
但是数组长度比较长的时候，由于quickSort是递归实现的，则速度回变得很慢，insertSort就比较快了
*/