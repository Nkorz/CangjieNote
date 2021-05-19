 <template>
  <view class="">
    <poem-card-game :poem="poem" :thumb="false"></poem-card-game>
    <u-line></u-line>
    <!-- <comment></comment> -->
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
  methods: {
    // toGame(id) {
    //   console.log('sjdndf')
    //   this.$u.route({
    //     url: "/pages/game/game",
    //     animationType: "slide-in-bottom",
    //     params: { id: id },
    //   });
    // },
    beforeSwitch(index) {
      return true;
    },
    showChange(index) {
      this.show = !index;
    },
    bgColorChange(index) {
      if (index == 0) {
        this.activeColor = "#5098FF";
        this.inactiveColor = "#909399";
      }
      if (index == 1) {
        this.activeColor = "#D0D0D0";
        this.inactiveColor = "#5A5A5A";
      }
      this.bgColor = ["#ffffff", "#1f1f1d"][index];
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
    },
  },
  onLoad(options) {
    let poemId = options.id;
    let that = this;
    // 通过poemId从后端获取诗
    // 传递给[this.poem]
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
 