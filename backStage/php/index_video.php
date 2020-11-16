<?php
session_start();
header("content-type:application/json;charset=utf-8");
require_once "../../php/dbServerConnect.php";
$conn = new DB();
$link = $conn->mysqlServer();
$serach_key = $_GET['serach_key'];
$page_start = $_GET['page_start'];
$page_limit = $_GET['page_limit'];
//验证身份
if(isset($_SESSION['name'])){
	$username = $_SESSION['name'];
	$sql = "select * from login where username='$username'";
	$result = mysqli_query($link,$sql);	
	$res = mysqli_fetch_row($result);
	if($res){
		if($res[4]=='1'){
			if($serach_key==''){
				$sql = "select * from sitedata limit $page_start,$page_limit";
				$result = mysqli_query($link,$sql);	
				$res = mysqli_fetch_all($result);
				//$arrayList = array(array('number'=>'','rate'=>'','title'=>'','url'=>'','id'=>'','cover'=>'','types'=>'','tag'=>''));
				if($res){
					for($i=0;$i<sizeof($res);$i++){
						$arrayList[$i]['number'] = $res[$i][0];
						$arrayList[$i]['rate'] = $res[$i][1];
						$arrayList[$i]['title'] = $res[$i][2];
						$arrayList[$i]['url'] = $res[$i][3];
						$arrayList[$i]['id'] = $res[$i][4];
						$arrayList[$i]['cover'] = $res[$i][5];
						$arrayList[$i]['types'] = $res[$i][6];
						$arrayList[$i]['tag'] = $res[$i][7];
					}
					echo json_encode($arrayList);
				}
				
			}
			//搜索
			else{
				$sql = "select * from sitedata where title like '%$serach_key%'";
				$result = mysqli_query($link,$sql);	
				$res = mysqli_fetch_all($result);
				if($res){
					for($i=0;$i<sizeof($res);$i++){
						$arrayList[$i]['number'] = $res[$i][0];
						$arrayList[$i]['rate'] = $res[$i][1];
						$arrayList[$i]['title'] = $res[$i][2];
						$arrayList[$i]['url'] = $res[$i][3];
						$arrayList[$i]['id'] = $res[$i][4];
						$arrayList[$i]['cover'] = $res[$i][5];
						$arrayList[$i]['types'] = $res[$i][6];
						$arrayList[$i]['tag'] = $res[$i][7];
					}
					echo json_encode($arrayList);
				}
			}
			
		}
		else{
			echo "越权访问";
		}
	}
}
else if(!isset($_SESSION['name'])){
	echo "未登录";
}
