<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/10/25
 * Time: 20:15
 */
// 指定页面编码
header('Content-type: text/html; charset=utf-8');
require_once "dbServerConnect.php";
$name = $_GET['user'];
$password = $_GET['password'];
 $password = md5($password);//md5加密
 
$conn = new DB();
$link = $conn->mysqlServer();

if($link){
	 
	  //验证用户名是否已经被注册
	  $sql = "select * from login where username='$name'";
	  $res = $conn->checkUser($link, $sql);
	  if($res){
		  echo 'false'; //用户名已经存在,返回false
	  }else{
		  //注册
		  $sql = "insert into login(username,password,register_time) values ('$name','$password',now())";
		  $res = $conn->dataInsert($link, $sql);
		  if($res){
			  echo 'true';//注册成功返回true
		  }else{
			  echo 'erro';// 前端收到的是erro
		  }
	  }
}

