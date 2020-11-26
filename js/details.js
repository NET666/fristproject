var app = new Vue({
			el: '#biBox',
			data: {
				isGetName:'登录',
				//判断导航栏当前选中的是哪个
				setIndex: 0,
				//导航栏选中是使用的样式
				navigationBarStyle: 'border-bottom: #3448BC 3px solid;color:white',
				//导航栏
				navigationBar: ['首页', '选影', '音乐', '关于'],
				//视频图片url
				image: '',
				//视频信息数组
				videoArr: [],
				//评论信息数组
				commetMessage: [],
				//输入框绑定
				inputValue: '',
				//视频ID
				videoId: '',
				//用于取出评论控制
				limit_start:0
			},
			methods: {
				changeStyle(index) {
					this.setIndex = index;
					if(index==0){open('index.html');}
					if(index==1){open('choose.html');}
					if(index==2){open('music.html');}
					if(index==3){open('aboutMe.html');}
				},
				onload: function() {
					$.cookie.raw = true; //默认情况下，读取和写入 cookie 的时候自动进行编码和解码（使用 encodeURIComponent 编码，decodeURIComponent 解码）。要关闭这个功能设置 raw:true 即可
					$.cookie.json = true; //设置 cookie 的数据使用 json 存储与读取，这时就不需要使用 JSON.stringify 和 JSON.parse 了
					this.image = $.cookie('iamge_url').replace(/\"/g, ""); //replace(/\"/g,""):把读出来的数据引号去掉
					this.videoId = $.cookie('id').replace(/\"/g, "");
					axios.get('php/doDetails.php?id=' + this.videoId).then(response => {
						this.videoArr = response.data.subject;
					})
				},
				//添加评论(this.videoId:用于区分视频标识)
				addComment: function() {
					//this.inputValue
					if(this.inputValue.length>1){
						//判断是否已经登录
						axios.get('php/userVrification.php').then(response =>{
							if(response.data==false){
								alert('请先登录');
							}else{
								axios.get('php/comment.php?content=' + this.inputValue + '&id=' + this.videoId).then(response => {
									if(response.data == '发布成功'){
										//清空输入框
										this.inputValue = '';
										//用于后端判断
										this.limit_start +=1;
										//提交评论完毕后,执行show函数,显示评论
										this.show();
									}else{
										alert('发布失败');
									}
									
								})
							}
						})
					}
				},
				//获取对应Id视频的评论
				show() {
					axios.get('php/show.php?id=' + this.videoId+'&limit_start='+this.limit_start).then(response => {
						//console.log(response);
						if (response.data !== '当前视频暂无评论') {
							//把返回的数据追加到组数中
							this.commetMessage = this.commetMessage.concat(response.data);
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
					if(e.currentTarget.innerText =='登录'){
						window.location.href = 'login.html';
					}
				},
				play(videoName) {
					window.open('https://v.6hu.cc/dd1/?v=' + videoName);
				}
			},
			mounted() {
				//mounted这个方法用于页面加载时执行的方法写这里（或者用create()方法）
				this.onload();
				this.show();
				this.userVrification();
			}
		})