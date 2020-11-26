new Vue({
			el: '#bigBox',
			data: {
				//发表时间
				dataTime: '',
				//发表内容
				content: '',
				//接收后台返回的数据
				logArray: [],
				//控制编辑宽显示还是隐藏
				visible: false,
				//用户名
				islogin:'登录'
			},
			methods: {
				//发表评论
				sedLog: function() {
					if (this.dataTime != '' && this.content != '') {
						axios.get('php/aboutMe.php', {
							params: {
								dataTime: this.dataTime,
								content: this.content
							}
						}, ).then(response => {
							console.log(response.data);
							if (response.data == '成功') {
								this.dataTime = '';
								this.content = '';
								this.show();
							}
						})
					} else {
						alert('内容或时间没写！');
					}

				},
				//提取评论
				show() {
					axios.get('php/aboutMe.php', {
						params: {
							dataTime: '0',
							content: '0'
						}
					}, ).then(response => {
						this.logArray = response.data;
					})
				},
				//验证用户名是否为【陈绪运】否则不显示日志发送框
				userVrification: function() {
					axios.get('php/userVrification.php').then(response => {
						if (response.data == '陈绪运') {
							this.visible = true;
						}
						if(response.data!=false){
							this.islogin = response.data;
						}
					})
				},
				//退出登录
				logOut(){
					axios.get('php/logOut.php').then(response => {
						this.userVrification();
						this.show();
						this.islogin = '登录'
					})
				},
				isJump(){
					if(this.islogin == '登录'){
						window.location.href = 'login.html';
					}
				}

			},
			mounted() {
				this.show();
				this.userVrification();
			}
		})