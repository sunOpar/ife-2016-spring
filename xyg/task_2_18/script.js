function $(id){
	return document.getElementById(id);
}
function leftIn() {
	var num = $('text').value;
	var fir = document.createElement('li');
	var las = document.createTextNode(num);
	fir.appendChild(las);
	$('show').insertBefore(fir,$('show').firstChild);
}
function rightIn(){
 	var num = $('text').value;
 	var fir = document.createElement('li');
 	var las = document.createTextNode(num);
 	fir.appendChild(las);
 	$('show').appendChild(fir);
 }
 function leftOut(){
 	alert($('show').firstChild.textContent);
 	$('show').removeChild($('show').firstChild);
 }
 function rightOut(){
 	$('show').removeChild($('show').lastElementChild);
 }