<template>
	<view>
		<!-- 模拟的标题 -->
		<image class="header" src="https://www.mescroll.com/img/xinlang/header.jpg" mode="aspectFit"/>
		<view :style="{'top':top}" class="download-tip">1条新微博</view>
		
		<mescroll-body-diy ref="mescrollRef" @init="mescrollInit" top="100" bottom="100" :down="downOption" @down="downCallback" @up="upCallback">
			<!-- 新增的微博 -->
			<view class="news-li" v-for="news in addList" :key="news.id">
				<view>{{news.title}}</view>
				<view class="new-content">{{news.content}}</view>
			</view>
			<!-- 模拟的内容 -->
			<image src="https://www.mescroll.com/img/xinlang/xinlang1.jpg" mode="widthFix"/>
			<!-- 分页的数据 -->
			<view class="news-li" v-for="news in dataList" :key="news.id">
				<view>{{news.title}}</view>
				<view class="new-content">{{news.content}}</view>
			</view>
		</mescroll-body-diy>
		
		<!-- 模拟的底部 -->
		<image class="footer" src="https://www.mescroll.com/img/xinlang/footer.jpg" mode="aspectFit"/>
	</view>
</template>
../../public-components/poem-card.vue
<script>
	import MescrollBodyDiy from "../../uni_modules/mescroll-uni/components/mescroll-diy/xinlang/mescroll-body.vue";
	import MescrollMixin from "../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	// import {apiWeiboList} from "@/api/mock.js"
	
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			MescrollBodyDiy, // 避免与main.js注册的全局组件名称相同,否则注册组件失效(iOS真机 APP HBuilderX2.7.9)
		},
		data() {
			return {
				downOption:{
					auto:false,//是否在初始化完毕之后自动执行下拉回调callback; 默认true
				},
				addList:[],//新增微博
				dataList: [], // 数据列表
				top: 0 //提示,到顶部的距离
			}
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback(){
				//加载轮播数据..
				//...
				//加载列表数据
				apiWeiboList().then(curPageData=>{
					//联网成功的回调,隐藏下拉刷新的状态
					this.mescroll.endSuccess();
					//添加新数据到顶部
					this.addList.unshift(curPageData[0]);
					//显示提示
					// #ifdef H5
					this.top=uni.upx2px(100+88)+"px"; // H5的高度需加上 88的标题栏
					// #endif
					
					// #ifndef H5
					this.top=uni.upx2px(100)+"px"; // 非H5不必加
					// #endif
					setTimeout(()=> {
						this.top=0;
					},2000);
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
				apiWeiboList(page.num, page.size).then(curPageData=>{
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(curPageData.length);

					//追加新数据
					this.dataList=this.dataList.concat(curPageData);
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
      apiWeiboList(pageNum, pageSize) {
      	return new Promise((resolute, reject)=>{
      		//延时2秒,模拟联网
      		setTimeout(function() {
      			try {
      				let list = [];
      				if(!pageNum){
      					//此处模拟下拉刷新返回的数据
      					let id=new Date().getTime();
      					let newObj={id:id, title:"【新增微博"+id+"】 新增微博", content:"新增微博的内容,新增微博的内容"};
      					list.push(newObj);
      				}else{
      					//此处模拟上拉加载返回的数据
      					for (let i = 0; i < pageSize; i++) {
      						let upIndex=(pageNum-1)*pageSize+i+1;
      						let newObj={id:upIndex, title:"【微博"+upIndex+"】 标题标题标题标题标题标题", content:"内容内容内容内容内容内容内容内容内容内容"};
      						list.push(newObj);
      					}
      					console.log("page.num=" + pageNum + ", page.size=" + pageSize + ", curPageData.length=" + list.length);
      				}
      				//模拟接口请求成功
      				resolute(list);
      			} catch (e) {
      				//模拟接口请求失败
      				reject(e);
      			}
      		}, 2000)
      	})
      }
		}
	}
</script>

<style>
	image{width: 100%;vertical-align: bottom;height:auto}
	.header{z-index: 9900;position: fixed;top: --window-top;left: 0;height: 100upx;background: #fff;}
	.footer{z-index: 9900;position: fixed;bottom: 0;left: 0;height: 100upx;background: white;}
	
	.download-tip{
		z-index: 900;
		position: fixed;
		top: calc(var(--window-top) + 20upx);
		left: 0;
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		font-size: 24upx;
		text-align: center;
		background-color: rgba(255,130,1,.7);
		color: white;
		-webkit-transition: top 300ms;
		transition: top 300ms;
	}
	
	/*展示上拉加载的数据列表*/
	.news-li{
		padding: 32upx;
		border-bottom: 1upx solid #eee;
	}
	.news-li .new-content{
		font-size: 28upx;
		margin-top: 10upx;
		margin-left: 20upx;
		color: #666;
	}
</style>

<!-- <template>
	<view class="">
		<view class="u-demo">
			<view class="u-config-wrap">
        
        <view class="wrap" v-if="ok">
          <view class="search">
            <u-search v-model="value" @change="change" @custom="custom" @search="search" shape="round" :clearabled="clearabled"
              :show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
          </view>
          <view class="">
            <u-cell-group title-bg-color="rgb(243, 244, 246)" :title="item.groupName" v-for="(item, index) in list" :key="index">
              <u-cell-item :titleStyle="{fontWeight: 500}" @click="openPage(item1.path)" :title="item1.title" v-for="(item1, index1) in item.list"
                :key="index1" :arrow="false">
                <image slot="icon" class="u-cell-icon" :src="getIcon(item1.icon)" mode="widthFix"></image>
              </u-cell-item>
            </u-cell-group>
          </view>
          <view>
            <u-button shape="square" :ripple="true" type="primary" @click="toUser">User</u-button>
            <u-button shape="square" type="primary" @click="toDetail">Detail</u-button>
          </view>
        </view>
        <view v-if="ok1">hhh</view>
			</view>
		</view>
		<u-tabbar
		    v-model="current"
		    :show="show"
		    :bg-color="bgColor"
		    :border-top="borderTop"
		    :list="list"
			:mid-button="midButton"
			:inactive-color="inactiveColor"
			:activeColor="activeColor"
		></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        ok:true,
        ok1:false,
				current: 0,
				show: true,
				bgColor: '#ffffff',
				borderTop: false,
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						count: 0,
						isDot: true,
						customIcon: false,
					},
					{
						iconPath: "/static/uview/example/min_button.png",
						selectedIconPath: "/static/uview/example/min_button_select.png",
						text: '发布',
						midButton: true,
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 0,
						isDot: false,
						customIcon: false,
					},
				],
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#5098FF'
			}
		},
		methods: {
			beforeSwitch(index) {
				return true;
			},
			showChange(index) {
				this.show = !index;
			},
			bgColorChange(index) {
				if(index == 0) {
          this.ok=true;
          this.ok1=!this.ok;
					this.activeColor = '#5098FF';
					this.inactiveColor = '#909399';
				}
				if(index == 1) {
          this.ok=true;
          this.ok1=!this.ok;
					this.activeColor = '#D0D0D0';
					this.inactiveColor = '#5A5A5A';
				}
				this.bgColor = ['#ffffff', '#1f1f1d'][index];
			},
			borderTopChange(index) {
				this.borderTop = !index;
			},
			badgeChange(index) {
				if (index == 1) {
					this.list[0].count = 0;
					this.list[4].count = 0;
				} else {
					this.list[0].count = 2;
					this.list[4].count = 23;
				}
			},
			minButtonChange(index) {
				this.midButton = !index;
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-demo-area {
		margin: 0 -40rpx;
	}
</style>
 -->