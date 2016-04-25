/**
 * 创建图片库的html格式，并保存在数组中
 * num为图片数量
 * @return {Array} img的html格式 “<img src="img/1.jpg">”
 */
function getPhoto(num) {
	var html = [];
	for (var i = 1; i < num; i++) {
		html[i - 1] = "<img src = \'img/" + i + ".jpg\'>";
	}
	return html;
}

function init() {
	var div = document.querySelector('div');
	var select = document.querySelector('select');
	var imgHtml = getPhoto(8);
	var button = document.querySelectorAll('button');
	var gallery = new Gallery(select, div, imgHtml);
	EventUtil.addHandler(select, 'change', selectChange);
	EventUtil.addHandler(button[0], 'click', buttonClick);
	EventUtil.addHandler(button[1], 'click', buttonClick);
	EventUtil.addHandler(button[2], 'click', buttonClick);

	function selectChange() {
		gallery.render(select.value);
	}

	function buttonClick() {
		var dimension = this.value.split('*');
		div.style.height = dimension[0] + 'px';
		div.style.width = dimension[1] + 'px';
		gallery = new Gallery(select, div, imgHtml);
		selectChange();
	}
}
init();