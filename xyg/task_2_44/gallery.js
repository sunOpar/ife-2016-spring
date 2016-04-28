/**
 * 瀑布布局
 * @param {Array} imgsHtml 图片html格式的数组
 * @param {node} wrap     布局的包裹层
 * @param {Number} gap      图片的margin值
 * @param {number} col      图片的列数
 */
function Gallery(imgsHtml, wrap, gap, col) {
	this.imgsHtml = imgsHtml;
	this.wrap = wrap;
	this.gap = gap;
	this.col = col;
}
/**
 * 负责渲染图片的css样式
 * @param  {[type]} imgs     [description]
 * @param  {[type]} imgWidth [description]
 * @return {[type]}          [description]
 */
Gallery.prototype.renderStyle = function(imgs, imgWidth, childs) {
	var wrapWidth = this.wrap.clientWidth;
	var j = imgs.length;
	for (var i = 0; i < j; i++) {
		imgs[i].style.cssText = "width:" + imgWidth + "px;margin:" + this.gap + "px;";

	}
};
/**
 * 负责将图片渲染到页面
 * @return {[type]} [description]
 */
Gallery.prototype.renderImgs = function() {
	// this.wrap.innerHTML = this.imgsHtml.join('');
	// var imgs = document.querySelectorAll('img');
	var colWidth = Math.floor((wrapWidth - (this.col + 1) * this.gap) / this.col);
	var childs = this.addChild(this.wrap, colWidth);
	this.renderStyle(imgs, colWidth, childs);

};
/**
 * 为给定包裹层添加子列，将子列的class设为.col,并返回子列
 * @param {Node} ancestor 被添加子列的包裹层
 * @param {Number} width  子列宽度
 * @return {NodeList} 返回子列
 */
Gallery.prototype.addChild = function(ancestor, width) {
	var child = null;
	for (var i = 0; i < colLength; i++) {
		child = document.createElement('div');
		child.setAttribute('class', 'col');
		child.style.width = width + 'px';
		ancestor.appendChild(child);
	}
	return child;
};