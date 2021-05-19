<script>
  export default {
    // 此处globalData为了演示其作用，不是uView框架的一部分
    globalData: {
      username: '白居易',
	  openid:''
    },
    onLoad() {},
    onLaunch() {
      // 1.1.0版本之前关于http拦截器代码，已平滑移动到/common/http.interceptor.js中
      // 注意，需要在/main.js中实例化Vue之后引入如下(详见文档说明)：
      // import httpInterceptor from '@/common/http.interceptor.js'
      // Vue.use(httpInterceptor, app)
      // process.env.VUE_APP_PLATFORM 为通过js判断平台名称的方法，结果分别如下：
      /**
       * h5，app-plus(nvue下也为app-plus)，mp-weixin，mp-alipay......
       */
      let that = this;
      /***** init cloud *****/
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）    
        //env: '你的环境ID',
        env: 'cloud0-backend-7gnbnkiz459f6b99',
        traceUser: true,
      });
      /***** login *****/
      // uni.getUserProfile({
      //   desc: '获取授权',
      //   success: (res) => {
      //     console.log("uni.getUserProfile success", res);
      //     wx.cloud.callFunction({
      //       name: "login",
      //       data: {
      //         cloudID: wx.cloud.CloudID(res.cloudID)
      //       }
      //     }).then(res => {
      //       console.log("call cloud func(login) success: ", res);
      //     }).catch(err => {
      //       console.log("call cloud func(login) fail: ", err);
      //     });
      //   },
      //   fail: (err) => {
      //     console.log("uni.getUserProfile fail", err);
      //   }
      // });
      // uni.getSetting({
      //   success: (res) => {
      //     console.log("uni.getSetting success", res);
      //     if (!res.authSetting['scope.userInfo']) {
      //       uni.authorize({
      //         scope: 'scope.userInfo',
      //         success: (res) => {
      //           console.log("uni.authorize success", res);
      //           that.login();
      //         },
      //         fail: (err) => {
      //           console.log("uni.authorize fail", err);
      //         }
      //       });
      //     } else {
      //       that.login();
      //     }
      //   },
      //   fail: (err) => {
      //     console.log("uni.getSetting fail", err);
      //   }
      // });
    },
    methods: {
      login: () => {
        uni.login({
          success: (res) => {
            console.log("uni.login success: ", res);
            uni.getUserInfo({
              success: (res) => {
                console.log("uni.getUserInfo success", res);
                wx.cloud.callFunction({
                  name: "login",
                  data: {
                    cloudID: wx.cloud.CloudID(res.cloudID)
                  }
                }).then(res => {
                  console.log("call cloud func(login) success: ", res);
                }).catch(err => {
                  console.log("call cloud func(login) fail: ", err);
                });
              },
              fail: (err) => {
                console.log("uni.getUserInfo fail", err);
              }
            });
          },
          fail: (err) => {
            console.log("uni.login fail: ", err);
          }
        });
      },
    }
  }
</script>

<style lang="scss">
  @import "uview-ui/index.scss";
  @import "common/demo.scss";
</style>
