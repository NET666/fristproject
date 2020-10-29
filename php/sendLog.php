<?php
require_once "dbServerConnect.php";
$dataTime = $_GET['dataTime'];
$content = $_GET['content'];
$content = '&nbsp;&nbsp;&nbsp;&nbsp;'.$content;
$conn = new DB();
$link = $conn->mysqlServer();

if($link){
	if($dataTime=='0'){
		$sql = "select title,content from aboutme";
		$result = mysqli_query($link,$sql);
		$res = mysqli_fetch_all($result);
		//转换json的格式,返回给前端
		echo json_encode($res);
	}
	else{
		$sql = "insert into aboutme(title,content,rq) values ('$dataTime','$content',now())";
		$result = mysqli_query($link,$sql);
		if($result){
			echo '成功';
		}
		else{
			echo '失败';
		}
	}
	
}
else{
	echo '连接数据库失败';
}