(function() {
	var EventUtil = {
		addHandler: function(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachHandler) {
				element.attachHandler('on' + type, handler);
			} else {
				element['on' + type] = handler;
			}
		},
		removeHandler: function(element, type, handler) {
			if (element.removeEventLinstener) {
				element.removeEventLinstener(type, handler, false);
			} else if (element.detachHandler) {
				element.detachHandler('on' + type, handler);
			} else {
				element['on' + type] = null;
			}
		}
	};

	var btn = document.querySelectorAll('button');
	EventUtil.addHandler(btn[0], 'click', leftIn);
	EventUtil.addHandler(btn[1], 'click', rightIn);
	EventUtil.addHandler(btn[2], 'click', leftOut);
	EventUtil.addHandler(btn[3], 'click', rightOut);
	EventUtil.addHandler(btn[4], 'click', renderRollNumber);
	EventUtil.addHandler(btn[5], 'click', renderSort);
})();


function $(id) {
	return document.querySelector(id);
}
/**
 * 随机制作五十个数
 * @return {[type]} [description]
 */

function rollNumber() {
	var num = [];
	var temp = -Infinity;
	for (var i = 0; i < 50; i++) {
		temp = Math.round(Math.random() * 700);
		while (temp < 120) {
			temp = Math.round(Math.random() * 700);
		}
		num[i] = temp;
	}
	return num;
}

function renderRollNumber() {
	var num = rollNumber();
	var len = num.length,
		html = '';
	for (var i = 0; i < len; i++) {
		html += '<li style=\"height:' + num[i] + 'px\;\"></li>';
	}
	$('#show').innerHTML = html;
}
/**
 * 判断输入的数是否为数字
 * @param  {[type]} argument input中的value
 * @return {[type]}          返回true或者false
 */
function judeg(argument) {
	var prompt = document.getElementById('prompt');
	var flag = true;
	var patt = /^[0-9]+$/;
	if (!patt.test(argument)) {
		prompt.textContent = '请输入【一个】数字';
		flag = false;
	}
	return flag;
}

function leftIn() {
	var num = $('#text').value;
	var manipula = num * 5;
	var flag = judeg(num);
	if (flag) {
		var fir = document.createElement('li');
		fir.style.cssText += 'height:' + manipula + 'px;';
		$('#show').insertBefore(fir, $('#show').firstChild);
	}
}

function rightIn() {
	var num = $('#text').value;
	var manipula = num * 5;
	var flag = judeg(num);
	if (flag) {
		var fir = document.createElement('li');
		fir.style.cssText += 'height:' + manipula + 'px;';
		$('#show').appendChild(fir);
	}
}

function leftOut() {
	alert($('#show').firstChild.textContent);
	$('show').removeChild($('show').firstElementChild);
}

function rightOut() {
	alert($('show').lastElementChild.textContent);
	$('show').removeChild($('show').lastElementChild);
}
/**
 * 执行动画
 * @param  {html元素} ele   要动画的html元素
 * @param  {字符串} util  要改变的元素属性
 * @param  {[type]} start 起始值
 * @param  {[type]} to    结束值
 * @return {[type]}       [description]
 */
// function animate1(ele, start, to) {
// 	var len = parseInt(ele.style.height);
// 	if (len === to) {
// 		// element[j].style.backgroundColor = 'red';
// 		// element[j + 1].style.backgroundColor = 'red';
// 		return;
// 	} else if (start < to) {
// 		ele.style.height = ++len + 'px';
// 	} else {
// 		ele.style.height = --len + 'px';
// 	}
// }

// function animate2(ele, start, to) {
// 	var len = parseInt(ele.style.height);
// 	if (len === to) {
// 		// element[j].style.backgroundColor = 'red';
// 		// element[j + 1].style.backgroundColor = 'red';
// 		cleanInterval(animation);
// 	} else if (start < to) {
// 		ele.style.height = ++len + 'px';
// 	} else {
// 		ele.style.height = --len + 'px';
// 	}
// }

// function handlerAnimate(ele1, ele2, start, end) {
// 	(function() {
// 		var animation = setInterval(function() {
// 			animate1(ele1, start, end);
// 			animate2(ele2, end, start);
// 		}, 10);
// 	})();
// }

// for (var i = 1; i < len; i++) {
// 	for (var j = 0; j < len - i; j++) {
// 		if (arr[j] > arr[j + 1]) {
// 			temp = arr[j];
// 			arr[j] = arr[j + 1];
// 			arr[j + 1] = temp;
// 			element[j].style.height = arr[j] + 'px';
// 			element[j + 1].style.height = arr[j + 1] + 'px';
// 		} else {

// 		}
// 	}
// }
function sortNumber(arr, element) {
	var len = arr.length,
		temp = -Infinity,
		j = 0,
		i = 1;
	setInterval(animate, 20);

	function animate() {

		if (i < len) {
			if (j < len - i) {
				if (arr[j] > arr[j + 1]) {
					temp = arr[j];
					arr[j] = arr[j + 1];
					arr[j + 1] = temp;

					element[j].style.height = arr[j] + 'px';
					element[j + 1].style.height = arr[j + 1] + 'px';
					j++;
				} else {
					j++;
				}
			} else {
				i++;
				j = 0;
			}
		} else return;

	}
	// return arr;
}

function renderSort() {

	var Li = document.querySelectorAll('li'),
		liLen = Li.length,
		storeLi = [];
	for (var i = 0; i < liLen; i++) {
		storeLi[i] = parseInt(Li[i].style.height);
	}
	sortNumber(storeLi, Li);
}