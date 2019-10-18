import React from 'react'

import styles from '../../css/moviesitem.scss'

import { Rate } from 'antd'

export default class MoviesItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return<div className={styles.box} onClick={this.goDetail}>
            <img src={this.props.images.small} className={styles.img}/>
            <h4>电影名称：{this.props.title}</h4>
            <h4>上映年份：{this.props.year}年</h4>
            <h4>电影类型：{this.props.genres.join('，')}</h4>
            {/*实现星星评分*/}
            <Rate disabled defaultValue={this.props.rating.average/2} />
        </div>
    }

    //跳转到详情页面，使用 函数式编程，是 react-router-dom 里面的方法，而不推荐使用 直接操作 BOM 的方法
    goDetail= () => {
        this.props.history.push(`/movies/detail/${this.props.id}`)
        // console.log(this.props.history)
}
}
