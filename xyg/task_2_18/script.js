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
})();


function $(id) {
	return document.getElementById(id);
}

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
	var num = $('text').value;
	var flag = judeg(num);
	if (flag) {
		var fir = document.createElement('li');
		var las = document.createTextNode(num);
		fir.appendChild(las);
		$('show').insertBefore(fir, $('show').firstChild);
	}
}

function rightIn() {
	var num = $('text').value;
	var flag = judeg(num);
	if (flag) {
		var fir = document.createElement('li');
		var las = document.createTextNode(num);
		fir.appendChild(las);
		$('show').appendChild(fir);
	}
}

function leftOut() {
	alert($('show').firstChild.textContent);
	$('show').removeChild($('show').firstElementChild);
}

function rightOut() {
	alert($('show').lastElementChild.textContent);
	$('show').removeChild($('show').lastElementChild);
}