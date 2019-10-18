const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //导入 在内存中自动生成 index 页面的插件

//创建一个插件的实例对象
const htmlplugin = new HtmlWebpackPlugin({
    template: path.join(__dirname,'./src/index.html'), //源文件
    filename:'index.html' //生成的内存中首页的名称
})


//向外暴露一个打包的配置对象  因为 webpack 是基于 Node 构建的，所以 webpack 支持所有的 Node Api 和语法
//webpack 默认只能打包处理 .js 后缀名类型的文件，像 .png .vue 无法主动处理，所以要配置第三发的 loader;这些配置都要放到 module 节点下
module.exports = {
    mode:'development', //development  production
    //在 webpack 4.x 中，有一个很大的特性，就是 约定大于配置 ，约定 默认的打包入口路径是 src -> index.js
    plugins:[
        htmlplugin
    ],
    //module 里面放的是所有 第三方模块(loader) 的配置规则
    module:{
        rules: [  // 第三方匹配规则
            //这里之所以要给 .js 文件加 loader 是因为要解析 jsx 语法，使用 babel-loader ，同时，切记 在配置 babel-loader 的时候，
            //一定要配置 exclude 排除项，否则项目跑不起来
            //test 以 $ 符号结尾
            {test:/\.js|jsx$/, use:'babel-loader',exclude:/node_modules/},
            {test: /\.css$/,use: ['style-loader','css-loader']},//意思是先用css-loader加载css文件，再用style-loader添加在页面中,loader 执行顺序是从右往左
            {test: /\.scss$/,use: ['style-loader','css-loader?modules','sass-loader']},
            {test: /\.json$/, use: 'json-loader'}
        ]
    },
    resolve:{
        extensions:['.js','jsx','.json'], //表示这几个文件的后缀名，可以省略不写，这个顺序好像不能更改，其次，如果不加 resolve 的话，默认是会自动补全 .js .json 的
        alias:{ //表示别名
            '@':path.join(__dirname,'./src')  //这样 @ 就表示 项目根目录中 src 这一层路径，这表示的是 绝对路径，从磁盘开始
        }
    }
}
