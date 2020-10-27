<?php
// tags: this.tagsName,
// start: this.start,
// genres: this.genresName,
// countries: this.countriesName,
// year_range: this.year_rangeName
$tags = $_GET['tags'];
$start = $_GET['start'];
$genres = $_GET['genres'];
$countries = $_GET['countries'];
$year_range = $_GET['year_range'];
//默认状态
if($tags=='全部类型'&&$genres=='全部类型'&&$countries=='全部类型'&&$year_range=='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=&start='.$start;
	$getData = file_get_contents($url);
	echo $getData;
}//全部选中
if($tags!='全部类型'&&$genres!='全部类型'&&$countries!='全部类型'&&$year_range!='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.$tags.'&start='.$start.'&genres='.$genres.'&countries='.$countries.'&year_range='.$year_range;
	$getData = file_get_contents($url);
	echo $getData;
}//仅第一栏选中
if($tags!='全部类型'&&$genres=='全部类型'&&$countries=='全部类型'&&$year_range=='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.$tags.'&start='.$start;
	$getData = file_get_contents($url);
	echo $getData;
}//仅第二栏选中
if($tags=='全部类型'&&$genres!='全部类型'&&$countries=='全部类型'&&$year_range=='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.'&start='.$start.'&genres='.$genres;
	$getData = file_get_contents($url);
	echo $getData;
}//仅第三栏选中
if($tags=='全部类型'&&$genres=='全部类型'&&$countries!='全部类型'&&$year_range=='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.'&start='.$start.'&countries='.$countries;
	$getData = file_get_contents($url);
	echo $getData;
}//仅第四栏选中
if($tags=='全部类型'&&$genres=='全部类型'&&$countries=='全部类型'&&$year_range!='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.'&start='.$start.'&year_range='.$year_range;
	$getData = file_get_contents($url);
	echo $getData;
}
//仅第一栏和第二栏选中
if($tags!='全部类型'&&$genres!='全部类型'&&$countries=='全部类型'&&$year_range=='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.$tags.'&start='.$start.'&genres='.$genres;
	$getData = file_get_contents($url);
	echo $getData;
}//仅第一栏和第三栏选中
if($tags!='全部类型'&&$genres=='全部类型'&&$countries!='全部类型'&&$year_range=='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.$tags.'&start='.$start.'&countries='.$countries;
	$getData = file_get_contents($url);
	echo $getData;
}
//仅第一栏和第四栏选中
if($tags!='全部类型'&&$genres=='全部类型'&&$countries=='全部类型'&&$year_range!='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.$tags.'&start='.$start.'&year_range='.$year_range;
	$getData = file_get_contents($url);
	echo $getData;
}
//仅第一,二,三栏选中
if($tags!='全部类型'&&$genres!='全部类型'&&$countries!='全部类型'&&$year_range=='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.$tags.'&start='.$start.'&genres='.$genres.'$countries='.$countries;
	$getData = file_get_contents($url);
	echo $getData;
}
//仅第一,二,四栏选中
if($tags!='全部类型'&&$genres!='全部类型'&&$countries=='全部类型'&&$year_range!='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.$tags.'&start='.$start.'&genres='.$genres.'$year_range='.$year_range;
	$getData = file_get_contents($url);
	echo $getData;
}
//仅第一,三,四栏选中
if($tags!='全部类型'&&$genres=='全部类型'&&$countries!='全部类型'&&$year_range!='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.$tags.'&start='.$start.'&countries='.$countries.'$year_range='.$year_range;
	$getData = file_get_contents($url);
	echo $getData;
}
//二、三栏选中
if($tags=='全部类型'&&$genres!='全部类型'&&$countries!='全部类型'&&$year_range=='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.'&start='.$start.'&genres='.$genres.'$countries='.$countries;
	$getData = file_get_contents($url);
	echo $getData;
}
//二、四栏选中
if($tags=='全部类型'&&$genres!='全部类型'&&$countries=='全部类型'&&$year_range!='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.'&start='.$start.'&genres='.$genres.'$year_range='.$year_range;
	$getData = file_get_contents($url);
	echo $getData;
}

//三、四栏选中
if($tags=='全部类型'&&$genres=='全部类型'&&$countries!='全部类型'&&$year_range!='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.'&start='.$start.'&countries='.$countries.'$year_range='.$year_range;
	$getData = file_get_contents($url);
	echo $getData;
}

//二、三，四栏选中
if($tags=='全部类型'&&$genres!='全部类型'&&$countries!='全部类型'&&$year_range!='全部类型'){
	$url = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags='.'&start='.$start.'&genres='.$genres.'&countries='.$countries.'$year_range='.$year_range;
	$getData = file_get_contents($url);
	echo $getData;
}



