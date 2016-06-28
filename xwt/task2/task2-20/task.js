var init_array=[];
var text=document.getElementById('input-text');
function splitInput(str){
	if(str!=''){

		return str.trim().split(/[\r\,，、\s\t]/);
	}
	else{
		alert('请输入字符');
		return false;
	}
};
function render(arr){
	var i=0,len=init_array.length;
	var container=document.getElementById('container');
	container.innerHTML='';
	var str='';
	for(i;i<len;i++){
		if(arr){
			if(arr.some(function(k,p,j){
					return  i==k;
			})){
				str+="<div style='color:black;'>"+init_array[i]+"</div>";
			}
			else{
				str+='<div>'+init_array[i]+'</div>';
			}
		}
		else{
			str+='<div>'+init_array[i]+'</div>';
		}
	}
	container.innerHTML=str;
}
function leftIn(){
	var temp=splitInput(text.value);
	var i,len;
	if(temp){
		len=temp.length;
			for(i=0;i<len;i++){
			init_array.unshift(temp[i]);
			render();
		}
	}
};
function rightIn(){
	var temp=splitInput(text.value);
	var i,len;
	if(temp){
		len=temp.length;
		for(i=0;i<len;i++){
			init_array.push(temp[i]);
			render();
		}
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
	document.getElementById('find-btn').addEventListener('click',findItem,false);
}
init();

function forFindItem(){
	var result=[];
	var i,len=init_array.length;
	var want_find_text=document.getElementById('find-text').value;
	var patt1 = new RegExp(want_find_text);
	for(i=0;i<len;i++){
		if(patt1.test(init_array[i])){
			result.push(i);
		}
	}
	return result;

}

function findItem(){
	// console.log([1,2].some(function(k,p,n){
	// 	return k==1;
	// }))
	render(forFindItem());
}

String.prototype.trim=function(){
	return this.replace(/^\s+|\s+$/g,'');
}