var app = new Vue({
			el: '#biBox',
			data: {

				//控制顶部标题栏选中的样式
				navigationBarStyle: 'border-bottom: #ffff00 3px solid;color:white',
				setIndex: 1,
				//用于检测点击右上方登录按钮时验证是否登录状态,若不是则跳转登录页面,页面
				isGetName: '登录',
				//控制选影区选中的样式
				liStyle: 'background-color: #00AAFF;border-radius: 2px;',
				tagsIndex: 0,
				genresIndex: 0,
				countriesIndex: 0,
				year_rangeIndex: 0,
				//获取选影区的选中的内容变量
				tagsName: '全部类型',
				genresName: '全部类型',
				countriesName: '全部类型',
				year_rangeName: '全部类型',
				start: 0,
				videoArray: [],
				//加载更多
				loadTip: '点击加载更多',
				//选影区
				hotSetIndedx: 0,
				navigationBar: ['首页', '选影', '音乐', '关于'],
				allTags: ['全部类型', '电影', '电视剧', '综艺', '动漫', '纪录片', '短片'],
				allGenres: ['全部类型', '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑', '惊悚', '恐怖', '犯罪', '同性',
					'音乐', '歌舞', '传记', '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠', '情色'
				],
				allCountries: ['全部类型', '中国大陆', '欧美', '美国', '中国香港', '中国台湾', '日本', '韩国', '英国', '法国', '德国',
					'意大利', '西班牙', '印度', '泰国', '俄罗斯', '伊朗', '加拿大', '澳大利亚', '爱尔兰', '瑞典', '巴西', '丹麦'
				],
				allYear_range: ['全部类型', '2020', '2019', '2010年代', '2000年代', '90年代', '80年代', '70年代', '60年代', '更早'],
			},
			methods: {
				//获取数据
				getVideoData() {
					//https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=&start=0&genres=武侠
					axios.get('php/chooseMovie.php', {
						params: {
							tags: this.tagsName,
							start: this.start,
							genres: this.genresName,
							countries: this.countriesName,
							year_range: this.year_rangeName,
						}
					}).then(response => {
						console.log(response);
						//this.videoArray = response.data.data;
						if (response.data.data == null || response.data.data == '') {
							this.loadTip = '已经没有更多了~~';
							this.start -= 20;
						} else {
							this.videoArray = response.data.data;
							this.loadTip = '点击加载更多';
						}
						
					})
				},
				//验证用户是否已经登录
				userVrification: function(){
					axios.get('php/userVrification.php').then(response =>{
						if(response.data==false){
							this.isGetName = '登录';
						}else{
							this.isGetName = response.data;
							console.log(response.data);
						}
					})
				},
				//加载更多
				loadMore() {
					this.start += 20;
					this.loadTip = '加载中.....';
					axios.get('php/chooseMovie.php', {
						params: {
							tags: this.tagsName,
							start: this.start,
							genres: this.genresName,
							countries: this.countriesName,
							year_range: this.year_rangeName,
						}
					}).then(response => {
						console.log(response);
						//this.videoArray = response.data.data;
						if (response.data.data == null || response.data.data == '') {
							this.loadTip = '已经没有更多了~~';
							this.start -= 20;
						} else {
							this.videoArray = this.videoArray.concat(response.data.data);
							this.loadTip = '点击加载更多';
						}
						
					})
					
				},
				//点击头部标题执行事件
				changeStyle(index) {
					//this.setIndex = index;
					if (index == 0) {window.location.href = 'index.html';}
					if (index == 2) {window.location.href = 'music.html';}
					if (index == 3) {window.location.href = 'aboutMe.html';}
				},
				// 选影区点击事件
				listStyleOne(index, e) {
					this.tagsIndex = index;
					//获取当前点击控件的内容(需要传入$event)
					this.tagsName = e.currentTarget.innerText;
					this.start = 0;
					this.getVideoData();
				},
				listStyleTwo(index, e) {
					this.genresIndex = index;
					this.genresName = e.currentTarget.innerText;
					this.start = 0;
					this.getVideoData();
				},
				listStyleThree(index, e) {
					this.countriesIndex = index;
					this.countriesName = e.currentTarget.innerText;
					this.start = 0;
					this.getVideoData();
				},
				listStyleFour(index, e) {
					this.year_rangeIndex = index;
					this.start = 0;
					if (e.currentTarget.innerText == '全部类型') {this.year_rangeName = '全部类型';this.getVideoData();}
					if (e.currentTarget.innerText == '2020') {this.year_rangeName = '2020,2020';this.getVideoData();}
					if (e.currentTarget.innerText == '2019') {this.year_rangeName = '2019,2019';this.getVideoData();}
					if (e.currentTarget.innerText == '2010年代') {this.year_rangeName = '2010,2019';this.getVideoData();}
					if (e.currentTarget.innerText == '2000年代') {this.year_rangeName = '2000,2009';this.getVideoData();}
					if (e.currentTarget.innerText == '90年代') {this.year_rangeName = '1990,1999';this.getVideoData();}
					if (e.currentTarget.innerText == '80年代') {this.year_rangeName = '1980,1989';this.getVideoData();}
					if (e.currentTarget.innerText == '70年代') {this.year_rangeName = '1970,1979';this.getVideoData();}
					if (e.currentTarget.innerText == '60年代') {this.year_rangeName = '1960,1969';this.getVideoData();}
					if (e.currentTarget.innerText == '更早') {this.year_rangeName = '1,1959';this.getVideoData();}

				},
				//播放视频
				play(videoName,id){
					$.cookie.raw = true;
					$.cookie.json = true;
					$.cookie('videoName',videoName,{path:'/'});
					$.cookie('id',id,{path:'/'});
					window.location.href = 'history/history.html';
					//window.open('https://v.6hu.cc/dd1/?v='+videoName);
				},
				//视频详情
				details(id,videoName,image){
					$.cookie.raw = true;//默认情况下，读取和写入 cookie 的时候自动进行编码和解码（使用 encodeURIComponent 编码，decodeURIComponent 解码）。要关闭这个功能设置 raw:true 即可
					$.cookie.json = true;//设置 cookie 的数据使用 json 存储与读取，这时就不需要使用 JSON.stringify 和 JSON.parse 了
					$.cookie('videoName',videoName,{path:'/'});
					//保存视频图片网络地址视频id,用于另一个页面调用,cookie不写时间的话,关闭浏览器才会清空cookie保存的东西
					$.cookie('iamge_url',image,{path:'/'});//保存图片链接到cookie中：path:'/'：保存路径在网站跟目录
					var id=id.replace(/[^0-9]/ig,"");//只保留数字,因为顶部轮番图视频id在url中,所以使用正则处理
					$.cookie('id',id,{path:'/'});//保存视频id
					window.location.href = 'comment.html';
				},
				//用于判断有上方登录按钮时是否跳转登录
				isLogged(e) {
					if (e.currentTarget.innerText == '登录') {
						window.location.href = 'login.html';
					}
				},
				//注销登录
				doSelect(e){
					if(e.target.value == '退出登录'){
						axios.get('php/logOut.php').then(response=>{
							this.userVrification();
						})
					}
					else if(e.target.value =='后台管理'){
						open('backStage/index.html');
					}
				},

			},
			mounted() {
				this.getVideoData();
				this.userVrification();
			}
		})