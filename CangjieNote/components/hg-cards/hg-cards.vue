<template>
	<view class="fc-main">
		<view class="fc-cards">
			<view @touchstart="playerTouchStart" @touchmove="playerTouchMove" @mousemove="playerTouchMove" @mouseup="playerTouchEnd"
			 @touchend="playerTouchEnd" class="fc-card" v-for="(item,index) in cards" :key='index' :style="[{transform: `rotate(${cards[index].rotate+((disTagV-1)*5)}deg) translate3d(${cards[index].translateX}, ${cards[index].translateY}, 0px)`},{'z-index':`${cards[index].zIndex}`}, 
          { transition: `transform ${cards[index].transitionTime}s ease 0s` },{opacity:`${cards[index].opacity}`},{background:white}]">
				<!-- <view class="fc-content">
					{{cardDatas[getIndex(index)].title}}
				</view> -->
        <view class="poem-content">
          <view class="poem-char" v-for="item in charList">
            <text :style="{
							fontSize: 40 + 'rpx',
							color: black
						}">{{item}}</text>
          </view>
        </view>
        
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "HCard",
		props: {
			cardDatas: {
				type: Array,
				default: []
			}
		},
    watch: {
      cardDatas: {
        handler: 'onCardDatasChange',
        deep: true
      }
    },
		data() {
			return {
        charList:[
        ],
				isClick: true,
				move: {
					startX: 0,
					startY: 0, // 触摸位置
					endX: 0,
					endY: 0, // 结束位置
					moveX: 0,
					moveY: 0, // 滑动时的位置
					disX: 0,
					disY: 0, // 移动距离
				},
				dataIndex: 0,
				currentIndex: 0, // 当前第一个的 index
				disTagV: 1, //拖动的控制值0-1 1代表100%

				cards: this.initCard()
			}
		},
		methods: {
      onCardDatasChange(n, o) {
        if (JSON.stringify(n) === '{}') return;
        console.log('n')
        console.log(n)
        let strList = this.sentenceSplit(n[this.currentIndex].content[0])
        console.log('strList')
        console.log(strList)
        // strList = strList.split('。')
        // strList = strList.split('，')
        // strList = strList.split('？')
        // strList = strList.split('！')
        this.charList = strList.split('')

      },
      sentenceSplit(str){
        let finStr = str.split('。')
        return finStr[0]
      },
        
			initCard() {
				let cards = new Array();
				for (var x = 0; x < 4 && x < this.cardDatas.length; x++) {
					cards.push({
						translateX: 0,
						translateY: 0,
						opacity: 1,
            color: '#FFFFFF',
						// color:  this.cardDatas[x].color==undefined?'#FFFFFF':this.cardDatas[x].color,
						transitionTime: 0.3 + (0.03 * x),
						zIndex: 4 - x,
						rotate: 0 * (x),
					})
				}
        console.log(this.cardDatas)
				return cards;
			},
			getIndex(index) {
				if (this.cards[index].zIndex != this.cards.length) {
					if (this.currentIndex + 1 == this.cardDatas.length) {
						return 0;
					} else {
						return this.currentIndex + 1;
					}
				} else {
					return this.currentIndex
				}
			},
			playerTouchStart(ev) {
				ev = ev || event
				this.isClick = true
				// tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
				if (ev.touches.length === 1) {
					// 记录开始位置
					this.move.startY = ev.touches[0].clientY
					this.move.startX = ev.touches[0].clientX;
				}
			},
			playerTouchMove(ev) {
				ev = ev || event
				this.isClick = false
				if (ev.touches.length === 1) {
					this.move.endY = ev.touches[0].clientY
					this.move.endX = ev.touches[0].clientX;
					let item_0 = this.cards[this.dataIndex];
					item_0.translateX = this.move.endX - this.move.startX;
					item_0.translateY = this.move.endY - this.move.startY;
					let td = item_0.translateX * item_0.translateX + item_0.translateY * item_0.translateY;
					td = Math.sqrt(td);
					item_0.opacity =100 / td;
					this.disTagV = item_0.opacity <= 1 ? item_0.opacity : 1;
					item_0.translateX = item_0.translateX + 'px';
					item_0.translateY = item_0.translateY + 'px';
				}
			},
			playerTouchEnd(ev) {
				ev = ev || event
				this.isClick = false
				let item_0 = this.cards[this.dataIndex];
				if (item_0.opacity < 0.5) {
					if (this.currentIndex < this.cardDatas.length - 1) {
						this.currentIndex++;
					} else {
						this.currentIndex = 0;
					}
					if (this.dataIndex < this.cards.length - 1) {
						this.dataIndex++;
					} else {
						this.dataIndex = 0;
					}
					for (var x = 0; x < this.cards.length; x++) {
						var i = x,l=x;
						if (this.dataIndex + x < this.cards.length) {
							i = this.dataIndex + x;
						} else {
							i = this.dataIndex + x - this.cards.length;
						}

						if (this.currentIndex + x < this.cardDatas.length) {
							l = this.currentIndex + x;
						} else {
							l= this.currentIndex + x - this.cardDatas.length;
						}
						
						this.cards[i].translateX = 0;
						this.cards[i].translateY = 0;
						// this.cards[i].color = this.cardDatas[l].color==undefined?'#FFFFFF':this.cardDatas[l].color;
						this.cards[i].opacity = 1;
						this.cards[i].transitionTime = 0.3 + (0.03 * x);
						this.cards[i].zIndex = 4 - x;
						this.cards[i].rotate = 0 * (x);
					}

					this.disTagV = 1;
          if(this.currentIndex>=this.cardDatas.length-2){
            console.log('加数据')
            this.$emit("routerChange");
            // console.log(this.cardDatas.length)
          }
          console.log(this.cardDatas.length)
					console.log(this.currentIndex)
          // sentenceSplit(n[this.currentIndex].content[0])
          this.charList = this.sentenceSplit(this.cardDatas[this.currentIndex].content[0]).split('')
				} else {
					item_0.translateX = 0;
					item_0.translateY = 0;
					item_0.opacity = 1;
					this.disTagV = 1;
				}

			},
		}
	}
</script>

<style lang="scss">
  
  .poem-content{
    float: right;
    margin: 30rpx;
  }
  
  .poem-zi{
    font-size: 40;
  }
  
  .poem-char{
    flex-direction:column;
    width: 80rpx;
    // background-color: pink;
    font-size: 40;
    margin: 10rpx;
  }
  
	.fc-main {
		padding-top: 90rpx;
		width: 100%;
		height: 100%;
		background: #FFFFFF;

		.fc-cards {
			margin-left: 50rpx;

			.fc-card {
				position: absolute;
				width: 600rpx;
				height: 1000rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				box-shadow: 0rpx 0rpx 80rpx rgba(0, 0, 0, 0.1);
				transform-origin: bottom right;

				.fc-content {
					margin: 30rpx;
				}
			}
		}
	}
</style>
