(function(){
	var init_array=[];
	var tag=[];
	var onmouseoverTempInnerHTML={};
	var text=document.getElementById('input-text');
	function splitInput(str){
		if(str!=''){

			return str.trim().split(/[\r\,，、\s\t]+/);
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
	function render2(){
		var i=0,len=tag.length;
		var container=document.getElementById('container2');
		container.innerHTML='';
		var str='';
		var width;
		for(i;i<len;i++){
					width=40+tag[i].length*20;
					str+="<div style='width:"+width+"px;'>"+tag[i]+"</div>";
		}
		container.innerHTML=str;
	}
	function pushIn(){
		var temp=splitInput(text.value);
		var i,len;
		if(temp){
			len=temp.length;
				for(i=0;i<len;i++){
					if(init_array.indexOf(temp[i])==-1){
						init_array.push(temp[i]);
						render();
					}
			}
		}
	};
	function container2ContentOver(ev){
		var e=ev||event;
		var target=e.target||e.srcElement;
		var width;
		onmouseoverTempInnerHTML.name=target.innerHTML
		if(target.nodeName=='DIV'&&target.id!='container2'){
			target.innerHTML='点击删除';
			onmouseoverTempInnerHTML.width=+getComputedStyle(target, false)['width'].slice(0,length-2);
			console.log(width)
			target.style.width=50+onmouseoverTempInnerHTML.width+'px';
		}
	};
	function container2ContentOut(ev){
		var e=ev||event;
		var target=e.target||e.srcElement;	
		if(target.nodeName=='DIV'&&target.id!='container2'){
			target.innerHTML=onmouseoverTempInnerHTML.name;
			target.style.width=onmouseoverTempInnerHTML.width+'px';
		}
	};
	function container2ContentClickDelete(ev){
		var e=ev||event;
		var target=e.target||e.srcElement;	
		if(target.nodeName=='DIV'&&target.id!='container2'){
			tag.splice(tag.indexOf(onmouseoverTempInnerHTML),1);
			render2();
		}
	};
	function tagInput(){
		//console.log(document.getElementById('tag').value);
		var str=document.getElementById('tag').value;
		var content='';
		var patt1 = new RegExp(/[\r\,，、\s\t]+/);
		var patt2 = new RegExp(/[\r\,，、\t]+/);
		// if(str[0]==' '){
		// 	if(patt2.test(str)){
		// 			content=str.slice(0,str.length-1).trim();
		// 			if(content!=''){
		// 				if(tag.indexOf(content)==-1){
		// 					tag.push(content);
		// 					render2();
		// 					console.log(content);	
		// 				}
						
		// 			}
		// 			document.getElementById('tag').value='';
		// 	}
		// }
		// else{
		// console.log(patt1.test(str))
		// //console.log(str.match(patt1).index)
			if(patt1.test(str)){
				if(str.length-1>0){
					content=str.slice(0,str.length-1).trim();
					if(content!=''){
						if(tag.indexOf(content)==-1){
							tag.push(content);
							render2();
							console.log(content);	
						}	
					}
				}
				document.getElementById('tag').value='';
			}
		// }

		
		//console.log(str);

	}
	function init(){
		document.getElementById('push-in').addEventListener('click',pushIn,false);
		document.getElementById('container2').addEventListener('mouseover',container2ContentOver,false);
		document.getElementById('container2').addEventListener('mouseout',container2ContentOut,false);
		document.getElementById('container2').addEventListener('click',container2ContentClickDelete,false);
		document.getElementById('tag').addEventListener('input',tagInput,false);
		
	}
	init();


	//tool function
	String.prototype.trim=function(){
		return this.replace(/^\s+|\s+$/g,'');
	}
})();

