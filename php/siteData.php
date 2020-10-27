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
for ($i=0;$i<sizeof($arr);$i++)
{
    $rate = $arr[$i]['rate'];
    $title = $arr[$i]['title'];
    $cover = $arr[$i]['cover'];
    $id = $arr[$i]['id'];
    $url = $arr[$i]['url'];

    $sq = "insert into sitedata(rate,title,url,id,cover,types,tag,rq) values ('$rate','$title','$url','$id','$cover','movie','热门',now())";
    mysqli_query($link,$sq);

}
