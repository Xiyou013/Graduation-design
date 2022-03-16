function getRnadomFiveInt(num) {
    //创建空数组
    var temp = [];
    //for循环来生成随机五个数组元素，有可能是五个||四个||其他
    for (var i = 0; i < num; i++) {
        //生成一个random_int的变量来存放0-9的随机数
        var random_int = parseInt(Math.random() * 10);
        //如果这个数组为0位||生成的随机数为0，返回函数，利用递归来继续循环
        if (i === 0 && random_int === 0) {
            return this.getRnadomFiveInt();
        }
        //在temp空数组中添加随机数
        temp.push(random_int);
    }
    //输出数组，数组长度，并且输出数组的每一位
    console.log(temp, temp.length, temp.join(""));
    return temp.join("");
}

module.exports = {
    getRnadomFiveInt,
};