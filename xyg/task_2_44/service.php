<?php 
header("Content-Type:application/json;charset=utf-8");
	function loadImg(){
		$act = $_GET['act'];
		if($act){
			$data = [];
			$imgSrc = ["http://placehold.it/500x350/16A085/FFF",
					   "http://placehold.it/350x400/2ECC71/FFF",
					   "http://placehold.it/350x250/27AE60/FFF",
                       "http://placehold.it/250x350/3498DB/FFF",
                       "http://placehold.it/350x150/2980B9/FFF",
                       "http://placehold.it/450x130/9B59B6/FFF",
                       "http://placehold.it/350x120/8E44AD/FFF",
                       "http://placehold.it/450x340/34495E/FFF",
                       "http://placehold.it/350x180/2C3E50/FFF",
                       "http://placehold.it/350x230/F1C40F/FFF",
                       "http://placehold.it/450x260/F39C12/FFF"];
		$data['sucess'] = true;
		$data['imgSrc'] = $imgSrc;
		}
		else{
			$data['sucess'] = false;
		}
		echo json_encode($data);
	}
	if($_SERVER["REQUEST_METHOD"] == "GET"){
		loadImg();
	}

 ?>