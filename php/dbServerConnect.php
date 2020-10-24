<?php
class DB{
	function mySqlServer(){
		$link = mysqli_connect('127.0.0.1', 'root', 'root','test');//连接数据库
		mysqli_query($link,'set names utf-8 '); //设置数据库编码字体格式
		if($link){
			return $link;//放回连接
		}
	}
}