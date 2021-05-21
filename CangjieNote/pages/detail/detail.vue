 <template>
  <view class="">
    <poem-card-game :poem="poem" :thumb="false"></poem-card-game>
    <u-line></u-line>
    <view class="menu" :class="{active:menuFlag}">
      <image src="../../static/navi.svg" class="menuTrigger" @tap="clickMenu"></image>
      <image src="../../static/home.svg" class="menuItem menuItem1" @tap="toHome"></image>
      <image src="../../static/user.svg" class="menuItem menuItem3" @tap="toUser"></image>
    </view>
  </view>
</template>
 
 <script>
import poemCardGame from "../../public-components/poem-card-game.vue";
import comment from "../../public-components/comment.vue";
export default {
  data() {
    return {
      mask: false,
      menuFlag: false,
      poem: null,
      ok: false,
      current: 0,
      show: true,
      bgColor: "#ffffff",
      borderTop: false,
      list: [
      ],
      midButton: true,
      inactiveColor: "#909399",
      activeColor: "#5098FF",
    };
  },
  components: {
    comment,
    poemCardGame,
  },
  methods:{
    clickMenu(){
    	this.menuFlag = !this.menuFlag;
    },
    toUser(){
      this.$u.route({
        url: "/pages/user/user",
        animationType: "slide-in-bottom",
      });
    },
    toHome(){
    	this.$u.route({
    	  url: "/pages/main/main",
    	  animationType: "slide-in-bottom",
    	});
    },
  },
  onLoad(options) {
    let poemId = options.id;
    let that = this;
    // 通过poemId从后端获取诗
    // 传递给[this.poem]
	console.log('正在获取中，请等待');
    wx.cloud.callFunction({
      name: "getPoemUseId",
      data: {
        poemid: poemId,
      },
      success: function (res) {
        that.poem = res.result.data;
      },
      fail: function (error) {
        console.log("error:", error);
      },
    });
  },
};
</script>
 
<style scoped lang="scss">
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
    background-color:rgba(102, 175, 123, 0.2);
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
 