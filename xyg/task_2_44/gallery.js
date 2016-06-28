/**
 * 瀑布布局
 * @param {Array}  domImgs       图片DOM的数组
 * @param {node}   wrap           布局的包裹层
 * @param {Number} gap            图片的margin值
 * @param {number} columnNumber   图片的列数
 */
function Gallery(domImgs, wrap, gap, columnNumber) {
	this.domImgs = domImgs;
	this.wrap = wrap;
	this.gap = gap;
	this.columnNumber = columnNumber;
	this.wrapWidth = this.wrap.clientWidth;
	this.childColumnsLength = [];
	this.isInitChildColumns = false;
	this.count = 0;             
	this.isLoadFirstImage = false;
	this.colWidth = Math.floor((this.wrapWidth - (this.columnNumber + 1) * this.gap) / this.columnNumber);
	this.childColumns = this.addChild(this.wrap, this.colWidth);
}
/**
 * 负责渲染图片的css样式，并且将图片循环渲染到页面
 * @param {Number}   imgWidth       要设置的图片宽度
 * @param {Dom}      childColumns    被添加图片的包裹层，子列 
 * @param {Number}   i               为了循环做准备，初始数字为0.
 * @return {[type]}          [description]
 */
Gallery.prototype.renderStyle = function(domImgs) {
		var j = domImgs.length;
		for (var i = 0; i < j; i++) {
			domImgs[i].style.width = this.colWidth + "px;";
			this.addImage(domImgs[i], this.childColumns,this.colWidth);
	}
};
/**
 * 总体负责将图片渲染到页面
 * @return {[type]} [description]
 */
Gallery.prototype.renderImgs = function() {

	this.renderStyle(this.domImgs);
};
/**
 * 为给定包裹层添加子列，将子列的class设为.col,并返回子列
 * @param {Node} 		ancestor       被添加子列的包裹层
 * @param {Number} 		columWidth     子列宽度
 * @return {NodeList}   返回子列
 */
Gallery.prototype.addChild = function(ancestor, columWidth) {
	var childColumns = [];
	for (var i = 0; i < this.columnNumber; i++) {
		childColumns[i] = document.createElement('div');
		childColumns[i].setAttribute('class', 'col');
		childColumns[i].style.width = columWidth + 'px';
		childColumns[i].style.marginRight = this.gap + 'px';
		ancestor.appendChild(childColumns[i]);
	}
	return childColumns;
};


/**
 * 负责将每一个图片加到页面中对应的列里
 * @param {Node} image         被加到页面的img元素
 * @param {Node} childColumns  父包裹层的子列
 */
Gallery.prototype.addImage = function(image, childColumns,imgWidth) {
	var smalleast = this.getSmalleast();
		var _this = this;
		image.onload = function() {
			if(! _this.isLoadFirstImage){
				var prevImage = document.querySelector('img');
				childColumns[0].appendChild(prevImage);
				_this.childColumnsLength[0] = prevImage.clientHeight;
				_this.isLoadFirstImage = true;
				console.log('列宽为'+_this.childColumnsLength[0]);
				_this.addScrollLoad(_this.wrap,_this);
			}
			
			var smalleast = _this.getSmalleast();
			childColumns[smalleast].appendChild(image);
			var height = image.clientHeight;
			_this.childColumnsLength[smalleast] += height;
		};

}
/**
 * 判断最小的列数
 * @return {Number} 返回最小列数的数组下标
 */
Gallery.prototype.getSmalleast = function() {
		var length = this.columnNumber;
		if (!this.isInitChildColumns) {
			this.initChildColumnsLength(length);
			this.isInitChildColumns = true;
		}
		var smalleast = 0;
		for (var i = 1; i < length; i++) {
			if (this.childColumnsLength[i] < this.childColumnsLength[smalleast]) {
				smalleast = i;
			}
		}
		return smalleast;
	}
	/**
	 * 初始化四个列的高度，初始值为0
	 * @param  {Number} length 列数
	 * @return {[type]}        [description]
	 */
Gallery.prototype.initChildColumnsLength = function(length) {
	for (var i = 0; i < length; i++) {
		this.childColumnsLength[i] = 0;
	}
}
Gallery.prototype.addScrollLoad = function(wrap,_this) {
	EventUtil.addHandler(window,'scroll',function(e){
	console.log(document.body.scrollHeight-window.innerHeight==document.body.scrollTop);
	if(document.body.scrollHeight-window.innerHeight==document.body.scrollTop){
		ajaxLoad(wrap,_this);
	}
	});
	function ajaxLoad(wrap,_this){
		var request = new XMLHttpRequest();
		var newImgSrc = '';
		request.open("GET","service.php?act=true");
		request.send();
		request.onreadystatechange=function(){
			console.log(request.readyState);
			console.log(request.status);
			if(request.readyState === 4 && request.status === 200){
				newImgSrc = JSON.parse(request.responseText);
				if(newImgSrc.sucess){
					var imgs = createDomImgs(10,newImgSrc.imgSrc);
					_this.renderStyle(imgs);
				}
			}
		}
	}
	function createDomImgs(num, src) {
	var domImgs = [];
	for (var i = 0; i < num; i++) {
		domImgs[i] = document.createElement('img');
		domImgs[i].src = src[Math.floor(Math.random()*12)];
	}
	return domImgs;
}
};