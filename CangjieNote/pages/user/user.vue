<template>
	<view>
		<user-info @showCollections="showCard"></user-info>
		<u-line></u-line>
		<!-- 数据列表 -->
		<view v-if="isShowCard && !isEmpty">
			<view v-for="(item,index) in userCollections" :key="index">
				<user-poem-card :poem="item" :thumb="true" @routerChange="toDetail"></user-poem-card>
			</view>
		</view>
		<u-empty class="empty-icon" v-else-if="isShowCard && isEmpty" text="暂无收藏"></u-empty>
		<view class="menu" :class="{active:menuFlag}">
			<image src="../../static/navi.svg" class="menuTrigger" @tap="clickMenu"></image>
			<image src="../../static/home.svg" class="menuItem menuItem1" @tap="toHome"></image>
			<image src="../../static/user.svg" class="menuItem menuItem3" @tap="toUser"></image>
		</view>
	</view>
</template>

<script>
	import userInfo from "../../public-components/user-info.vue"
	import userPoemCard from "../../public-components/user-poem-card"
	export default {
		data() {
			return {
				mask: false,
				menuFlag: false,
				isShowCard: false,
				userCollections: [],
				isEmpty:false
			}
		},
		components: {
			userInfo,
			userPoemCard
		},
		watch: {
			isShowCard: {
				immediate: true,
				handler: function(val) {
					console.log("change!", val);
					if (val) {
						this.getUserCollections();
					}
				}
			}
		},
		methods: {
			getUserCollections() {
				let that = this;
				let tmp = {};
				// 获取当前用户收藏的诗词信息
				wx.cloud.callFunction({
					name: 'getCollection',
					success: res => {
						console.log("current-collections",res);
						let collections = res.result.data;
						if(collections.length==0){
							this.isEmpty = true;
						}else{
							that.userCollections = [];
							// this.userCollections = res.result.data;
							collections.forEach(function(item, index) {
								tmp = {
									id: item._id,
									title: item.title,
									author: "「" + item.flag + "·" + item.additional_data.chapter + "·" + item.additional_data.section + "」",
									star: true,
									starNum: item.stars,
									content: item.content
								}
								that.userCollections.push(tmp);
							})
							console.log(this.userCollections);
						}
					}
				})
			},
			toUser() {
				uni.reLaunch({
					url: "/pages/user/user",
				})
			},
			toHome() {
				uni.reLaunch({
					url: "/pages/main/main",
				});
			},
			clickMenu() {
				this.menuFlag = !this.menuFlag;
			},
			showCard(data) {
				this.isShowCard = data;
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
	.empty-icon{
		display: flex;
		margin-top: 100rpx;
		justify-content: center;
	}
	.menu {
		position: fixed;
		width: 110rpx;
		height: 110rpx;
		bottom: 120rpx;
		right: 44rpx;
		border-radius: 50%;
	}

	.menuTrigger {
		position: absolute;
		top: 0;
		left: 0;
		width: 80rpx;
		height: 80rpx;
		background-color: rgba(102, 175, 123, 0.2);
		border-radius: 50%;
		padding: 20rpx;
		cursor: pointer;
		transition: .35s ease;
	}

	.menuItem {
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		top: 10rpx;
		left: 10rpx;
		padding: 20rpx;
		border-radius: 50%;
		background-color: rgba(133, 162, 175, 0.2);
		border: none;
		box-shadow: 0 0 5rpx 1rpx rgba(0, 0, 0, .05);
		z-index: -1000;
		opacity: 0;
	}

	.menuItem1 {
		transition: .35s ease;
	}

	.menuItem2 {
		transition: .35s ease .1s;
	}

	.menuItem3 {
		transition: .35s ease .2s;
	}

	.menu.active .menuTrigger {
		transform: rotateZ(225deg);
		background-color: rgba(102, 175, 123, 0.3);
	}

	.menu.active .menuItem1 {
		top: -106rpx;
		left: -120rpx;
		opacity: 1;
	}

	.menu.active .menuItem2 {
		top: 10rpx;
		left: -164rpx;
		opacity: 1;
	}

	.menu.active .menuItem3 {
		top: 126rpx;
		left: -120rpx;
		opacity: 1;
	}
</style>
