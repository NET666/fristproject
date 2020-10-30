<?php

//告诉浏览器 返回的是json格式的数据 编码格式为utf-8
header("content-type:application/json;charset=utf-8");
include_once 'dbServerConnect.php';
$type = $_GET['type'];
$tag = $_GET['tag'];
$page_limit = $_GET['page_limit'];
$page_start = $_GET['page_start'];
$url = 'https://movie.douban.com/j/search_subjects?type='.$type.'&tag='.$tag.'&page_limit='.$page_limit.'&page_start='.$page_start;
//读取start.json文
$jsonString = file_get_contents($url);
echo $jsonString;//打印返回给前端

//转换成数组
$arrayLists = json_decode($jsonString,true);
$con = new DB();
$link = $con->mySqlServer();
$arr = $arrayLists['subjects'];

//把数据保存到数据库
for ($i=0;$i<sizeof($arr);$i++)
{
	$id = $arr[$i]['id'];
	$sql = "select id from sitedata where id='$id'";//先查询是否存在,不存在则插入
	$res = mysqli_query($link,$sql);
	$result = mysqli_fetch_row($res);
	if(!$result){
		$rate = $arr[$i]['rate'];
		$title = $arr[$i]['title'];
		$cover = $arr[$i]['cover'];
		$id = $arr[$i]['id'];
		$url = $arr[$i]['url'];
		$sql = "insert into sitedata(rate,title,url,id,cover,types,tag) values ('$rate','$title','$url','$id','$cover','$type','$tag')";
		mysqli_query($link,$sql);
	}
	
}

mysqli_close($link);//关闭数据库连接







