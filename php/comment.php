<?php
session_start();
header("content-type:application/json;charset=utf-8");
include_once 'dbServerConnect.php';
$content = $_GET["content"];
$videoId = $_GET["id"];
$name = $_SESSION['name'];
$con = new DB();
$link = $con->mysqlServer();
if($link){
	$sql = "insert into comment(username,content,rq,video_id) values ('$name','$content',now(),'$videoId')";
	$result = mysqli_query($link,$sql);
	if($result){
		echo '发布成功';
	}else{
		echo '发布失败'; 
	}
}



