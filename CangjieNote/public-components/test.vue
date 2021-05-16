<template>
	<view>
		<p>这是一个测试云函数的文件</p>
	</view>
</template>

<script>
	export default{
		mounted:{
			getPoemFromId(){
				wx.cloud.callFunction({
					name:'poemGetFromId',
					data:{
						poemId:1,
					},
					success:function(res){
						console.log(res.result);
					}
				})
			}
		}
	}
</script>

<style>
</style>
