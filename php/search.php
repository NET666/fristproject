<?php
include_once 'dbServerConnect.php';
$searchText = $_GET['search'];
$con = new DB();
$link = $con->mySqlServer();
if(!empty($searchText)){
	$sql = "select * from sitedata where title like '%$searchText%'";
	$result = mysqli_query($link,$sql);	
	$res = mysqli_fetch_all($result);
	$arrayList = array(array('rate'=>'','title'=>'','id'=>'','cover'=>''));
	if($res){
		for($i=0;$i<sizeof($res);$i++){
			$arrayList[$i]['rate'] = $res[$i][1];
			$arrayList[$i]['title'] = $res[$i][2];
			$arrayList[$i]['id'] = $res[$i][4];
			$arrayList[$i]['cover'] = $res[$i][5];
		}
		echo json_encode($arrayList);
	}
}

