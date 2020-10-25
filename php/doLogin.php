<?php
session_start();
require_once "dbServerConnect.php";
$name = $_GET['user'];
$password = $_GET['password'];
$password = md5($password);//md5加密
$conn = new DB();
$link = $conn->mysqlServer();

$sql = "select * from login where username='$name' and password='$password'";
$res = $conn->login($link, $sql);
if ($res==true) {
    $_SESSION['name'] = $name;//把用户名保存到SESSION的userName中,用于其他页面调用
	echo '1';//返回1
} 
else{
  echo '0'; //返回0
}