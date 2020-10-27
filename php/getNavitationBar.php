<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/10/21
 * Time: 20:24
 */

header("content-type:application/json;charset=utf-8");
include_once '../phpQuery/phpQuery/phpQuery.php';
phpQuery::newDocumentFile('https://movie.douban.com/');

$images = pq(".poster img"); //爬取.poster类名中的所有img标签（用于下面获取图片地址和影视名称）
$getRate = pq(".rating .subject-rate");//爬取.rating类名里的所有 .subject-rate命名的标签
$getImages =  array(array('image'=>'','title'=>'','rate'=>''));
$i = 0;
foreach ($images as $img){
	$getImages[$i]['image'] = pq($img)->attr("src"); //获取对应标签里面的src属性值
	$getImages[$i]['title'] = pq($img)->attr("alt");//获取对应标签里面的alt属性值
    $i++;
}
$k = 0;
foreach($getRate as $Rate){
	$getImages[$k]['rate'] = pq($Rate)->text();
	$k++;
}
//转换json的格式
echo json_encode($getImages);
