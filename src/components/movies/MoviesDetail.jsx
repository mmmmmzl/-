import React from 'react'

import {Button,Icon,Spin, Alert} from 'antd'

import fetchJSONP from 'fetch-jsonp'

export default class MoviesDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            //这个用法就是运用 JS 代码的执行顺序来为某种情况增加判断条件
            isloading:true,
            detail:{}
        }
    }

    componentWillMount(){
        fetchJSONP(`https://douban.uieee.com/v2/movie/subject/${this.props.match.params.id}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.setState({
                    detail: data,
                    isloading:false
                })
            })
    }

    render(){
        return<div>
            <Button type="primary" onClick={this.goBack}>
                <Icon type="left" />返回电影列表页面
            </Button>
            {this.renderDetail()}
        </div>
    }

    //实现返回按钮的功能
    goBack = () => {
        this.props.history.go(-1)
    }

    renderDetail = () => {
        if (this.state.isloading){
            return <Spin tip="Loading...">
                <Alert
                    message="正在加载电影详情"
                    description="精彩内容马上呈现...."
                    type="info"
                />
            </Spin>
        }else{
            return <div style={{textAlign:'center'}}>
                <h1>{this.state.detail.title}</h1>
                <img src={this.state.detail.images.large} />
                <p style={{textIndent:'2em',lineHeight:'30px'}}>{this.state.detail.summary}</p>
            </div>
        }
    }
}
