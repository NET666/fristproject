<?php
header("content-type:application/json;charset=utf-8");
include_once 'dbServerConnect.php';
$content = $_GET["content"];
$videoId = $_GET["id"];
$con = new DB();
$link = $con->mysqlServer();
if($link){
	$sql = "insert into comment(username,content,rq,video_id) values ('陈绪运','$content',now(),'$videoId')";
	$result = mysqli_query($link,$sql);
	if($result){
		echo '发布成功';
	}else{
		echo '发布失败'; 
	}
}



