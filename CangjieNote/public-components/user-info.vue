<template>
	<view>
		<view  v-if="!userInfo">
			<u-button @click="profile">授权登录</u-button>
		</view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30"  v-else>
			<view class="u-m-r-10">
				<u-avatar :src="userInfo.avatarUrl" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userInfo.nickName}}</view>
				<view class="u-font-14 u-tips-color"></view>
			</view>
			<view>
				<u-button @click="loginOut">退出登录</u-button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:''
			}
		},
		mounted() {
			let user = wx.getStorageSync('user');
			this.userInfo = user;
		},
		methods: {
			profile(){
				const app = getApp();
				wx.getUserProfile({
				desc: "获取你的昵称、头像、地区及性别",
				success: res => {
					wx.cloud.callFunction({ 
						name:'getProfile',
						data:{
							'OPENID': app.globalData.openid,
							'userInfo':res.userInfo
						},
						success:res =>{
						},
					});
					let user = res.userInfo;
					wx.setStorageSync('user',user);
					this.userInfo = user;
					
					// 决定卡片是否显示
					this.$emit('showCollections',true);
				},
				fail:res=>{
					this.$emit('showCollections',false);
				}
				});
			},
			loginOut(){
				this.userInfo = '';
				wx.setStorageSync('user',null);
				this.$emit('showCollections',false);
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}
.user-box{
	background-color: #fff;
}
</style>
