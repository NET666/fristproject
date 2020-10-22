new Vue({
	el: "#biBox",
	data: {
		//标题栏样式
		navigationBarStyle: 'border-bottom: #3448BC 3px solid;color:white',
		setIndex: 0,
		hotSetIndedx: 0,
		navigationBar: ['首页', '电视', '电影', '热门电影', '热门电视', '音乐'],
		hotNavigationBar: ['热门', '最新', '豆瓣高分', '冷门佳片', '华语', '欧美', '韩国', '日本', '喜剧', '爱情', '科幻', '悬疑', '恐怖', '治愈', '经典'],
		hotTvNavigationBar: ['热门', '国产剧', '综艺', '美剧', '日剧', '韩剧', '日本动画', '纪录片'],
		switchTemp: ['热门', '最新', '豆瓣高分', '冷门佳片', '华语', '欧美', '韩国', '日本', '喜剧', '爱情', '科幻', '悬疑', '恐怖', '治愈', '经典'],
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
		//播放视频url
		videoUrl:'',
		//控制video控件的隐藏与显示
		isPlay:false

	},

	methods: {
		//获取头部轮番图视频信息
		getRotationVideoData() {
			axios.get('getNavitationBar.php').then(response => {
				console.log(response.data);
				this.rotationArr = response.data;
			})
		},
		//发送请求,获取视频数据
		getHotMovieData() {
			axios.get('backJson.php', {
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
			axios.get('backJson.php', {
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
		//实现选中【顶部】导航栏时显示底部边框颜色：border-bottom
		changeStyle(index) {
			this.setIndex = index;
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
			//this.isPlay = true;
			//this.videoUrl = 'https://z1.m1907.cn/?jx='+videoName;
			//定位到video播放位置
			//location.href = '#video';
			//在新窗口打开播放
			window.open('https://v.6hu.cc/dd1/?v='+videoName);
		}
	},
	//mounted:监听事件在这个方法
	mounted() {
		//4秒执行一次autoRotation函数
		setInterval(this.autoRotation, 4000);
		this.getHotMovieData();
		this.getRotationVideoData();
	}

})
