<?php

//告诉浏览器 返回的是json格式的数据 编码格式为utf-8（可写可不写）
header("content-type:application/json;charset=utf-8");
$type = $_GET['type'];
$tag = $_GET['tag'];
$page_limit = $_GET['page_limit'];
$page_start = $_GET['page_start'];
$url = 'https://movie.douban.com/j/search_subjects?type='.$type.'&tag='.$tag.'&page_limit='.$page_limit.'&page_start='.$page_start;
//读取start.json文
$jsonString = file_get_contents($url);
echo $jsonString;
//转换成数组
//$arr = json_decode($jsonString,true);

?>