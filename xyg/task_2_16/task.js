function $(id) {
	return document.getElementById(id);
}
var city = document.getElementById('aqi-city-input');	
var weather = document.getElementById('aqi-value-input');
var btn = document.getElementById('add-btn');
var table = document.getElementById('aqi-table');
/**
* aqiData，存储用户输入的空气指数数据
* 示例格式：
* aqiData = {
*    "北京": 90,
*    "上海": 40
* };
*/
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData() {
	var cityV = city.value.trim();
	var weatherV = weather.value.trim();
	if (!cityV) {
		alert('请输入城市名称');
		return false;
	}
	else if(cityV.search(/^[\u4e00-\u9fa5a-zA-Z]+$/) == -1){
		alert('请输入正确的城市名');
		city.value = '';
		return false;
	}
	else if(!parseInt(weatherV)){
		alert('请输入空气质量的值为整数');
		weather.value = '';
		return false;
	}
	else{
		aqiData[cityV] = parseInt(weatherV);
		console.log(aqiData);
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	table.innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for(var i in aqiData){
		table.innerHTML += '<tr><td>' + i + '</td><td>' + aqiData[i] + "</td><td><button onclick = 'delBtnHandle(\""+i+"\")'>删除</button></td>";
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  	addAqiData();
  	renderAqiList();
}

/**
* 点击各个删除按钮的时候的处理逻辑
* 获取哪个城市数据被删，删除数据，更新表格显示
*/
function delBtnHandle(arg) {
	delete aqiData[arg];
	renderAqiList();
}	

function init() {
	btn.onclick = function(){
		addBtnHandle();
	}
};
// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

// 共享onload事件
function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}
	else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}
addLoadEvent(init);


