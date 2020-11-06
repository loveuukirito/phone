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

export function getNowDate(){
    var myDate = new Date();
	//获取当前年
	var year=myDate.getFullYear();
	//获取当前月
	var month=myDate.getMonth()+1;
	//获取当前日
	var date=myDate.getDate(); 
	//alert(year+"-"+month+"-"+date)
    var nowDate= year+"-"+('0'+month).slice(-2)+"-"+('0'+date).slice(-2);
    return nowDate;
}
 
