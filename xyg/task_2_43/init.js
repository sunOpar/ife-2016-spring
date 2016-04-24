/**
 * 创建图片库的html格式，并保存在数组中
 * @return {Array} img的html格式 “<img src="img/1.jpg">”
 */
function getPhoto() {
	var html = [];
	for (var i = 1; i < 8; i++) {
		html[i - 1] = "<img src = \'img/" + i + ".jpg\'>";
	}
	return html;
}

function init() {
	var div = document.querySelector('div');
	var select = document.querySelector('select');
	var imgHtml = getPhoto();
	var gallery = new Gallery(select, div,imgHtml);
	EventUtil.addHandler(select, 'change', selectChange);

	function selectChange() {
		console.log(this);
		gallery.render(this.value);
	}
}
init();