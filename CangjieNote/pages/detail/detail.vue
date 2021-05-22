 <template>
  <view class="">
    <poem-card-game :poem="poem" :thumb="false"></poem-card-game>
    <u-line></u-line>
    <u-subsection
      :list="[{ name: '赏析' }, { name: '译文' }, { name: '注释' }]"
      :current="current"
      @change="sectionChange"
    ></u-subsection>
    <p class="analysis" v-if="current === 0">
      {{ shangxi }}
    </p>
    <p class="analysis" v-else-if="current === 1">{{ fanyi }}</p>
    <view class="analysis" v-else>
      <view v-if="zhushi.length === 1">
        <p>{{ zhushi }}</p>
      </view>
      <view v-else>
        <ol v-for="(item, index) in zhushi" :key="item">
          <li>{{ index + "." + item }}</li>
        </ol>
      </view>
    </view>
    <view class="menu" :class="{ active: menuFlag }">
      <image
        src="../../static/navi.svg"
        class="menuTrigger"
        @tap="clickMenu"
      ></image>
      <image
        src="../../static/home.svg"
        class="menuItem menuItem1"
        @tap="toHome"
      ></image>
      <image
        src="../../static/user.svg"
        class="menuItem menuItem3"
        @tap="toUser"
      ></image>
    </view>
  </view>
</template>
 
 <script>
import poemCardGame from "../../public-components/poem-card-game.vue";
import comment from "../../public-components/comment.vue";
export default {
  data() {
    return {
      menuFlag: false,
      poem: null,
      shangxi: "加载中...",
      fanyi: "加载中...",
      zhushi: ["加载中..."],
      current: 0,
      borderTop: false,
      midButton: true,
    };
  },
  components: {
    comment,
    poemCardGame,
  },
  methods: {
    sectionChange(current) {
      this.current = current;
    },
    clickMenu() {
      this.menuFlag = !this.menuFlag;
    },
    toUser() {
      uni.reLaunch({
        url: "/pages/user/user",
      });
    },
    toHome() {
      uni.reLaunch({
        url: "/pages/main/main",
      });
    },
  },
  onLoad(options) {
    let poemid = options.id;
    let that = this;
    // 通过poemId从后端获取诗
    // 传递给[this.poem]
    console.log("正在获取中，请等待");
    // 通过poemId从后端获取诗和解析
    // 传递给[this.poem]和[this.analysis]
    wx.cloud.callFunction({
      name: "getPoemUseId",
      data: {
        poemid: poemid,
      },
      success: function (res) {
        that.poem = res.result.data;
      },
      fail: function (error) {
        console.log("error:", error);
      },
    });
    wx.cloud.callFunction({
      name: "getPoetryComments",
      data: {
        poemid: poemid,
      },
      success: function (res) {
        let analysis = res.result.data;
        if (analysis === null) {
          that.shangxi = "暂无赏析";
          that.fanyi = "暂无翻译";
          that.zhushi = ["暂无注释"];
          return;
        }
        let shangxi = analysis.shangxi[0];
        shangxi = shangxi.split(/[\u3000\u25b2]/);
        shangxi.pop();
        shangxi.shift();
        let tmpShangxi = [];
        for (let i = 0; i < shangxi.length; i++) {
          if (shangxi[i] !== "") {
            shangxi[i] = shangxi[i].replace("\n", "");
            shangxi[i] = "\u3000" + shangxi[i];
            tmpShangxi.push(shangxi[i]);
          }
        }
        that.shangxi = tmpShangxi;
        that.zhushi = analysis.zhushi[0];
        that.fanyi = "\u3000" + analysis.fanyi;
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
  background-color: rgba(102, 175, 123, 0.2);
  border-radius: 50%;
  padding: 20rpx;
  cursor: pointer;
  transition: 0.35s ease;
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
  box-shadow: 0 0 5rpx 1rpx rgba(0, 0, 0, 0.05);
  z-index: -1000;
  opacity: 0;
}

.menuItem1 {
  transition: 0.35s ease;
}

.menuItem2 {
  transition: 0.35s ease 0.1s;
}

.menuItem3 {
  transition: 0.35s ease 0.2s;
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

.analysis {
  margin: 20rpx;
  white-space: pre-wrap;
}
</style>
 