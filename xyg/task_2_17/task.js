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
    'use strict';
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    'use strict';
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i += 1) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}
/**
 * 存储所有源数据，
 * 城市：{日期：空气质量}
 * @type {Object}
 */
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


// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};


/**
 * 用来得到当前城市
 * @return {[type]} [当前城市字符串形式]
 */
function getcurrentCity() {
    var city = document.getElementById('city-select'), //得到城市选项框
        cityLen = city.options.length, //option长度
        cityArray = []; //用来将城市存放到数组里。
    for (var i = 0; i < cityLen; i++) {
        cityArray[i] = city.options[i].value;
    }
    var index = city.selectedIndex,
        currentCity = cityArray[index]; //当前选项框城市
    return currentCity;
}



/**
 * 渲染图表
 */
function renderChart(arg) {
    var chart = document.getElementsByClassName('aqi-chart-wrap')[0];
    var numAqi = chart.getElementsByTagName('div');
    var currentCity = getcurrentCity();
    /**
     * 如果页面有图表，移除图表
     * @param  {[图表子元素长度]} numAqi.length !
     */
    if (numAqi.length !== 0) {
        chart.innerHTML = '';
    }
    /**
     * 如果调用该方法时传递了参数
     * 那么根据参数和当前日期粒度来渲染图表
     * @param  {[number]} arguments.length [参数长度]
     */
    var color = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
              '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];
    if (arguments.length === 1) {
        chart.style.cssText += '';
        switch (chartData.format) {
            case 'day':
                for (var i = 0, j = arg.length; i < j; i++) {
                    // console.log('j为' + chartData[currentCity][j]);
                    var fir = document.createElement('div');
                    fir.style.cssText += 'background-color:' + color[Math.floor(Math.random() * 10)] + ';width:10px;height:' + arg[i] +
                        'px;display:inline-block;margin-right:5px;';
                    chart.appendChild(fir);
                }
                break;
            case 'week':
                for (var i = 0, j = arg.length; i < j; i++) {
                    var fir = document.createElement('div');
                    console.log(Math.floor(Math.random() * 500000));
                    fir.style.cssText += 'background-color:' + color[Math.floor(Math.random() * 10)] + ';width:70px;height:' + arg[i] + 'px;display:inline-block;margin-right:15px;';
                    chart.appendChild(fir);
                }
                break;
            case 'month':
                for (var i = 0, j = arg.length; i < j; i++) {
                    var fir = document.createElement('div');
                    fir.style.cssText += 'background-color:' + color[Math.floor(Math.random() * 10)] + ';width:300px;height:' + arg[i] + 'px;display:inline-block;margin-right:15px;';
                    chart.appendChild(fir);
                }
                break;
            default:
                alert('something wrong');
        }
    }


}
// 用于渲染图表的数据
var chartData = {};
/**
 * 用来作为radio和select渲染图片的数据处理
 * @param  {[type]} arg         [为当前的日期粒度]
 * @param  {[type]} currentCity [当前城市]
 * @return {[type]}             [description]
 */
function choose(arg, currentCity) {
    currentChartDate = []; //用来存放渲染图表的数据
    switch (arg) {
        case 'day':
            chartData.format = 'day';
            for (var i = 0, j = chartData[currentCity].length; i < j; i++) {
                currentChartDate[i] = chartData[currentCity][i];
            }
            break;
        case 'week':
            chartData.format = 'week';
            //循环遍历城市
            var count = 0; //用来计算循环执行七次
            var kWeek = 0; //用来做currentchartDate的索引
            var total = 0; //用来存放七次的结果累加
            for (var iWeek = 0, jWeek = chartData[currentCity].length; iWeek < jWeek; iWeek++) {
                if (count < 7) {
                    total += chartData[currentCity][iWeek];
                    count++;
                    if (count === 7) {
                        currentChartDate[kWeek] = Math.round(total / count);
                        total = 0;
                        count = 0;
                        kWeek++;
                    }
                }
            }
            break;
        case 'month':
            chartData.format = 'month';
            var kMonth = 0; //kMonth为图表数据数组index
            // 遍历循环城市
            // iMonth为城市名
            var countMonth = 0, //用于计算一个月循环执行次数
                totalMonth = 0, //用于累加每一次的循环结果
                countDay = 0, //用来计算是否为所有日期中最后一天
                month = '';
            // chartData[iMonth] = []; //设置图表数据城市属性为数组
            // 遍历循环天数 jMonth为日期
            for (var data in aqiSourceData[currentCity]) {
                // 目的为了在循环一开始获取当月月份
                if (countMonth === 0) {
                    month = data.slice(5, 7);
                }
                countDay++;
                totalMonth += aqiSourceData[currentCity][data];
                countMonth++;
                // 如果月份不对，则计算结果
                if (month !== data.slice(5, 7)) {
                    // 由于如果月份不对会多加一次，所以这里减掉。
                    currentChartDate[kMonth] =
                        Math.round((totalMonth - aqiSourceData[currentCity][data]) / (countMonth - 1));
                    kMonth++;
                    countMonth = 0;
                    //循环已经到第二个月开头，所以下一次循环之前要把它加进去
                    totalMonth = aqiSourceData[currentCity][data];
                }
                // 或者月份为最后一天，则计算结果
                else if (countDay === 91) {
                    currentChartDate[kMonth] =
                        Math.round(totalMonth / countMonth - 1);
                    kMonth++;
                    countMonth = 1;
                }
            }
            kMonth = 0;
            break;
        default:
            alert('something wrong');
    }
    return currentChartDate;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    //确定是否选项发生了变化
    // 设置对应数据
    // 调用图表渲染函数
    if (this.checked) {
        var currentCity = getcurrentCity();
        /**
         * 通过把当前radio的value值和当前城市的值传递给choose得到数据
         * @type {[type]}
         */
        var currentChartDate = choose(this.getAttribute('value'), currentCity);
        renderChart(currentChartDate);
    }
}
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    if (this.selectedIndex !== -1) {
        //this为select
        //this.value为当前被选择的选项的值
        var currentChartDate = choose(chartData.format, this.value);
        renderChart(currentChartDate);
    }
    // 调用图表渲染函数
}

/**
 * 跨浏览器兼容事件绑定
 * @type {Object}
 */
var EventUtil = {
    /**
     * @param {元素节点}
     * @param {[事件类型]}
     * @param {[事件处理函数]}
     */
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    /**
     * @param {[element:元素节点]}
     * @param {[type:事件类型]}
     * @param {[handler:事件处理函数]}
     */
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    }
};
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */

function initGraTimeForm() {
    var radio = document.getElementsByTagName('input');
    var j = radio.length;
    for (var i = 0; i < j; i++) {
        EventUtil.addHandler(radio[i], 'click', graTimeChange);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var cityDate = [];
    var j = 0;
    for (var i in aqiSourceData) {
        cityDate[j] = i;
        j++;
    }
    var city = document.getElementById('city-select');
    var k = cityDate.length;
    for (var m = 1; m < k; m++) {
        var newOption = new Option(cityDate[m], cityDate[m]);
        city.add(newOption, undefined);
    }
    EventUtil.addHandler(city, 'change', citySelectChange);
    // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 * chartData{
 *     '北京':[454,12,155,44],
 *     '上海':[75,14,45,322]
 * }
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    /**
     * 循环遍历源数据的城市对象
     * @param  {[string-城市]} var i
     */
    for (var i in aqiSourceData) {
        /**
         * 作为chartData的数组索引
         * @type {Number}
         */
        var k = 0;
        chartData[i] = [];
        /**
         * 循环遍历城市对象的数据
         * @param  {[城市中的数据]} var j
         */
        for (var j in aqiSourceData[i]) {
            chartData[i][k] = aqiSourceData[i][j];
            k++;
        }
    }
    chartData.format = 'day';
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();