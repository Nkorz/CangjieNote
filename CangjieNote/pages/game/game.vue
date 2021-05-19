<template>
  <view>
    {{poemStr}}
  </view>
</template>

<script>
  export default {
    data() {
      return {
        poemStr:''

      }
    },
    methods: {
      onLoad(options) {
        let poemStr = options.str;
        let that = this;
        that.poemStr=poemStr;
        poemStr='关关雎鸠'
        console.log(poemStr)
        wx.cloud.callFunction({
          name: "gameInit",
          data: {
            sentence: poemStr,
          },
          success: function(res) {
            console.log(res)
            // that.poemId = res.result.data;
          },
          fail: function(error) {
            console.log("error:", error);
          },
        });
      },

    }
  }
</script>

<style>

</style>
