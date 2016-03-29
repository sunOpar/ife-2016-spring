var rootNode=document.getElementById('root');
console.log(getRightNode(rootNode));
var timer=null;
var fronBtn=document.getElementById('front-tra');
var inBtn=document.getElementById('in-tra');
var backBtn=document.getElementById('back-tra');
//if(getRightNode(rootNode)) alert('no')
function getLeftNode(parentNode){
	return parentNode.firstElementChild;
}
function getRightNode(parentNode){
	return parentNode.firstElementChild.nextElementSibling;
}
var traverseList=[];
function frontTra(root_node){

	traverseList.push(root_node);
	if(getLeftNode(root_node)){	
		frontTra(getLeftNode(root_node));
		if(getRightNode(root_node)){
			frontTra(getRightNode(root_node));
		}
	}
	
}
function inTra(root_node){
	if(getLeftNode(root_node)){	
		inTra(getLeftNode(root_node));
	}
	traverseList.push(root_node);
	if(getLeftNode(root_node)&&getRightNode(root_node)){
			inTra(getRightNode(root_node));
	}

}
function backTra(root_node){
	if(getLeftNode(root_node)){	
		backTra(getLeftNode(root_node));
		if(getRightNode(root_node)){
			backTra(getRightNode(root_node));
		}
	}
	traverseList.push(root_node);
}


function reset(){
	var divList=document.getElementsByTagName('div');
	var i=0,len=divList.length;
	for(i;i<len;i++){
		divList[i].style.background='#fff';
	}
}


function render(){
	var i=0;
	timer=setInterval(function(){
		reset();
		traverseList[i].style.background='red';
		i++;
		console.log(i)
		console.log(traverseList.length)
		if(i>=traverseList.length){
			clearInterval(timer);
		}
	},500);
}
function init(){
	fronBtn.addEventListener('click',function(){
		traverseList=[];
		reset();
		frontTra(rootNode);
		render();
	},false);
	inBtn.addEventListener('click',function(){
		traverseList=[];
		reset();
		inTra(rootNode);
		render();
	},false);
	backBtn.addEventListener('click',function(){
		traverseList=[];
		reset();
		backTra(rootNode);
		render();
	},false);
}
 init();