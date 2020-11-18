<?php
session_start();
require_once "../../php/dbServerConnect.php";
$conn = new DB();
$link = $conn->mysqlServer();
$rate = $_GET['rate'];
$title = $_GET['title'];
$url = $_GET['url'];
$id = $_GET['id'];
$cover = $_GET['cover'];
$types = $_GET['types'];
$tag = $_GET['tag'];
$isEditAdd = $_GET['isEditAdd'];

//判断是否已经登录(预防通过接口方式请求)
if(isset($_SESSION['name'])){
	//判断是否为管理员
	$nicheng = $_SESSION['name'];
	$checkAdmin = $conn->checkAdmin($nicheng);
	if($checkAdmin){
		if($link){
			if($isEditAdd=="添加"){
				$sql = "select title,id from sitedata where title='$title' or id='$id'";
				$result = mysqli_query($link,$sql);
				$res = mysqli_fetch_row($result);
				if($res){
					//已经存在
					echo "false";
				}
				if(!$res){
					$sql = "insert into sitedata(rate,title,url,id,cover,types,tag) values ('$rate','$title','$url','$id','$cover','$types','$tag')";
					if($result = mysqli_query($link,$sql)){
						echo "true";
					}
				}
			}
			else if($isEditAdd=="编辑"){
				$numberId = $_GET['numberId'];
				$sql = "update sitedata set rate='$rate',title='$title',url='$url',id='$id',cover='$cover',types='$types',tag='$tag' where number='$numberId'";
				if($result = mysqli_query($link,$sql)){
					echo "修改成功";
				}
				else{
					echo "修改失败";
				}
				
				/* $sql = "select title,id from sitedata where title='$title' or id='$id'";
				$result = mysqli_query($link,$sql);
				$res = mysqli_fetch_row($result);
				if($res){
					//已经存在
					echo "failed";
				}
				if(!$res){
					$numberId = $_GET['numberId'];
					$sql = "update sitedata set rate='$rate',title='$title',url='$url',id='$id',cover='$cover',types='$types',tag='$tag' where number='$numberId'";
					if($result = mysqli_query($link,$sql)){
						echo "修改成功";
					}
					else{
						echo "修改失败";
					}
				} */
			
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
