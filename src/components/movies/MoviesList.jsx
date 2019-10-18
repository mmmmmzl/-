//这是项目的根组件
import React from 'react'

//导入Ant Design 组件
import { Spin, Alert,Pagination } from 'antd';

//导入 fetch-jsonp
import fetchJSONP from 'fetch-jsonp'

//导入电影列表组件
import MoviesItem from './MoviesItem.jsx'

export default class MoviesList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movies:[],  //电影列表
            nowPage:parseInt(props.match.params.page) || 1,  //当前展示第几页的数据
            pageSize:12,  //每页显示多少条数据
            total:0,  //当前电影分类下共有多少条数据
            isloading:true,  //数据是否正在加载，如果为 true ，则表示正在加载
            moviesType: props.match.params.type,  //保存一下，要获取的电影的类型
        }
    }

componentWillMount(){
        //使用定时器来模拟网络请求，两者本质上都是异步的，所以可以实现一样的效果，网络请求一般都写在生命周期函数里面，以实现在页面加载的时候就发送网络请求
        // setTimeout(() =>{
        //     this.setState({
        //         isloading:false
        //     })
        // },1000)
    this.loadMoviesListByTypeAndPage()
    // console.log(this.props)
}

//因为我们在项目中，是三个选项卡共用一个视图组件，又由于 前端路由 的特性，所以，在一个视图界面里切换另一个视图的时候，并不会再次执行代码，
//也不会再次发起网络请求，所以，就无法更新数据。因此需要通过 componentWillReceiveProps 这个生命周期函数，来监听地址栏的变化，每当地址栏发生变化，重置 state 参数
//然后通过 回调函数 重新发起网络请求，达到重新更新页面的作用。还有一个解决办法就是，不要共用视图组件，直接写三个组件
//这样，在切换选项卡的时候，就会有相对应的组件，分别进行相应的网络请求，但是这两种方法的本质是一样的，就是再次执行代码，再次发起网络请求，再次页面渲染
componentWillReceiveProps(nextProps){
        // console.log(nextProps.match)
        // console.log(window.location.hash)
        //每当地址栏变化的时候，重置 state 中的参数项，重置完毕之后，我们可以重新发起数据请求了
        this.setState({
            isloading:true, //又要重新加载电影数据了
            nowPage: parseInt(nextProps.match.params.page) || 1, //要获取第几页的数据
            moviesType: nextProps.match.params.type //电影类型
        },function(){
            this.loadMoviesListByTypeAndPage() //注意这里有一个回调函数！
        })
}

    //这种写法要记住。以后会常用到
    render(){
        return<div>
            {this.renderList()}
        </div>

    }

    //根据电影的类型和电影页码获取电影的数据
    loadMoviesListByTypeAndPage= ()=>{
        //数据的开始项（索引号）
        const start = this.state.pageSize*(this.state.nowPage-1)
        //模板字符串，注意是反引号，不是单引号，最简单的应用就是 拼接字符串
        const url = `https://douban.uieee.com/v2/movie/${this.state.moviesType}?start=${start}&count=${this.state.pageSize}`
        //注意，默认的 window.fetch 会受到跨域限制，无法直接使用，这时候，我们使用第三方包 fetch-jsonp 来发送 JSONP 请求，它的用法，和浏览器内置的 fetch 完全兼容(相同)
        //fetch 是基于 Promise 封装的网络请求 API 当使用 fetch 获取数据的时候，第一个 .then 中是获取不到数据的，它拿到的是一个 Response 对象，我们可以调用 response.json()
        //得到一个新的 promise 对象，然后再调用 .then 方法，就跟 promise 的使用方法是一样的。然后我们就可以在第二个 .then 中获得数据
        // fetch('http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a')
        //     .then(response => {
        //         return response.json()
        //     })
        //     .then(data => {
        //         console.log(data)
        //     })
        fetchJSONP(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({
                    isloading:false,
                    movies:data.subjects,
                    total:data.total
                })
            })
        // const data = require('../test_data/in_theaters.json')
        // setTimeout(() => {
        //     this.setState({
        //         isloading:false,
        //         movies:data.subjects,
        //         total:data.total
        //     })
        // },1000)
    //     setTimeout(() => {
    //         this.setState({
    //             isloading:false
    //         })
    //     },1000)
    }

    renderList= () =>{
        if(this.state.isloading){
            //切记这里的 return ，多理解一下
            return <Spin tip="Loading...">
                <Alert
                message="正在加载电影列表"
                description="精彩内容马上呈现...."
                type="info"
                />
            </Spin>
        }
        else{
            return <div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        {this.state.movies.map(item => {
                            return <MoviesItem {...item} key={item.id} history={this.props.history}></MoviesItem>
                        })}
                    </div>
                <Pagination defaultCurrent={this.state.nowPage} total={this.state.total} pageSize={this.state.pageSize} onChange={this.pageChanged}/>
            </div>
        }
    }

    //为 分页 绑定功能，当页码改变的时候，加载新一页的数据
    pageChanged= (page) =>{
        //由于我们手动使用 BOM 对象实现跳转，但是这种方式并不好。最好使用 路由 的方法，进行 编程式导航
        // window.location.href=`/#/movies/${this.state.moviesType}/${page}`

        // console.log(this.props)
        //使用 react-router-dom 实现编程式导航
        this.props.history.push(`/movies/${this.state.moviesType}/${page}`)
    }
}

// 在 React 中，我们可以使用 fetch API 来获取数据，fetch API 是基于 Promise 封装的
