export function getNowTime() {
    var myDate = new Date;
    var year = myDate.getFullYear();//获取当前年
    var yue = myDate.getMonth() + 1;//获取当前月
    var date = myDate.getDate();//当前日

    var myddy = myDate.getDay();//获取存储当前日期
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var dtime = yue + "月" + date + "日，" + weekday[myddy];
    return dtime;
}
 