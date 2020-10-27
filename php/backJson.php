<?php

//告诉浏览器 返回的是json格式的数据 编码格式为utf-8
session_start();
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


/*//转换成数组
$arrayLists = json_decode($jsonString,true);

$con = new DB();
$link = $con->mySqlServer();
$arrs = $arrayLists;
$arr = $arrs['subjects'];
$id = $arr[0]['id'];
$sql = "select id from sitedata where id='$id'";
$result = mysqli_query($link,$sql);
if($result==false){
    for ($i=0;$i<sizeof($arr);$i++)
    {
        $rate = $arr[$i]['rate'];
        $title = $arr[$i]['title'];
        $cover = $arr[$i]['cover'];
        $id = $arr[$i]['id'];
        $url = $arr[$i]['url'];

        $sql = "insert into sitedata(rate,title,url,id,cover,types,tag,rq) values ('$rate','$title','$url','$id','$cover','$type','$tag',now())";
        $res = mysqli_query($link,$sql);

    }
}*/






