<template>
	<view>
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-search v-model="value" @change="change" @custom="custom" @search="search" :shape="shape" :clearabled="clearabled" 
			:show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
		</view>
    <view class="">
    		<view class="u-card-wrap">
    			<u-card @click="click" @head-click="headClick" :title="title" :sub-title="subTitle" :thumb="thumb" :padding="padding" :border="border">
    				<view class="" slot="body"> 
    					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
    						<view class="u-body-item-title u-line-2">
    							瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半
    						</view>
    						<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
    					</view>
    					<view class="u-body-item u-flex u-row-between u-p-b-0">
    						<view class="u-body-item-title u-line-2">
    							釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放
    						</view>
    						<image src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg" mode="aspectFill"></image>
    					</view>
    				</view>
    				<view class="" slot="foot">
    					<u-icon v-if="bottomSlot" name="chat-fill" size="34" label="30评论"></u-icon>
    				</view>
    			</u-card>
    		</view>
        <view>
          <button type="default" @click="toUser">User</button>
          <button type="default" @click="toDetail">Detail</button>
        </view>
    		</view>
    	</view>
    
  </view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
      toUser () {
        this.$u.route({
          url: '/pages/user/user',
          animationType: 'slide-in-bottom'
        })
      },
      toDetail () {
        this.$u.route({
          url: '/pages/detail/detail',
          animationType: 'slide-in-bottom'
        })
      }
			
		}
	}
</script>

<style scoped lang="scss">
	.u-demo {
		padding-top: 0;
	}
	
	.u-card-wrap { 
		background-color: $u-bg-color;
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}
		
	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
