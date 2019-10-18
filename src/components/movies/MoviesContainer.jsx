//这是项目的根组件
import React from 'react'
//导入路由相关的组件，可以不用导入 HashRouter 了，因为在一个网站中只需要使用一次就够了
import {Route,Link,Switch} from 'react-router-dom'

import MoviesList from './MoviesList.jsx'
import MoviesDetail from './MoviesDetail.jsx'

import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class MoviesContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentWillMount(){
        // console.log(window.location.hash.split('/')[2])
    }

    render(){
        return<Layout style={{height:'100%'}}>
            <Sider width={200} style={{ background: '#fff',height:'100%'}}>
                <Menu mode="inline" defaultSelectedKeys={[window.location.hash.split('/')[2] || 'in_theaters']} style={{ height: '100%', borderRight: 0 }}>
                    {/*注意这里使用的 key 属性，要去弄明白，一直都没搞懂！*/}
                    <Menu.Item key='in_theaters'>
                        <Link to="/movies/in_theaters/1">正在热映</Link>
                    </Menu.Item>
                    <Menu.Item key="coming_soon">
                        <Link to="/movies/coming_soon/1">即将上映</Link>
                    </Menu.Item>
                    <Menu.Item key="top250">
                        <Link to="/movies/top250/1">Top250</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ paddingLeft:'2px',height:'100%'}}>
                <Content style={{background: '#fff', padding: 10, margin: 0, minHeight: 280,}}>
                    {/*在匹配路由规则的时候，这里提供了两个参数*/}
                    {/*如果想要从路由规则中 提取参数 ，需要使用 this.props.match.params 来获取*/}
                    {/*当多个 Link 共用一个视图组件的时候，path 要用参数的方式接收*/}
                    <Switch>
                        {/*注意这里由于React路由时模糊匹配，所以，当点击详情页的时候，会一起匹配到以下两个路由规则，即使用了精确匹配也无法解决（我也不知道为啥）
                        所以，这里就使用了路由中的 Switch 组件 作用跟 JS （switch/case）的类似，就是，能够指定，如果前面的路由规则优先匹配到了，则放弃匹配后续的路由*/}
                        <Route path="/movies/detail/:id" component={MoviesDetail}></Route>
                        <Route path="/movies/:type/:page" component={MoviesList}></Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    }
}
