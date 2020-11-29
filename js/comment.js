var app = new Vue({
			el: '#biBox',
			data: {
				//上下翻页提示
				loadTip:'加载完成',
				//登录判断
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
				//控制评论分页
				start:0,
			},
			methods: {
				changeStyle(index) {
					this.setIndex = index;
					if(index==0){window.location.href = 'index.html';}
					if(index==1){window.location.href = 'choose.html';}
					if(index==2){window.location.href = 'music.html';}
					if(index==3){window.location.href = 'aboutMe.html';}
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
				//获取豆瓣评论
				show(){
					axios.get('php/doubanComment.php',{
						params:{
							id:this.videoId,
							start:this.start,
						}
					}).then(response=>{
						if(response.data[0].userName==''){
							this.loadTip = '没有更多数据了~~~';
							this.start -= 20;
						}else{
							this.commetMessage = response.data;
							this.loadTip = '加载完成';
							console.log(response.data);
							//锚点定位：跳转到评论头部
							if(this.start==0){window.location.href = '#banner';}
							else{window.location.href = '#list-biBox';}
							
						}
						
					})
				},
				//评论上下翻页
				moreComment(e){
					if(e.currentTarget.innerText=='下一页'){
						this.start +=20;
						this.loadTip = '加载中....';
						this.show();
					}else{
						if(this.start==0){
							this.loadTip = '已经是第一页啦~~';
						}else{
							this.loadTip = '加载中....';
							this.start -=20;
							this.show();
						}
						
					}
					
				},
				//加载更多评论
				loadMore(){
					this.start += 20;
					axios.get('php/doubanComment.php',{
						params:{
							id:this.videoId,
							start:this.start,
						}
					}).then(response=>{
						if(response.data==''){
							this.loadTip = '没有更多数据了~~~';
							this.start -= 20;
						}else{
							//向commetMessage数组追加数据
							this.commetMessage =this.commetMessage.concat(response.data);
							this.loadTip = '加载完成';
							console.log(response.data);
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
					window.location.href = 'history/history.html';
					//window.open('https://v.6hu.cc/dd1/?v=' + videoName);
				}
			},
			mounted() {
				//mounted这个方法用于页面加载时执行的方法写这里（或者用create()方法）
				this.onload();
				this.show();
				this.userVrification();
			}
		})