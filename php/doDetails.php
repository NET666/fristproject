<?php
session_start();
$videoId = $_GET['id'];
$url = 'https://movie.douban.com/j/subject_abstract?subject_id='.$videoId;
$getData = file_get_contents($url);
echo $getData;

?>