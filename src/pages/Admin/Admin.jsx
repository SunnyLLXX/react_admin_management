import React, { Component } from 'react';
import {Redirect, Route, Switch} from 'react-router';
import { Layout } from 'antd';
import currentUser from '../../util/currentUser'
import Nav from '../../components/Nav/Nav'
import Head from '../../components/Head/Head'
import Home from '../../pages/Home/Home'
import Bar from '../../pages/Charts/Bar'
import Line from '../../pages/Charts/Line'
import Pie from '../../pages/Charts/Pie'
import User from '../../pages/User/User'
import Role from '../../pages/Role/Role'
import Category from  '../../pages/Category/Category'
import Product from '../../pages/Product/Product'
const {  Footer, Sider, Content } = Layout;


class Admin extends Component {
    componentWillMount(){
        const user = currentUser.user
        console.log('当前用户')
        console.log(user)
        // 如果当前没有登录，就去登录界面
        if(!user || !user.id){
            return <Redirect to="/login"></Redirect>
        }
    }
    render() {
        return (
                <Layout style={{minHeight:'100%'}}>
                    <Sider>
                        <Nav></Nav>
                    </Sider>
                    <Layout>
                        <Head ></Head>
                        <Content style={{backgroundColor:'#fff',margin:'20px'}}>
                            <Switch>
                                <Route path="/home" component={Home}></Route>
                                <Route path="/category" component={Category}></Route>
                                <Route path="/product" component={Product}></Route>
                                <Route path="/role" component={Role}></Route>
                                <Route path="/user" component={User}></Route>
                                <Route path="/charts/bar" component={Bar}></Route>
                                <Route path="/charts/line" component={Line}></Route>
                                <Route path="/charts/pie" component={Pie}></Route>
                                <Redirect to='/home'></Redirect>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器，可以获取更佳用户体验哦</Footer>
                    </Layout>
                </Layout>
        );
    }
}

export default Admin;