<template>
  <view  id='card'>
    <HCard :cardDatas='data' v-if='isrefresh' @routerChange="addData">
    </HCard>
  </view>
</template>

<script>
  const app = getApp();
  import HCard from "@/components/hg-cards/hg-cards.vue";
  export default {
    components: {
      HCard,
    },
    data() {
      return {
        isrefresh:true,
        data: [{
            name: '',
            color: '#aaff00'
          },
          {
            name: '',
            color: '#23ffde'
          },
          {
            name: '',
            color: '#78beff'
          },
          {
            name: '',
            color: '#d87dff'
          },
          {
            name: '',
            color: '#ffc39b'
          },
          {
            name: '',
            color: '#ffcef7'
          },
          {
            name: '',
            color: '#eaff9d'
          },
          {
            name: '',
            color: '#8c92ff'
          },
          {
            name: '',
            color: '#8c92ff'
          },
          {
            name: '',
            color: '#8c92ff'
          },
        ]
      }
    },
    onLoad() {
      wx.cloud.callFunction({
        name: 'login',
        success: res => {
          if (res) {
            app.globalData.openid = res.result.openid;
          }
        }
      });
    },
    onShow() {
      let that = this;
      wx.cloud.callFunction({
        // 云函数名称
        name: "poemCardView",
        // 传给云函数的参数
        data: {
          size: 10,
        },
        success: function(res) {
          // console.log(res.result)
          console.log(res.result.data); // 3
          that.data = res.result.data;
        },
        fail: console.error,
      });
      this.$forceUpdate();
    },
    methods: {
      addData(){
        let that = this;
        wx.cloud.callFunction({
          // 云函数名称
          name: "poemCardView",
          // 传给云函数的参数
          data: {
            size: 10,
          },
          success: function(res) {
            // console.log(res.result)
            console.log(res.result.data); // 3
            that.data = that.data.concat(res.result.data)
          },
          fail: console.error,
        });
      },
      clickMenu() {
        this.menuFlag = !this.menuFlag;
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
      // 下拉刷新数据列表
      refresh() {
        console.log('下拉')
        let goDownFreshList = []
        wx.cloud.callFunction({
          // 云函数名称
          name: "poemCardView",
          // 传给云函数的参数
          data: {
            size: 100,
          },
          success: function(res) {
            // console.log(res.result)
            // console.log(res.result.data); // 3
            goDownFreshList = res.result.data;
            console.log('goDownFreshList')
            console.log(goDownFreshList)
          },
          fail: console.error,
        });
        // 模拟请求成功后的回调
        setTimeout(() => {
          console.log('tim下拉')
          this.list = goDownFreshList
          this.$refs.loadRefresh.completed()
          // 1. list重新赋值，应避免 this.list = [] 这种操作
          // 2. 更新当前页码 currentPage
          // 3. 调用completed()方法 this.$refs.loadRefresh.completed()
        }, 800)
      },

    }
  }
</script>

<style lang="scss">

</style>
