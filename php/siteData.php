<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/10/26
 * Time: 15:39
 */

session_start();
require_once 'dbServerConnect.php';
$con = new DB();
$link = $con->mySqlServer();
$arrs = $_SESSION['arrayLists'];
$arr = $arrs['subjects'];

//var_dump($arr);




for ($i=0;$i<sizeof($arr);$i++)
{
 $id = $arr[$i]['id'];
 $sql = "select id from sitedata where id='$id'";
 $res = mysqli_query($link,$sql);
 $result = mysqli_fetch_row($res);
 if(!$result){
	 $rate = $arr[$i]['rate'];
	 $title = $arr[$i]['title'];
	 $cover = $arr[$i]['cover'];
	 $id = $arr[$i]['id'];
	 $url = $arr[$i]['url'];
	 
	 $sql = "insert into sitedata(rate,title,url,id,cover,types,tag) values ('$rate','$title','$url','$id','$cover','movie','热门')";
	 mysqli_query($link,$sql);
 }

}
mysqli_close($link);


 


