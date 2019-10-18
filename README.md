创建一个文件 .babelrc 里面放 babel 的配置文件，一般放在项目的根目录中，注意 . 别丢了
其次，注意 .babelrc 文件是 json 类型的，所以要符合 json 的语法规则，不能写单引号，不能写注释
在 .babelrc 中有两个节点，都是数组类型    presets[] 里面放所有的语法    plugins[] 里面放所有的插件

#在 react 中启用 jsx 语法，可分为三步：   
    1.装包
        cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
        cnpm i babel-preset-env babel-preset-stage-0 babel-preset-react -D 
    2.在 webpack.config.js 中配置 modules
    3.在 .babelrc 中配置 babel 的相关配置

-S  -D  path



注意：项目中的 @ 符号，表示项目根目录中的 src 这一层目录，其实 @ 是路径的别名，配置了哪个就代表哪个，只不过，常用配置 @ = src 而已
    配置 webpack 设置根目录
        在 webpack.config.js 的 resolve 节点下，设置 alias(别名)  



#在项目中使用 React
    1.装包
        运行 cnpm i react react-dom -S
    2.在 index.html 页面中创建容器
    3.导入包
    4.创建虚拟DOM元素
    5.渲染
