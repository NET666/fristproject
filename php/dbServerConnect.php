<?php
class DB{
	function mySqlServer(){
		$link = mysqli_connect('127.0.0.1', 'root', 'root','test');//连接数据库
		mysqli_query($link,'set names utf-8 '); //设置数据库编码字体格式
		if($link){
			return $link;//放回连接
		}
	}
	function login($link, $sql)
		{
			$result = mysqli_query($link, $sql) or die('出错啦！' . mysqli_error($link));
			$row = mysqli_fetch_row($result);
			if ($row) {
				return true;
			} else {
				return false;
			}
		}
		//检查昵称是否存在
		function checkUser($link, $sql)
		{
			$result = mysqli_query($link, $sql) or die('出错啦！' . mysqli_error($link));
			$row = mysqli_fetch_row($result);
			if ($row) {
				return true;
			} else {
				return false;
			}
		}

		//添加数据(发帖)
		function addData($link,$sql)
		{
			if (mysqli_query($link, $sql) or die('出错啦！' . mysqli_error($link))){
				return true;
			}else{
				return false;
			}

		}
		//账号注册
		function dataInsert($link, $sql)
		{
			if (mysqli_query($link, $sql) or die('出错啦！' . mysqli_error($link))){
				return true;
			}else{
				return false;
			}
		}

}