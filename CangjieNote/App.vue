<script>
	export default {
		// 此处globalData为了演示其作用，不是uView框架的一部分
		globalData: {
			username: '白居易'
		},
    onLoad() {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）    
        //env: '你的环境ID',
        env: 'cloud0-backend-7gnbnkiz459f6b99',
        traceUser: true,
      })
    },
		onLaunch() {
			// 1.1.0版本之前关于http拦截器代码，已平滑移动到/common/http.interceptor.js中
			// 注意，需要在/main.js中实例化Vue之后引入如下(详见文档说明)：
			// import httpInterceptor from '@/common/http.interceptor.js'
			// Vue.use(httpInterceptor, app)
			// process.env.VUE_APP_PLATFORM 为通过js判断平台名称的方法，结果分别如下：
			/**
			 * h5，app-plus(nvue下也为app-plus)，mp-weixin，mp-alipay......
			 */
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "common/demo.scss";
</style>