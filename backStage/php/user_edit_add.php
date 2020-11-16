<?php
require_once "../../php/dbServerConnect.php";
$conn = new DB();
$link = $conn->mysqlServer();
$username = $_GET['username'];
$password = $_GET['password'];
$flag = $_GET['flag'];
$isEditAdd = $_GET['isEditAdd'];
$password = md5($password);
if($link){
	if($isEditAdd=="添加"){
		$sql = "select username from login where username='$username'";
		$result = mysqli_query($link,$sql);
		$res = mysqli_fetch_row($result);
		if($res){
			//已经存在
			echo "false";
		}
		if(!$res){
			$sql = "insert into login(username,password,register_time,super_admin) values ('$username','$password',now(),'$flag')";
			if($result = mysqli_query($link,$sql)){
				echo "true";
			}
		}
	}
	else if($isEditAdd=="编辑"){
		$sql = "select username from login where username='$username'";
		$result = mysqli_query($link,$sql);
		$row = mysqli_fetch_row($result);
		if($row){
			echo "已存在";
		}
		if(!$row){
			$id = $_GET['id'];
			$sql = "update login set username='$username',password='$password',super_admin='$flag' where id='$id'";
			if($result = mysqli_query($link,$sql)){
				echo "修改成功";
			}
			else{
				echo "修改失败";
			}
		}
		
	}
	
}