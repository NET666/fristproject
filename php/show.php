<?php
header("content-type:application/json;charset=utf-8");
include_once 'dbServerConnect.php';
$videId = $_GET['id'];
$con = new DB();
$link = $con->mysqlServer();
if($link){
	$sql = "select * from comment where video_id='$videId'";
	$result = mysqli_query($link,$sql);
	//将查询的结果集封装到一个数组里
	$res = mysqli_fetch_all($result);
	if($res){
		//转换json的格式,返回给前端
		echo json_encode($res);
	}else{
		echo '当前视频暂无评论';
	}
}
