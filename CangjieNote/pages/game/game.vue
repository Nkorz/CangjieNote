<template>
  <view>
    <view class="gameArea">
      <game-area :poemStr="poemStr" :charSplit="charSplit" ref="canvasRef" id="canvas-drag" :graph="graph"
        @updatePoemStr="updatePoemStr" width="700" height="750" enableUndo="true"></game-area>
    </view>
    {{poemStr}}
    <br />
    {{shuffleStr}}
    <!--    <view class="btn" @tap="onAddImage">添加图片</view>
    <view class="btn" @tap="onAddTest">添加测试图片</view>
    <view class="btn" @tap="onAddText('kkk',30,30)">添加文字</view>
    <view class="btn" @tap="onExport">导出图片</view>
    <view class="btn" @tap="onChangeColor">改变文字颜色</view>
    <view class="btn" @tap="onChangeBgColor">改变背景颜色</view>
    <view class="btn" @tap="onChangeBgImage">改变背景照片</view>
    <view class="btn" @tap="onExportJSON">导出模板</view>
    <view class="btn" @tap="onImport">导入默认模板</view>
    <view class="btn" @tap="onClearCanvas">清空画布</view>
    <view class="btn" @tap="onUndo">后退</view> -->
  </view>
</template>

<script>
  import gameArea from "../../public-components/game-area.vue";
  export default {
    data() {
      return {
        count: 0,
        poemStr: '',
        mShuffleIndex: [],
        shuffleStrArr: [],
        graph: {
          list: []
        },
        canvasBg: "",
        shuffleStr: '',
        charSplit: {
          str: '',
          list: []
        }
      }
    },
    onLoad(options) {
      let poemStr = options.str;
      let that = this;
      that.poemStr = poemStr;
      // poemStr = this.randomCharSetter(poemStr);
      // let shuffleStr = this.shuffle(poemStr.split('')).join('').slice(0, 4)
      let shuffleIndex = this.shuffleIndex(poemStr).slice(0, 4);
      this.mShuffleIndex = shuffleIndex;
      let shuffleStr = [];
      for (var i = 0; i < 4; ++i) {
        shuffleStr.push(poemStr.charAt(shuffleIndex[i]));
      }
      shuffleStr = shuffleStr.join('');
      this.shuffleStr = shuffleStr;
      this.charSplit.str = shuffleStr;
      console.log(shuffleStr)
      console.log(poemStr)
      wx.cloud.callFunction({
        name: "gameInit",
        data: {
          sentence: shuffleStr,
        },
        success: function(res) {
          that.charSplit.list = res.result.data;
          that.shuffleStrArr = res.result.shuffle_str;
          for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < that.shuffleStrArr.length;) {
              if (that.shuffleStrArr[j] == -1) {
                that.shuffleStrArr.splice(j, 1);
                continue;
              } 
              if (that.shuffleStrArr[j] == poemStr.charAt(shuffleIndex[i])) {
                that.poemStr = that.replaceStr(that.poemStr, shuffleIndex[i], '_');
                break;
              }
              ++j;
            }
          }
          console.log(res.result)
          that.graph.str = shuffleStr;
          that.graph.charSplit = res.result.data;
          for (let i = 0; i < that.charSplit.list.length; ++i) {
            let x = 275 * Math.random()
            let y = 280 * Math.random()
            // console.log(that.charSplit.list[i].char)
            that.onAddText(that.charSplit.list[i].char,
              that.charSplit.list[i].ans,
              that.charSplit.list[i].count,
              x,
              y)
          }
          // that.poemId = res.result.data;
        },
        fail: function(error) {
          console.log("error:", error);
        },
      });
    },
    components: {
      gameArea
    },
    methods: {
      replaceStr(str, index, char) {
        const strAry = str.split('');
        strAry[index] = char;
        return strAry.join('');
      },
      updatePoemStr(shuffleStrIndex) {
        console.log("in updatePoemStr", shuffleStrIndex, this.mShuffleIndex[shuffleStrIndex], this.shuffleStr.charAt(
          shuffleStrIndex));
        this.poemStr = this.replaceStr(this.poemStr,
          this.mShuffleIndex[shuffleStrIndex],
          this.shuffleStr.charAt(shuffleStrIndex));
        this.count++;
        if (this.count >= this.shuffleStrArr.length) {
          uni.showToast({
            title: '你真棒！',
            duration: 2000
          });
        }
      },
      randomCharSetter(str) {
        str = str.replaceAll('。', '')
        str = str.replaceAll('，', '')
        str = str.replaceAll(',', '')
        str = str.replaceAll('！', '')
        str = str.replaceAll('？', '')
        let strList = str.split('')
        strList = new Set(strList)
        str = [...strList].join('')
        console.log(strList)
        // str=str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"");
        // console.log(str);
        return str;
      },
      shuffle(arr) {
        let temp, length = arr.length;
        let res = [];
        for (let i = 0; i < length; i++) res.push(i);
        for (let i = 0; i < length - 1; i++) {
          let index = Math.floor(Math.random() * (length--));
          temp = arr[index];
          arr[index] = arr[length];
          arr[length] = temp;

          // temp_idx = res[index];
          // res[index] = res[length];
          // res[length] = temp_idx;
        }
        return res;
      },
      isOKchar(char) {
        return (char != "，") &&
          (char != "。") &&
          (char != "！") &&
          (char != ",") &&
          (char != "？") &&
          (char != "之");
      },
      shuffleIndex(str) {
        let res = [],
          tempArr = [];
        str = str.split('');
        for (let i = 0; i < str.length; ++i) {
          tempArr.push(i);
        }
        for (let i = 0; i < 4;) {
          let index = Math.floor(Math.random() * (str.length));
          if (this.isOKchar(str[index])) {
            res.push(tempArr[index]);
            ++i;
          }
          str.splice(index, 1);
          tempArr.splice(index, 1);
        }
        return res;
      },
      /**
       * 添加测试图片
       */
      onAddTest() {
        this.graph.list.push({
          w: 120,
          h: 120,
          type: 'image',
          url: "/static/assets/images/test.png"
        })
        // this.setData({
        //   graph: {
        //     w: 120,
        //     h: 120,
        //     type: 'image',
        //     url: "/static/assets/images/test.jpg"
        //   }
        // });
      },

      /**
       * 添加图片
       */
      onAddImage() {
        const that = this;
        wx.chooseImage({
          success: res => {
            that.graph = {
              w: 200,
              h: 200,
              type: 'image',
              url: res.tempFilePaths[0]
            }
            // this.setData({
            //   graph: {
            //     w: 200,
            //     h: 200,
            //     type: 'image',
            //     url: res.tempFilePaths[0]
            //   }
            // });
          }
        });
      },

      /**
       * 添加文本
       */
      onAddText(char, aId, aCount, ranX, ranY) {
        this.graph.list.push({
          type: 'text',
          text: char,
          x: ranX,
          y: ranY,
          ansId: aId,
          ansCount: aCount
        });
        // this.setData({
        //   graph: {
        //     type: 'text',
        //     text: 'helloworld'
        //   }
        // });
      },

      /**
       * 导出图片
       */
      onExport() {
        this.$refs.canvasRef.export().then(filePath => {
          console.log(filePath);
          wx.previewImage({
            urls: [filePath]
          });
        }).catch(e => {
          console.error(e);
        });
      },

      /**
       * 改变文字颜色
       */
      onChangeColor() {
        this.$refs.canvasRef.changColor('blue');
      },

      /**
       * 改变背景颜色
       */
      onChangeBgColor() {
        this.$refs.canvasRef.changeBgColor('yellow');
      },

      /**
       * 改变背景照片
       */
      onChangeBgImage() {
        this.$refs.canvasRef.changeBgImage("/static/assets/images/test.jpg")
      },

      /**
       * 导出当前画布为模板
       */
      onExportJSON() {
        this.$refs.canvasRef.exportFun().then(imgArr => {
          console.log(JSON.stringify(imgArr));
        }).catch(e => {
          console.error(e);
        });
      },

      onImport() {
        // 有背景
        // let temp_theme = [{"type":"bgColor","color":"yellow"},{"type":"image","url":"../../assets/images/test.jpg","y":98.78423143832424,"x":143.78423143832424,"w":104.43153712335152,"h":104.43153712335152,"rotate":-12.58027482265038,"sourceId":null},{"type":"text","text":"helloworld","color":"blue","fontSize":24.875030530031438,"y":242.56248473498428,"x":119.57012176513672,"w":116.73966979980469,"h":34.87503053003144,"rotate":8.873370699754087}];
        // 无背景
        let temp_theme = [{
          "type": "image",
          "url": "/static/assets/images/test.jpg",
          "y": 103,
          "x": 91,
          "w": 120,
          "h": 120,
          "rotate": 0,
          "sourceId": null
        }, {
          "type": "text",
          "text": "helloworld",
          "color": "blue",
          "fontSize": 20,
          "y": 243,
          "x": 97,
          "rotate": 0
        }];
        this.$refs.canvasRef.initByArr(temp_theme);
      },

      onClearCanvas: function(event) {
        let _this = this;
        _this.canvasBg = null;
        // _this.setData({
        //   canvasBg: null
        // });

        this.$refs.canvasRef.clearCanvas();
      },
      onUndo: function(event) {
        this.$refs.canvasRef.undo();
      }
    }

  }
</script>

<style>
  .gameArea {
    margin: 20rpx;
    padding: 10rpx;
    background-color: #7ab598;
  }

  .btn {
    padding: 10rpx 20rpx;
    float: left;
    margin: 10rpx;
    border: solid 1px #dfdfdf;
    border-radius: 10rpx;
  }
</style>
