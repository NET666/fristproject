new Vue({
	el: "#biBox",
	data: {
		navigationBarStyle: 'border-bottom: #3448BC 3px solid;color:white',
		setIndex: 0,
		hotSetIndedx: 0,
		navigationBar: ['首页', '电视', '电影', '热门电影', '热门电视', '音乐'],
		hotNavigationBar: ['热门', '最新', '豆瓣高分', '冷门佳片', '华语', '欧美', '韩国', '日本', '喜剧', '爱情', '科幻', '悬疑', '恐怖', '治愈', '经典'],
		hotTvNavigationBar: ['热门', '国产剧', '综艺', '美剧', '日剧', '韩剧', '日本动画', '纪录片'],
		switchTemp: ['热门', '最新', '豆瓣高分', '冷门佳片', '华语', '欧美', '韩国', '日本', '喜剧', '爱情', '科幻', '悬疑', '恐怖', '治愈', '经典'],
		rotationIndex: 0,
		videoNavigationTitle: '热门电影',
		loadingTip: '点击返回顶部',
		hotMovie: [],
		rotationArr: [{
				path: 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2621473195.webp',
				title: '喜宝',
				rate: '3.4分',
				url: 'https://movie.douban.com/subject/27611667/?from=showing'
			},
			{
				path: 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2621038906.webp',
				title: '掬水月在手',
				rate: '8.3分',
				url: 'https://movie.douban.com/subject/34914949/?from=showing'
			},
			{
				path: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2622417580.webp',
				title: '七号房的礼物 7',
				rate: '7.8分',
				url: 'https://movie.douban.com/subject/34875369/?from=showing'
			},
		],
		videoType: 'movie',
		tag: '热门',
		page_limit: 30,
		page_start: 0
	},
	methods: {
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
				this.loadingTip = '点击返回顶部';
				if (response.data.subjects == '') {
					alert('额!没有更多数据了');
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
		}
	},
	mounted() {
		//4秒执行一次autoRotation函数
		setInterval(this.autoRotation, 4000);
		this.getHotMovieData();
	}

})

