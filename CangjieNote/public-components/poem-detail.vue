<template>
	<view class="poem-content demo-layout" @click="openGame()">
		<p>这是一首故事</p>
	</view>
</template>

<script>
	export default{
		methods:{
			openGame(){
				this.$u.route({
				  url: '/pages/game/game',
				  animationType: 'slide-in-bottom'
				})
			}
		}
	}
	
</script>

<style scoped lang="scss">

</style>