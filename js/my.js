new Vue({
	el: "#biBox",
	data: {
		//标题栏样式
		navigationBarStyle: 'border-bottom: #ffff00 3px solid;color:white',
		isGetName:'登录',
		setIndex: 0,
		hotSetIndedx: 0,
		navigationBar: ['首页', '选影', '音乐', '热门电影', '热门电视', '关于'],
		hotNavigationBar: ['热门', '最新', '豆瓣高分', '冷门佳片', '华语', '欧美', '韩国', '日本', '喜剧', '爱情', '科幻', '悬疑', '恐怖', '治愈', '经典','动作'],
		hotTvNavigationBar: ['热门', '国产剧', '综艺', '美剧', '日剧', '韩剧', '日本动画', '纪录片'],
		switchTemp: ['热门', '最新', '豆瓣高分', '冷门佳片', '华语', '欧美', '韩国', '日本', '喜剧', '爱情', '科幻', '悬疑', '恐怖', '治愈', '经典','动作'],
		videoNavigationTitle: '热门电影',
		loadingTip: '点击加载更多',
		//视频数组
		hotMovie: [],
		videoType: 'movie',
		tag: '热门',
		page_limit: 30,
		page_start: 0,
		//控制轮番图索引
		rotationIndex: 0,
		rotationArr: [],

	},

	methods: {
		//获取头部轮番图视频信息
		getRotationVideoData() {
			axios.get('php/getNavitationBar.php').then(response => {
				console.log(response.data);
				this.rotationArr = response.data;
			})
		},
		//发送请求,获取视频数据
		getHotMovieData() {
			axios.get('php/backJson.php', {
				params: {
					type: this.videoType,
					tag: this.tag,
					page_limit: this.page_limit,
					page_start: this.page_start
				}
			}).then(response => {
				this.loadingTip = '点击加载更多';
				if (response.data.subjects.length == 0) {
					alert('额!没有更多数据了');
					this.page_start -= 30;
				} else {
					//把返回的数据保存到hotMovie数组中
					this.hotMovie = response.data.subjects;
				}

			})
		},
		//热门电影与热门电视剧的切换(下拉列表)
		getSelectIndex(event) {
			if (event.target.value == this.videoType) {
				//不执行
			} else {
				this.videoType = event.target.value;
				console.log(event.target.value);
				if (event.target.value == 'tv') {
					this.videoType = 'tv';
					this.hotNavigationBar = this.hotTvNavigationBar;
					this.page_start = 0;
					this.hotSetIndedx = 0;
					this.videoNavigationTitle = '热门电视';
					this.tag = '热门';
					this.getHotMovieData();
				} else {
					this.videoType = 'movie';
					this.hotNavigationBar = this.switchTemp;
					this.page_start = 0;
					this.hotSetIndedx = 0;
					this.videoNavigationTitle = '热门电影';
					this.tag = '热门';
					this.getHotMovieData();
				}

			}
		},
		//实现上下翻页
		addContent(e) {
			//e.currentTarget.innerText 获取选标签的内容
			if (e.currentTarget.innerText == '下一页') {
				this.page_start += 30;
				this.loadingTip = '加载中.....';
				this.getHotMovieData();
			}
			if (e.currentTarget.innerText == '上一页') {
				if (this.page_start == 0) {
					alert('已经是第一页啦！');
				} else {
					this.page_start -= 30;
					this.loadingTip = '加载中.....';
					this.getHotMovieData();
				}
			}
		},
		//实现点击加载更多(原有的基础上进行累加)
		loadMore: function() {
			this.page_start += 30;
			this.loadingTip = '加载中.....';
			axios.get('php/backJson.php', {
				params: {
					type: this.videoType,
					tag: this.tag,
					page_limit: this.page_limit,
					page_start: this.page_start
				}
			}).then(response => {
				this.loadingTip = '点击加载更多';
				if (response.data.subjects.length == 0) {
					alert('额!没有更多数据了');
					this.page_start -= 30;
				} else {
					//把返回的数据追加到hotMovie数组中(让老数据拼接上新数据)
					this.hotMovie = this.hotMovie.concat(response.data.subjects);
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
		//用于判断有上方登录按钮时是否跳转登录
		isLogged(e){
			if(e.currentTarget.innerText !='登录'){
				alert('已经登录了');
			}else{
				window.open('login.html');
			}
		},
		//实现选中【顶部】导航栏时显示底部边框颜色：border-bottom
		changeStyle(index) {
			this.setIndex = index;
			if(index==1){
				window.open('choose.html');
			}
		},
		//实现选中【热门电影】导航栏时显示底部边框颜色：border-bottom
		hotChangeStyle(index, e) {
			this.hotSetIndedx = index;
			//获取当前点击控件的内容(需要传入$event)
			this.tag = e.currentTarget.innerText;
			//变回0
			this.page_start = 0;
			this.getHotMovieData();
		},
		//顶部自动轮番
		autoRotation() {
			if (this.rotationArr.length - 1 == this.rotationIndex) {
				this.rotationIndex = 0;
			} else {
				this.rotationIndex += 1;
			}
		},
		//左切换
		left: function() {
			if (this.rotationArr.length - 1 == this.rotationIndex) {
				this.rotationIndex -= 1;
			} else {
				if (this.rotationIndex == 0) {
					this.rotationIndex = this.rotationArr.length - 1;
				} else {
					this.rotationIndex -= 1;
				}
			}
		},
		//右切换
		right: function() {
			if (this.rotationArr.length - 1 == this.rotationIndex) {
				this.rotationIndex = 0;
			} else {
				this.rotationIndex += 1;
			}
		},
		//播放视频
		play: function(videoName){
			window.open('https://v.6hu.cc/dd1/?v='+videoName);
		},
		//视频详情
		details(id,image){
			$.cookie.raw = true;//默认情况下，读取和写入 cookie 的时候自动进行编码和解码（使用 encodeURIComponent 编码，decodeURIComponent 解码）。要关闭这个功能设置 raw:true 即可
			$.cookie.json = true;//设置 cookie 的数据使用 json 存储与读取，这时就不需要使用 JSON.stringify 和 JSON.parse 了
			//保存视频图片网络地址视频id,用于另一个页面调用,cookie不写时间的话,关闭浏览器才会清空cookie保存的东西
			$.cookie('iamge_url',image,{path:'/'});//保存图片链接到cookie中：path:'/'：保存路径在网站跟目录
			var id=id.replace(/[^0-9]/ig,"");//只保留数字,因为顶部轮番图视频id在url中,所以使用正则处理
			$.cookie('id',id,{path:'/'});//保存视频id
			window.open('details.html');
		}
		
	},
	//mounted:监听事件在这个方法
	mounted() {
		//4秒执行一次autoRotation函数
		setInterval(this.autoRotation, 4000);
		this.getHotMovieData();
		this.getRotationVideoData();
		this.userVrification();
	}

})
