//查找字符串中出现次数最多的字符，共出现几次
var str = "aaaaadasdsddsbbbbbbbdlskddkkkkkdsddd"

function searchCode(str) {
    var str = str.split("").sort().join("");
    var reg = /([a-z])\1*/g;
    var arr = str.match(reg).sort(
        (a, b) => b.length - a.length
    )
    console.log(
        "出现次数最多的字符是: " + arr[0][0] + " ,共出现 " + arr[0].length + " 次。"
    )
}
searchCode(str)