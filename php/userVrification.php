<?php
session_start();
//验证用户是否存在(用于识别用户是否已登录)
if(isset($_SESSION['name'])){
	echo  $_SESSION['name'];//用户名存在，说明已经登录过了,返回用户名称
}else{
	echo 'false';//未登录返回false
}