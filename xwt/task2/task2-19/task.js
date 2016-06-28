var init_array=[];
var text=document.getElementById('input-text');
function isNum(str){
	if(str!=''){
		if(!(str==+str)){
			alert('请输入数字！');
		}
		else{
			var num=Number(str);
			if(num<100&&num>10){return true;}
			else{alert('请输入1-100的数字')}
		}
	}
	else{
		alert('请输入字符');
	}
};
function render(){
	var i=0,len=init_array.length;
	var container=document.getElementById('container');
	container.innerHTML='';
	var str='';
	for(i;i<len;i++){
		str+="<div style='height:"+init_array[i]*5+"px;margin-top:"+(500-init_array[i]*5)+"px;'>"+init_array[i]+"</div>";
	}
	container.innerHTML=str;
}
function leftIn(){
	if(isNum(text.value)){
		init_array.unshift(+text.value);
		render();
	}
};
function rightIn(){
	if(isNum(text.value)){
		init_array.push(+text.value);
		render();
	}
};
function rightOut(){
	if(isNum(text.value)){
		alert(init_array.pop());
		render();
	}
};
function leftOut(){
	if(isNum(text.value)){
		alert(init_array.shift());
		render();
	}
};

function init(){
	document.getElementById('left-in').addEventListener('click',leftIn,false);
	document.getElementById('right-in').addEventListener('click',rightIn,false);
	document.getElementById('left-out').addEventListener('click',leftOut,false);
	document.getElementById('right-out').addEventListener('click',rightOut,false);
	document.getElementById('sort').addEventListener('click',sortThenRender,false);
}
init();

function quickSort(arr){
	if(arr.length<=1)return arr;
	var key,keyIndex,left=[],right=[];
	var keyNum=Math.floor(arr.length/2);
	key=arr.splice(keyNum,1)[0];
	var i=0,len=arr.length;
	for(i=0;i<len;i++){
		if(arr[i]<key){
			left.push(arr[i]);
		}
		else right.push(arr[i]);
	}
	return quickSort(left).concat([key],quickSort(right));
}


function sortThenRender(){
	init_array=quickSort(init_array);
	render();
}