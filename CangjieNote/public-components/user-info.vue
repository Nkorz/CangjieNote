<template>
	<view>
		<view class="login-box" v-if="!userInfo">
			<view class="program-avatar-parent" >
				<u-avatar class="program-avatar" :src="programAvater" size="140"></u-avatar>
			</view>
			<view class="u-text-center ">仓颉笔记</view>
			<view class="u-text-center u-padding-50">您暂未获取微信授权，将无法正常使用小程序的功能。如需正常使用，请点击“授权登录”按钮，打开头像、昵称等授权。</view>
			<u-button type="success" class="login-btn" :custom-style="customStyle" size="medium" @click="profile">授权登录</u-button>
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
				userInfo:'',
				programAvater:'https://636c-cloud0-backend-7gnbnkiz459f6b99-1305918868.tcb.qcloud.la/9AB2291D8DAD1AD99E39EC7828956215.png?sign=49665ea9b5d6a8836ef325eb69e1a8f2&t=1622101201'
			}
		},
		mounted() {
			let user = wx.getStorageSync('user');
			this.userInfo = user;
			if(this.userInfo){
				this.$emit('showCollections',true);
			}
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
        uni.removeStorage({
            key: 'SHOW_TIP',
            success: function (res) {
                console.log('success');
            }
        });
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
.login-box{
	margin-top: 30%;
}
.program-avatar-parent{
	display: flex;
	align-items: center;
	margin: 0 auto;
}
.program-avatar{
	margin: 0 auto;
}
.login-btn{
	display: flex;
	align-items: center;
	margin: 0 auto;
}
</style>
