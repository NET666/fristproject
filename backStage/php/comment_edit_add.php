<?php
session_start();
require_once "../../php/dbServerConnect.php";
$conn = new DB();
$link = $conn->mysqlServer();
$username = $_GET['username'];
$content = $_GET['content'];
$video_id= $_GET['video_id'];
$isEditAdd = $_GET['isEditAdd'];

//判断是否已经登录(预防通过接口方式请求)
if(isset($_SESSION['name'])){
	//判断是否为管理员
	$nicheng = $_SESSION['name'];
	$checkAdmin = $conn->checkAdmin($nicheng);
	if($checkAdmin){
		if($link){
			if($isEditAdd=="添加"){
				//判断数据库是否存在该用户,(用户名存在才能添加)
				$sql = "select username from login where username='$username'";
				$result = mysqli_query($link,$sql);
				$res = mysqli_fetch_row($result);
				if($res){
					$sql = "insert into comment(username,content,rq,video_id) values ('$username','$content',now(),'$video_id')";
					if($result = mysqli_query($link,$sql)){
						echo "true";
					}
					
				}
				if(!$res){
					//用户名不存在
					echo "false";
				}
			}
			else if($isEditAdd=="编辑"){
				$id = $_GET['id'];
				$sql = "update comment set username='$username',content='$content',video_id='$video_id' where id='$id'";
				if($result = mysqli_query($link,$sql)){
					echo "修改成功";
				}
				else{
					echo "修改失败";
				}
				
			}
			
		}
	}
	else{
		echo '跨站越权访问';
	}

}
else{
	echo '跨站非法请求';
}

