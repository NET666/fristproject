<?php
session_start();
require_once "../../php/dbServerConnect.php";
$conn = new DB();
$link = $conn->mysqlServer();
$title = $_GET['title'];

//判断是否已经登录(预防通过接口方式请求)
if(isset($_SESSION['name'])){
	//判断是否为管理员
	$nicheng = $_SESSION['name'];
	$checkAdmin = $conn->checkAdmin($nicheng);
	if($checkAdmin){
		if($link){
			$sql = "delete from login where username='$title'";
			if($result = mysqli_query($link,$sql)){
				echo "true";
			}else{
				echo "false";
			}
		}
	}
	else{
		echo '跨站越权访问';
	}
	
}
else{
	echo '非法请求';
}
