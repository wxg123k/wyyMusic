/* 
	1、歌曲搜索
	请求地址：https://autumnfish.cn/search
	请求方式：get
	请求参数：keywords(查询到关键字)
	响应内容：歌曲搜索结果
	
	2、歌曲url获取
	请求地址：https://autumnfish.cn/song/url
	请求参数：id(歌曲id)
	响应内容：歌曲url地址
	
	3、歌曲详情获取
	请求地址：https://autumnfish.cn/song/detail
	请求参数：ids(歌曲id)
	响应内容：歌曲详情，包含封面内容
	
	4、热门评论获取
	请求地址：https://autumnfish.cn/comment/hot?type=0
	请求参数：id(歌曲id，type固定为0)
	响应内容：歌曲都热门评论
	
	5、mv地址获取
	请求地址：https://autumnfish.cn/mv/url
	请求参数：id(歌曲id，mvid为0说明没有mv)
	相应内容：mv地址
 */
var musicApp = new Vue({
	el:"#music-app",
	data:{
		// 搜索条件
		term:"",
		// 歌曲数组
		music:[],
		// 歌曲地址
		songUrl:"",
		// 歌曲封面
		picUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0818%252F814967dbp00qy009k003zc000jg00jgc.png%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635306672&t=43ced9372e8d4931a5bb0c4bebe6466d",
		// 热门评论数组
		comment:[],
		// 播放状态
		isplaying:false,
		// 开始暂停
		toSuspend:"pause",
		// mv地址
		mvUrl:"",
		// mv显示隐藏
		mvShow:false
	},
	methods:{
		// 搜索歌曲 歌手...
		search:function(){
			var _this = this;
			axios.get("https://autumnfish.cn/search?keywords=" + _this.term)
			.then(function(res){
				// console.log(res.data.result.songs)
				_this.music = res.data.result.songs
			}),function(err){}
		},
		// 获取歌曲相关信息
		songs:function(songId){
			var _this = this;
			// 获取歌曲url
			axios.get("https://autumnfish.cn/song/url?id=" + songId)
			.then(function(res){
				// console.log(res.data.data[0].url);
				_this.songUrl = res.data.data[0].url
			}),function(err){}
			// 获取歌曲详情
			axios.get("https://autumnfish.cn/song/detail?ids=" + songId)
			.then(function(res){
				// console.log(res.data.songs[0].al.picUrl);
				_this.picUrl = res.data.songs[0].al.picUrl
			}),function(err){}
			// 热门评论获取
			axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + songId)
			.then(function(res){
				// console.log(res.data.hotComments);
				_this.comment = res.data.hotComments
			}),function(err){}
			
		},
		// 暂停音频动画
		play:function(){
			// console.log("开始")
			this.isplaying = true;
			this.toSuspend = "play"
		},
		// 开始音频动画
		paused:function(){
			// console.log("暂停")
			this.isplaying = false;
			this.toSuspend = "pause"
		},
		// 显示mv
		playMv:function(mvId){
			var _this = this;
			axios.get("https://autumnfish.cn/mv/url?id=" + mvId)
			.then(function(res){
				// console.log(res.data.data.url)
				// 设置mv地址
				_this.mvUrl = res.data.data.url;
				// 设置为显示
				_this.mvShow = true
				// 关闭音乐播放和动画
				_this.songUrl = ""
				_this.paused()
			}),function(err){}
		},
		// 隐藏mv
		hide:function(){
			this.mvShow = false
			// 关闭mv播放
			this.mvUrl = ""
		}
	}
})