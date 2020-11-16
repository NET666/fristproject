<?php
require_once "../../php/dbServerConnect.php";
$conn = new DB();
$link = $conn->mysqlServer();
$title = $_GET['title'];
if($link){
	$sql = "delete from login where username='$title'";
	if($result = mysqli_query($link,$sql)){
		echo "true";
	}else{
		echo "false";
	}
}