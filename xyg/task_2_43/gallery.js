/**
 * 图片库
 * @type {Object}
 */
function Gallery(select, wrap, imgHtml) {
	this.select = select;
	this.wrap = wrap;
	this.imgHtml = imgHtml;
	this.height = this.wrap.clientHeight;
	this.width = this.wrap.clientWidth;
}
/**
 * 渲染网页
 * 
 */
Gallery.prototype.render = function(currentSelect) {
	// var currentSelect = getCurrentSelect(select);
	var img = null;
	var oldStyle = "";
	switch (currentSelect) {
		case 'one picture':
			this.addPicture(1);
			img = document.querySelector('img');
			img.setAttribute('width', this.width);
			img.setAttribute('height', this.height);
			break;
		case 'two pictures':
			this.addPicture(2);
			img = document.querySelectorAll('img');
			img[0].style.cssText = "width:" + this.width + "px;height:" + this.height + "px;";
			img[1].setAttribute('class', 'two-right');
			oldStyle = img[1].style;
			img[1].style.cssText = "width:" + this.width + "px;height:" + this.height + "px;" + oldStyle;
			break;
		case 'three pictures':
			this.addPicture(3);
			img = document.querySelectorAll('img');
			img[0].style.cssText = "width:" + this.width * 0.63 + "px;height:" + this.height + "px;";
			img[1].style.cssText = "width:" + this.width * 0.37 + "px;height:" + this.height * 0.5 + "px;";
			img[2].setAttribute('class', 'three-top');
			oldStyle = img[2].style;
			img[2].style.cssText = "width:" + this.width * 0.37 + "px;height:" + this.height * 0.5 + "px;" + oldStyle;
			break;
		case 'four pictures':
			this.addPicture(4);
			img = document.querySelectorAll('img');
			for (i = 0; i < 4; i++) {
				img[i].style.cssText = "width:" + this.width * 0.5 + "px;height:" + this.height * 0.5 + "px;";
			}
			break;
		case 'five pictures':
			this.addPicture(5);
			img = document.querySelectorAll('img');
			img[0].style.cssText = "width:" + this.width * 0.667 + "px;height:" + this.height * 0.667 + "px;";
			img[1].style.cssText = "width:" + this.width * 0.333 + "px;height:" + this.width * 0.333 + "px;vertical-align:top;";
			img[2].style.cssText = "width:" + this.width * 0.333 + "px;height:" + this.height * 0.333 + "px;";
			img[3].style.cssText = "width:" + this.width * 0.333 + "px;height:" + this.height * 0.333 + "px;";
			img[4].setAttribute('class', 'five-rectangle');
			oldStyle = img[4].style;
			img[4].style.cssText = "width:" + this.width * 0.333 + "px;height:" + (this.height - this.width * 0.33) + "px;margin-top:" + -(this.height * 0.667 - this.width * 0.33) + "px;";

	// img[1].setAttribute('class', 'five-square');
	// img[2].setAttribute('class', 'five-small');
	// img[3].setAttribute('class', 'five-small');
	break;
	case 'six pictures':
		this.addPicture(6);
		img = document.querySelectorAll('img');
		img[0].style.cssText = "width:" + this.width * 0.667 + "px;height:" + this.height * 0.667 + "px;";
		img[1].style.cssText = "width:" + this.width * 0.333 + "px;height:" + this.height * 0.333 + "px;";
		img[2].style.cssText = "width:" + this.width * 0.333 + "px;height:" + this.height * 0.333 + "px;";
		img[3].style.cssText = "width:" + this.width * 0.333 + "px;height:" + this.height * 0.333 + "px;";
		img[4].style.cssText = "width:" + this.width * 0.333 + "px;height:" + this.height * 0.333 + "px;";
		img[5].setAttribute('class', 'six-last');
		oldStyle = img[5].style;
		img[5].style.cssText = "width:" + this.width * 0.333 + "px;height:" + this.height * 0.333 + "px;" +
			oldStyle;
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
		numbers[i] = Math.floor(Math.random() * 7);
		html += this.imgHtml[numbers[i]];
	}
	/**
	 * 要存放图片的父元素
	 * @type {[type]}
	 */
	this.wrap.innerHTML = html;
};