var init_array=[];
var text=document.getElementById('input-text');
function isNum(str){
	if(str!=''){
		if(str==+str){
			return true;
		}
		else{
			alert('请输入数字！');
			return false;
		}
	}
	else{
		alert('请输入字符');
		return false;
	}
};
function render(){
	var i=0,len=init_array.length;
	var container=document.getElementById('container');
	container.innerHTML='';
	var str='';
	for(i;i<len;i++){
		str+='<div>'+init_array[i]+'</div>';	
	}
	container.innerHTML=str;
}
function leftIn(){
	if(isNum(text.value)){
			init_array.unshift(text.value);
			render();
		}
};
function rightIn(){
	if(isNum(text.value)){
			init_array.push(text.value);
			render();
		}
};
function rightOut(){
		alert(init_array.pop());
		render();
};
function leftOut(){
 		alert(init_array.shift());
		render();
};

function init(){
	document.getElementById('left-in').addEventListener('click',leftIn,false);
	document.getElementById('right-in').addEventListener('click',rightIn,false);
	document.getElementById('left-out').addEventListener('click',leftOut,false);
	document.getElementById('right-out').addEventListener('click',rightOut,false);
}
init();

