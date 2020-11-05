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
		//chooseMovie.php视频信息插入事件
		function movieInsert($getData,$type,$tag,$con)
		{
			$link = $con->mySqlServer();
			$arr = json_decode($getData,true);
			$arr = $arr['data'];
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
					$sql = "insert  into sitedata(rate,title,url,id,cover,types,tag) values ('$rate','$title','$url','$id','$cover','$type','$tag')";
					mysqli_query($link,$sql);
				}
				
				
			}
			
			mysqli_close($link);//关闭数据库连接
		}

}