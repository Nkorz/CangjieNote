<template>
  <view class="wrap">
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
  </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '课程首页',
        mode: 'circle',
        text: '', // 优先级比src高
        size: '90',
        list: [{
          groupName: 'icon也可以不要，瞎加的，就想试试',
          list: [{
            // path: '/pages/TeaClassList/TeaClassList',
            // icon: 'form',
            id: '0',
            title: '雎鸠',
            author: '诗经',
            content: [
              '关关雎鸠，在河之洲。窈窕淑女，君子好逑。',
              '关关雎鸠，在河之洲。窈窕淑女，君子好逑。',
            ]
          }, {
            // path: '/pages/TeaClassList/TeaClassList',
            // icon: 'form',
            id: 1,
            title: '葛覃',
            author: '诗经',
            content: [
              '关关雎鸠，在河之洲。窈窕淑女，君子好逑。',
              '关关雎鸠，在河之洲。窈窕淑女，君子好逑。',
            ]
          }, {
            // path: '/pages/TeaClassList/TeaClassList',
            // icon: 'form',
            id: 2,
            title: '卷耳',
            author: '诗经',
            content: [
              '关关雎鸠，在河之洲。窈窕淑女，君子好逑。',
              '关关雎鸠，在河之洲。窈窕淑女，君子好逑。',
            ]
          }, ]
        }]

      }
    },
    computed: {
      getIcon() {
        return path => {
          return 'https://cdn.uviewui.com/uview/example/' + path + '.png'
        }
      }
    },
    methods: {
      valueChange(index) {
      	this.value = index == 0 ? '' : '天山雪莲';
      },
      shapeChange(index) {
      	this.shape = index == 0 ? 'round' : 'square';
      },
      clearabledChange(index) {
      	this.clearabled = index == 0 ? true : false;
      },
      showActionChange(index) {
      	this.showAction = index == 0 ? true : false;
      },
      inputAlignChange(index) {
      	this.inputAlign = index == 0 ? 'left' : index == 1 ? 'center' : 'right';
      },
      change(value) {
      	// 搜索框内容变化时，会触发此事件，value值为输入框的内容
      	//console.log(value);
      },
      custom(value) {
      	//console.log(value);
      	this.$u.toast('输入值为：' + value)
      },
      search(value) {
      	this.$refs.uToast.show({
      		title: '搜索内容为：' + value,
      		type: 'success'
      	})
      },
      clear() {
      	// console.log(this.value);
      },
      toUser() {
        this.$u.route({
          url: '/pages/user/user',
          animationType: 'slide-in-bottom'
        })
      },
      toDetail() {
        this.$u.route({
          url: '/pages/detail/detail',
          animationType: 'slide-in-bottom'
        })
      }

    }
  }
</script>

<style scoped lang="scss">
  .wrap {
    padding: 30rpx;
  }

  .search {
    padding: 20rpx;
  }

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

  .u-cell-icon {
    height: 40rpx;
    width: 40rpx;
  }

  .addclass {
    display: inline-block;
  }

  .parent {
    display: inline-block
  }
</style>
