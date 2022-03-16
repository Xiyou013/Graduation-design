//日期转换格式函数
export const dateTimeFn = {
    //年-月-日 时：分：秒
    //yyyy-MM-dd HH:mm:ss
    showTime(val) {
        var date = new Date(val);
        var msg = date.getFullYear() + '-' + this.padaDate(date.getMonth() + 1)
            + '-' + this.padaDate(date.getDate()) + ' ' + this.padaDate(date.getHours()) +
            ':' + this.padaDate(date.getMinutes()) + ':' + this.padaDate(date.getSeconds());
        // console.log(msg)
        return msg;
    },
    //yyyy-MM-dd
    showDate(val) {
        var date = new Date(val);
        var msg = date.getFullYear() + '-' + this.padaDate(date.getMonth() + 1)
            + '-' + this.padaDate(date.getDate())
        return msg;
    },
    //yyyy-MM
    showMonth(val) {
        var date = new Date(val);
        var msg = date.getFullYear() + '-' + this.padaDate(date.getMonth() + 1)
        return msg;
    },
    //日期转为毫秒数
    showDateTime(date){
        console.log('val: ',date)
        const tempDate = new Date(date.replace(/-/g, '/')); // 把日期字符串转换成日期格式
        var msg = (new Date(tempDate)).getTime(); //得到毫秒数
        return msg;
    },
    //月-日 时:分:秒
    //不足两位数的补全格式为：0x
    padaDate(value) {
        return value < 10 ? '0' + value : value;
    },
}