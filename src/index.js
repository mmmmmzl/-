//这是项目的Js打包入口文件
import React from 'react'
import ReactDom from 'react-dom'


//导入项目的根组件
import App from './App.jsx'



ReactDom.render(<App></App>,document.getElementById('app'))
