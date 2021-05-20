 <template>
  <view class="">
    <poem-card-game :poem="poem" :thumb="false"></poem-card-game>
    <u-line></u-line>
  </view>
</template>
 
 <script>
import poemCardGame from "../../public-components/poem-card-game.vue";
import comment from "../../public-components/comment.vue";
export default {
  data() {
    return {
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
</style>
 