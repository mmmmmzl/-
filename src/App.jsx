//这是项目的根组件
import React from 'react'

//导入路由组件
import {HashRouter,Route,Link} from 'react-router-dom'

//导入需要的Ant Design 组件
// import { Layout, Menu, Breadcrumb } from 'antd'
import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout

//导入模块化的样式
//使用 styles 来接收，在下面通过 styles.样式 的方法来使用
import styles from './css/app.scss'

//导入路由相关的组件页面
import DetailContainer from './components/detail/DatailContainer.jsx'
import HomeContainer from './components/home/HomeContainer.jsx'
import MoviesContainer from './components/movies/MoviesContainer.jsx'


export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

componentWillMount(){
        // console.log(window.location.hash)
    }

    render(){
        return <HashRouter>
            {/*HashRouter不占元素，只是一个空节点*/}
            <Layout className="layout" style={{height:'100%'}}>
                <Header>
                    <div className={styles.logo} />
                    {/*注意这个地方 defaultSelectedKeys 有很多新的东西，写过一遍就别再忘了！！！多来看看，理解透彻！*/}
                    {/*实现一打开项目，自动选中 '首页' 的功能*/}
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[window.location.hash.split('/')[1] || 'home']} style={{ lineHeight: '64px' }}>
                        {/*这里的 to 的作用是，在点击这个Link 标签时，地址栏 # 的后边就会出现相应的 /home或 /movies ，只要在网站中使用了 HashRouter 标签，地址栏中就会出现 # */}
                        <Menu.Item key="home"><Link to="/home">首页</Link></Menu.Item>
                        <Menu.Item key="movies"><Link to="/movies/in_theaters/2">电影</Link></Menu.Item>
                        <Menu.Item key="detail"><Link to="/detail">关于</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <div style={{ background: '#fff', minHeight: 280, height:'100%' }}>
                        {/*path在这里可理解为监听的意思 监听上面Link 标签在 # 后面添加的字符，如果和 path 一致，就展示 component 中相应的组件*/}
                        <Route path="/home" component={HomeContainer}></Route>
                        {/*这里使用路由的精确匹配模式，实现在项目刚开始的时候，即 window.location.hash 等于 #/ 的时候，成功打开 HomeContainer 组件*/}
                        <Route path="/" component={HomeContainer} exact></Route>
                        <Route path="/movies/:type/:page" component={MoviesContainer}></Route>
                        <Route path="/detail" component={DetailContainer}></Route>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>豆瓣接口电影列表 ©2019 Created by xiao ma</Footer>
            </Layout>
            </HashRouter>
    }
}
