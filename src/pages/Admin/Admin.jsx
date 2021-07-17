import React, { PureComponent, Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import { Layout, Spin } from 'antd';
import currentUser from '../../util/currentUser'
/** import中加上 webpackPrefetch，浏览器会在空闲的时候加载组件*/
const Nav = lazy(() => import(/*webpackPrefetch:true*/'../../components/Nav/Nav'));
const Head = lazy(() => import(/*webpackChunkName:"head"*/'../../components/Head/Head'));
const Home = lazy(() => import('../../pages/Home/Home'));
const Bar = lazy(() => import('../../pages/Charts/Bar'));
const Line = lazy(() => import('../../pages/Charts/Line'));
const Pie = lazy(() => import('../../pages/Charts/Pie'));
const User = lazy(() => import('../../pages/User/User'));
const Role = lazy(() => import('../../pages/Role/Role'));
const Category = lazy(() => import('../../pages/Category/Category'));
const Product = lazy(() => import('../../pages/Product/Product'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));
const {  Footer, Sider, Content } = Layout;

class Admin extends PureComponent {
    componentWillMount(){
        const user = currentUser.user
        console.log('当前用户')
        console.log(user)
        // 如果当前没有登录，就去登录界面
        if(!user || !user._id){
            // return <Redirect to="/login"></Redirect>
            this.props.history.replace('/login')
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
                            <Suspense fallback={<div style={{textAlign: 'center',margin:'200px auto', width: '100%', height: '100%'}}><Spin></Spin></div>}>
                                <Switch>
                                    <Redirect  exact from='/' to='/home'></Redirect>
                                    <Route path="/home" component={Home}></Route>
                                    <Route path="/category" component={Category}></Route>
                                    <Route path="/product" component={Product}></Route>
                                    <Route path="/role" component={Role}></Route>
                                    <Route path="/user" component={User}></Route>
                                    <Route path="/charts/bar" component={Bar}></Route>
                                    <Route path="/charts/line" component={Line}></Route>
                                    <Route path="/charts/pie" component={Pie}></Route>
                                    <Route component={NotFound}></Route>
                                </Switch>
                            </Suspense>    
                        </Content>
                        <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器，可以获取更佳用户体验哦</Footer>
                    </Layout>
                </Layout>
        );
    }
}

export default Admin;