//年-月-日 时：分：秒
//yyyy-MM-dd HH:mm:ss
function showDataTime(val) {
    var date = new Date(val);
    var msg = date.getFullYear() + '-' + padaDate(date.getMonth() + 1)
        + '-' + padaDate(date.getDate()) + ' ' + padaDate(date.getHours()) +
        ':' + padaDate(date.getMinutes()) + ':' + padaDate(date.getSeconds());
    // console.log(msg)
    return msg;
}

//时：分
//HH:mm
function showTime(val) {
    var date = new Date(val);
    var msg = padaDate(date.getHours()) +
        ':' + padaDate(date.getMinutes());
    // console.log(msg)
    return msg;
}
//不足两位数的补全格式为：0x
function padaDate(value) {
    return value < 10 ? '0' + value : value;
}

module.exports = {
    showDataTime,
    showTime,
};