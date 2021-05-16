 <template>
  <view class="">
    <poem-card></poem-card>
	<u-line></u-line>
    <comment></comment>
  </view>
</template>
 
 <script>
	import poemCard from "../../public-components/poem-card.vue" 
	import comment from "../../public-components/comment.vue";
export default {
  data() {
    return {
      ok: false,
      current: 0,
      show: true,
      bgColor: "#ffffff",
      borderTop: false,
      list: [
        {
          iconPath: "home",
          selectedIconPath: "home-fill",
          text: "首页",
          count: 2,
          isDot: true,
          customIcon: false,
        },
        {
          iconPath: "photo",
          selectedIconPath: "photo-fill",
          text: "放映厅",
          customIcon: false,
        },
        {
          iconPath: "/static/uview/example/min_button.png",
          selectedIconPath: "/static/uview/example/min_button_select.png",
          text: "发布",
          midButton: true,
          customIcon: false,
        },
        {
          iconPath: "play-right",
          selectedIconPath: "play-right-fill",
          text: "直播",
          customIcon: false,
        },
        {
          iconPath: "account",
          selectedIconPath: "account-fill",
          text: "我的",
          count: 23,
          isDot: false,
          customIcon: false,
        },
      ],
      midButton: true,
      inactiveColor: "#909399",
      activeColor: "#5098FF",
    };
  },
  components: {
    comment,
	poemCard
  },
  methods: {
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
};
</script>
 
<style scoped lang="scss">

</style>
 