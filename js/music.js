var app = new Vue({
			el: '#biBox',
			data: {
				navigationBarStyle: 'border-bottom: #ffff00 3px solid;color:white',
				isGetName: '登录',
				setIndex: 2,
				hotSetIndedx: 0,
				navigationBar: ['首页', '选影', '音乐', '关于'],
				//显示是否播放
				showPlay:'',
				name:'',
				//有mv歌曲显示MV图片
				playImg: 'position: relative;width: 25px;height: 25px;display: block;',
				MvIsvisible: 'display:none',
				//控制tr背景背景样式
				tableStyle: 'background-color: #141414;height: 70px;',
				tableStyles: 'height: 70px;',
				//MV视频
				videoIsPlay: false,
				videoMvShow: 'position: absolute;width: 600px;height: 400px;margin-left: 23%;margin-top: 10%;display: block;outline:none',
				videoMvOff: 'position: absolute;width: 600px;height: 400px;margin-left: 23%;margin-top: 10%;display: none;',
				
				key_name: '梁静茹',
				offset: 0,
				//歌曲数组
				musicList: [],
				//音乐链接
				musicUrl: '',
				//音乐MV
				musicMv: '',
			},
			methods: {
				changeStyle(index) {
					//this.setIndex = index;
					if (index == 0) {
						window.location.href = 'index.html';
					}
					if (index == 1) {
						window.location.href = 'choose.html';
					}
					if (index == 3) {
						window.location.href = 'aboutMe.html';
					}
				},
				//用于判断有上方登录按钮时是否跳转登录
				isLogged(e) {
					if (e.currentTarget.innerText == '登录') {
						window.location.href = 'login.html';
					}
				},
				//验证用户是否已经登录
				userVrification: function() {
					axios.get('php/userVrification.php').then(response => {
						if (response.data == false) {
							this.isGetName = '登录';
						} else {
							this.isGetName = response.data;
							console.log(response.data);
						}
					})
				},
				//注销登录
				doSelect(e) {
					if (e.target.value == '退出登录') {
						axios.get('php/logOut.php').then(response => {
							this.userVrification();
						})
					}
					else if(e.target.value =='后台管理'){
						open('backStage/index.html');
					}
				},
				//歌曲搜索
				musicSearch() {
					//获取当前时间戳
					const getNowTime = Date.now();
					axios.get('https://autumnfish.cn/search', {
						params: {
							keywords: this.key_name,
							limit: 15,
							offset: this.offset,
							type: 1,
							t: getNowTime
						}
					}).then(response => {
						console.log(response.data.result.songs);
						if (response.data.result.songs == undefined) {
							this.offset -= 15;
							alert('没有更多啦');
						} else {
							this.musicList = response.data.result.songs;
							this.$refs.focus.focus();//让搜索框获得焦点
						}
					})
				},
				//获取音乐播放连接
				musicPlay(id,name) {
					this.name = name;
					const getNowTime = Date.now();
					axios.get('https://autumnfish.cn/song/url', {
						params: {
							id: id,
							t: getNowTime
						}
					}).then(response => {
						this.musicUrl = response.data.data[0].url;
						if(this.musicUrl != null){this.showPlay =  '正在播放----'+ name;}
					})
				},
				//播放MV
				playMv(mvid,name) {
					this.showPlay =  '正在播放MV----'+ name;
					const getNowTime = Date.now();
					axios.get('https://autumnfish.cn/mv/url?id=' + mvid).then(response => {
						console.log(response.data.data.url);
						this.musicMv = response.data.data.url;
						this.videoIsPlay = true;
						window.location.href = "#music-head";
						//播放Mv时暂定歌曲播放
						let myAudio = document.getElementById('music');
						if(myAudio.paused == false){
							myAudio.pause();
						}
					})
				},
				hide() {
					//隐藏video
					this.videoIsPlay = false;
					//暂定MV播放
					let myVideo = document.getElementById('video');
					myVideo.pause();
					//恢复播放歌曲
					let myAudio = document.getElementById('music');
					if(this.name != ''){
						this.showPlay =  '正在播放----'+ this.name;
						myAudio.play();
					}
					else{this.showPlay = '暂无播放歌曲'}
				},
				//上一页，下一页
				nextPage() {
					this.offset += 15;
					this.musicSearch();
				},
				backPage() {
					if (this.offset != 0) {
						this.offset -= 15;
						this.musicSearch();
					}
				},

			},
			//过滤器
			filters: {
				changeMinuteSecond(duration){
					//把毫秒转换为分和秒
					var min = Math.floor((duration/1000/60) << 0);
					var sec = Math.floor((duration/1000) % 60).toFixed(0);
					return min + ':' + (sec < 10 ? '0' : '') + sec;
				}
			},
			mounted() {
				this.userVrification();
				this.musicSearch();
			}
		})