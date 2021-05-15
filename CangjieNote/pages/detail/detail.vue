<template>
	<view>
		detail
    <u-button @click="toGame">game</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
      toGame () {
        this.$u.route({
          url: '/pages/game/game',
          animationType: 'slide-in-bottom'
        })
      }
			
		}
	}
</script>

<style>

</style>
