<?php
header("content-type:application/json;charset=utf-8");
include_once 'dbServerConnect.php';
$videId = $_GET['id'];
$limit_start = $_GET['limit_start'];
$con = new DB();
$link = $con->mysqlServer();
$arrayLent = 0;
if($link){
	$sql = "select * from comment where video_id='$videId'";
	$result = mysqli_query($link,$sql);
	//将查询的结果集封装到一个数组里
	$res = mysqli_fetch_all($result);
	$arrayLent = sizeof($res);//获取评论数组长度
	//一开始取出所以评论
	if($limit_start == 0){
		if($res){
			//转换json的格式,返回给前端
			echo json_encode($res);
		}else{
			echo '当前视频暂无评论';
		}
	}
	else{
		//新增评论后没错读取一条数据返回给前端
		$getData = $arrayLent - 1;
		$sql = "select * from comment where video_id='$videId' limit $getData, $arrayLent"; 
		$result = mysqli_query($link,$sql);
		//将查询的结果集封装到一个数组里
		$res = mysqli_fetch_all($result);
		if($res){
			//转换json的格式,返回给前端
			echo json_encode($res);
		}
	}
	
}
