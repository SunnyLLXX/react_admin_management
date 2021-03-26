import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../assets/css/head.css'
import formateDate from '../../util/dateUtil'
import currentUser from '../../util/currentUser'
import storageUtil from '../../util/storageUtil'
// import reqWeather from '../../serviceAPI/head'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../LinkButton/LinkButton'

class Head extends Component {
    
    state = {
        currentTime: formateDate(Date.now()), // 当前时间字符串
        dayPictureUrl: '', //天气图片
        weather: '' //天气文本
    }
    getCurrentTime = () => {
        //每隔1s获取时间，并更新当前数据
        this.interval = setInterval(() => {
            const currenttime = formateDate(Date.now())
            this.setState({
                currentTime:currenttime
            })
        },1000)
    }
    // getWeather = async () => {
    //     //获取当前天气
    //     const {dayPictureUrl,weather} = await reqWeather('北京')
    //     console.log('天气',dayPictureUrl,weather)
    //     this.setState({
    //         dayPictureUrl,weather
    //     })
    // }
    getTitle = () => {
        //获取当前路径
        const path = this.props.location.pathname
        let title = ''
        menuList.forEach((item)=>{
            if(item.key === path){
                title = item.title
            }else if(item.children){
                //在所有的子item中查找
                const cItem = item.children.find((cItem)=>{
                    return cItem.key === path
                })
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }
    logout = () => {
        //退出登录
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '请问确定要退出登录吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                console.log('点击确定了')
                //删除保存的user数据
                storageUtil.removeUser()
                currentUser.user = {}
                this.props.history.replace('/login')
            },
            onCancel: () => {},
          })
    }
    componentDidMount(){
        //获取当前时间
        this.getCurrentTime()
    }
    componentWillUnmount(){
        //清除定时器
        clearInterval(this.interval)
    }
    render() {
        const {currentTime} = this.state
        const username = currentUser.user.username  //获取当前用户
        const title = this.getTitle()  //获得当前页面的title
        return (
            <div className="head">
                <div className="head-top">
                    <span className="welcome-span">欢迎,{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="head-bottom">
                    <div className="head-bottom-left">
                        {title}
                    </div>
                    <div className="head-bottom-right">
                        <span className="welcome-span">{currentTime}</span>
                        
                        <span>晴</span>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default withRouter(Head);