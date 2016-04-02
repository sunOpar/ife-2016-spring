/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
String.prototype.trim=function(){
  return this.replace(/^\s+|\s+$/,'');
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
   var city=document.getElementById('aqi-city-input').value.trim();
   var aqi_value=document.getElementById('aqi-value-input').value;
   if(city!=''&&aqi_value!=''){
         if(!(/[^\u4e00-\u9fa5A-Za-z]+/).test(city)){
    if(aqi_value==+aqi_value){
      if((~~aqi_value)==aqi_value){
          aqiData[city]=aqi_value;
        }
      else{
          alert('请输入整数~');
        }
      }
     else{
      alert('请输入数字');
     } 
   }
   else{
    alert('请输入汉字或者英文');
   }
    }
    else{
      alert('请输入字符！');
    }
}   

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tab=document.getElementById('aqi-table');
    var str="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var i in aqiData){
      str+=" <tr><td>"+i+"</td><td>"+aqiData[i]+"</td><td><button>删除</button></td></tr>"
    }
    tab.innerHTML=str;
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
function delBtnHandle() {
  // do sth.
  var tab=document.getElementById('aqi-table');
  tab.addEventListener('click',function(ev){
    var e=ev||event;
    var target=e.target||e.srcElement;
    if(target.nodeName=='BUTTON'){
      delete aqiData[target.parentNode.parentNode.firstChild.innerHTML];
      renderAqiList();
    }
  },false);
  
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var add_btn=document.getElementById('add-btn');
  add_btn.addEventListener('click',addBtnHandle,false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  delBtnHandle();
}

init();