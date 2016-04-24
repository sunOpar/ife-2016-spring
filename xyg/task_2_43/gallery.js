/**
 * 图片库
 * @type {Object}
 */
function Gallery(select, wrap,imgHtml) {
	this.select = select;
	this.wrap = wrap;
	this.imgHtml = imgHtml;
}
/**
 * 渲染网页
 * 
 */
Gallery.prototype.render = function(currentSelect) {
	// var currentSelect = getCurrentSelect(select);
	var img = null;
	switch (currentSelect) {
		case 'one picture':
			this.addPicture(1);
			img = document.querySelector('img');
			img.setAttribute('class', 'one');
			break;
		case 'two pictures':
			this.addPicture(2);
			img = document.querySelectorAll('img');
			img[0].setAttribute('class', 'two-left');
			img[1].setAttribute('class', 'two-right');
			break;
		case 'three pictures':
			this.addPicture(3);
			img = document.querySelectorAll('img');
			img[0].setAttribute('class', 'three-main');
			img[1].setAttribute('class', 'three-bottom');
			img[2].setAttribute('class', 'three-top');
			break;
		case 'four pictures':
			this.addPicture(4);
			img = document.querySelectorAll('img');
			for (i = 0; i < 4; i++) {
				img[i].setAttribute('class', 'four');
			}
			break;
		case 'five pictures':
			this.addPicture(5);
			img = document.querySelectorAll('img');
			img[0].setAttribute('class', 'five-main');
			img[1].setAttribute('class', 'five-square');
			img[2].setAttribute('class', 'five-small');
			img[3].setAttribute('class', 'five-small');
			img[4].setAttribute('class', 'five-rectangle');
			break;
		case 'six pictures':
			this.addPicture(6);
			img = document.querySelectorAll('img');
			img[0].setAttribute('class', 'six-main');
			img[1].setAttribute('class', 'six-small');
			img[2].setAttribute('class', 'six-small');
			img[3].setAttribute('class', 'six-small');
			img[4].setAttribute('class', 'six-small');
			img[5].setAttribute('class', 'six-small six-last');
			break;
	}
};

/**
 * 给目标元素添加图片
 * @param {[type]} num [description]
 */
Gallery.prototype.addPicture = function(num) {
	var numbers = [];
	var html = '';
	for (i = 0; i < num; i++) {
		numbers[i] = Math.round(Math.random() * 6);
		html += this.imgHtml[numbers[i]];
	}
	/**
	 * 要存放图片的父元素
	 * @type {[type]}
	 */
	this.wrap.innerHTML = html;
};