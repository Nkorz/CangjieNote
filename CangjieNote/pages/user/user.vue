<template>
	<view>
		<user-info @showCollections="isShow"></user-info>
		<u-line></u-line>
		<!-- 数据列表 -->
		<view v-for="(item,index) in userCollections" :key="index">
		  <user-poem-card :poem="item" :thumb="true" @routerChange="toDetail"></user-poem-card>
		</view>
	</view>
</template>

<script>
	import userInfo from "../../public-components/user-info.vue"
	import userPoemCard from "../../public-components/user-poem-card"
export default{
	data(){
		return {
			isShowCard:false,
			userCollections:[]
		}
	},
	components:{
		userInfo,
		userPoemCard
	},
	onShow() {
		let that = this;
		let tmp = {};
		// 获取当前用户收藏的诗词信息
		wx.cloud.callFunction({
			name:'getCollection',
			success:res=>{
				console.log(res);
				let collections = res.result.data;
				// this.userCollections = res.result.data;
				collections.forEach(function(item,index){
					tmp = {
						id: item._id,
						title: item.title,
						author: item.flag,
						star: true,
						starNum: item.stars,
						content: item.content
					}
					that.userCollections.push(tmp);
				})
				console.log(this.userCollections);
			}
		})
	},
	methods:{
		isShow(data){
			this.isShowCard = true;
		},
		toDetail(id) {
		  this.$u.route({
		    url: "/pages/detail/detail",
		    animationType: "slide-in-bottom",
		    params: {
		      id: id
		    },
		  });
		},
	}
	
}
</script>

<style>
</style>
