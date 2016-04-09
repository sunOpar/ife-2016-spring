function $(id){
	return document.getElementById(id);
}
function showPic(whicpic) {
	var source = whicpic.getAttribute('href')? whicpic.getAttribute('href') : undefined;
	$('placeholder').setAttribute('src',source);
	var title = whicpic.getAttribute('title')? whicpic.getAttribute('title') : undefined;
	$('description').firstChild.nodeValue = title;
}
function addEvent() {
	var img = $('imagelist').getElementsByTagName('a');
	for (var i = 0,j = img.length; i < j; i++) {
		img[i].onclick = function () {
			showPic(this);
			return false;
		}
	}
}
function init(){
	addEvent();
}
init();