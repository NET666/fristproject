<?Php
//header('Content-Type: text/html; charset=UTF-8');
header("content-type:application/json;charset=utf-8");
include_once '../phpQuery/phpQuery/phpQuery.php';
$start = $_GET['start'];
$id = $_GET['id'];
//爬取豆瓣网评论
if($start=='0'){
	$arrayList = array(array('userName'=>'','commentTime'=>'','commentContent'=>''));
	$url = 'https://movie.douban.com/subject/'.$id.'/comments?limit=20&status=P&sort=new_score';
	//$url = file_get_contents($url);
	phpQuery::newDocumentFile($url);
	$userNames = pq(".comment-info a");
	$commentTimes = pq(".comment-time");
	$commentContents = pq(".short");
	$i = 0;
	foreach($userNames as $userName){
		$arrayList[$i]['userName'] = pq($userName)->text();
		$i++;
	}
	$j = 0;
	foreach($commentTimes as $commentTime){
		$arrayList[$j]['commentTime'] = pq($commentTime)->attr('title');
		$j++;
	}
	$l = 0;
	foreach($commentContents as $commentContent){
		$arrayList[$l]['commentContent'] = pq($commentContent)->text();
		$l++;
	}
	
	//转换json的格式
	echo json_encode($arrayList);
}
else{

	$arrayList = array(array('userName'=>'','commentTime'=>'','commentContent'=>''));
	$url = 'https://movie.douban.com/subject/'.$id.'/comments?start='.$start.'&limit=20&status=P&sort=new_score';
	//$url = file_get_contents($url);
	phpQuery::newDocumentFile($url);
	$userNames = pq(".comment-info a");
	$commentTimes = pq(".comment-time");
	$commentContents = pq(".short");
	$i = 0;
	foreach($userNames as $userName){
		$arrayList[$i]['userName'] = pq($userName)->text();
		$i++;
	}
	$j = 0;
	foreach($commentTimes as $commentTime){
		$arrayList[$j]['commentTime'] = pq($commentTime)->attr('title');
		$j++;
	}
	$l = 0;
	foreach($commentContents as $commentContent){
		$arrayList[$l]['commentContent'] = pq($commentContent)->text();
		$l++;
	}
	
	//转换json的格式
	echo json_encode($arrayList);
}	

?>