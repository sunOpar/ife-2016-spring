/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  initAqiChartData();
  var tab=document.getElementById('table');
  tab.innerHTML='';
  var width=0;
  var right=0;
  var temp=0;
  if(pageState.nowGraTime=='day') width=20;
  if(pageState.nowGraTime=='week') width=100;
  if(pageState.nowGraTime=='month') width=200;
  for(var i in chartData){
    var div=document.createElement('div');
    div.title=i+' '+chartData[i];
    div.style.width=width+'px';
    div.style.left=right+'px';
    div.style.height=chartData[i]+'px';
    div.style.background='#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);; 
    tab.appendChild(div);
    right+=width;
  }
  for(var j in chartData){
    if(chartData[j]>temp){
      temp=chartData[j];
    }
  }
  tab.style.height=temp+20+'px';
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if(this.value!=pageState.nowGraTime){
  // 设置对应数据
    pageState.nowGraTime=this.value;
  // 调用图表渲染函数
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var index = this.selectedIndex; // 选中索引
  var text = this.options[index].text; // 选中文本
  if(text!=pageState.nowSelectCity){
  // 设置对应数据
    pageState.nowSelectCity=text;
  // 调用图表渲染函数
    renderChart();
  }

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
      var form_one=document.getElementById('form-gra-time');
      var inputLists=form_one.getElementsByTagName('input');
      var i=0,len=inputLists.length;
      for(i;i<len;i++){
        inputLists[i].addEventListener('click',graTimeChange,false);
      }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var sele=document.getElementById('city-select');
  sele.innerHTML='';
  var str='';
  for(var i in aqiSourceData){
    str+='<option>'+i+'</option>'
  }
  sele.innerHTML=str;
  sele.addEventListener('change',citySelectChange,false);
  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData={};
  var nowCity=pageState.nowSelectCity;
  var nowTime=pageState.nowGraTime;
  var data=aqiSourceData[nowCity];
  var all=1;
  for(var t in data){
    all++;
  }
  var last=all%7;
  console.log(all)
  console.log(last)
  if(nowTime=='day'){
    for(var i in data){
      chartData[i]=data[i];
    }
  }
  if(nowTime=='week'){
    var week=1;
    var day=1;
    var week_sum=0;
    for(var m in data){
      week_sum+=data[m];
      day+=1;
      if(day==7&&week<=~~(all/7)){
        chartData['第'+week+'周']=~~(week_sum/7);
        day=1;
        week_sum=0;
        week++;
      }
      if(week>~~(all/7)&&day==last+1){
        chartData['最后一周']=~~(week_sum/last);
      }
    }
  }
  if(nowTime=='month'){
     var month=null;
     var obj={};
     for(var j in data){
          month=String(j).slice(5,7);
          if(month in obj){
              obj[month]['count']+=1;
              obj[month]['sum']=obj[month]['sum']+data[j];
          }
          else{
              obj[month]={};
              obj[month]['count']=1;
              obj[month]['sum']=data[j];
          }

        }
     for(var k in obj){
       chartData[k+'月']=~~(obj[k]['sum']/obj[k]['count']);
     }
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  renderChart();
}

init();