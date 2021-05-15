const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			// 调试时允许内网穿透，让外网的人访问到本地调试的H5页面
			disableHostCheck: true
		},
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'cloudfunctions'),
                to: path.join(__dirname, 'unpackage/dist', process.env.NODE_ENV === 'development' ? 'dev' : 'build', process.env.UNI_PLATFORM, 'cloudfunctions')
            }
        ])
    ]
	},
	//productionSourceMap: false,
}
