<?php
require_once "../../php/dbServerConnect.php";
$conn = new DB();
$link = $conn->mysqlServer();
$id = $_GET['id'];
if($link){
	$sql = "delete from comment where id='$id'";
	if($result = mysqli_query($link,$sql)){
		echo "true";
	}else{
		echo "false";
	}
}