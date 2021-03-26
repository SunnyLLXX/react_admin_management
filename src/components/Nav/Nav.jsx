import React, { Component } from 'react';
import '../../assets/css/nav.css'
import { Menu } from 'antd';
import {
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;

class Nav extends Component {

    getMenuNodes = (menuList)=>{
        //获取当前请求路径
        const path = this.props.location.pathname
        return menuList.map((item)=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key} icon={<PieChartOutlined />}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }else {
                //查找当前路径匹配的子路由，就展开SubMenu
                const cItem = item.children.find(cItem=> path.indexOf(cItem.key) === 0)
                //如果存在，说明当前item的子列表需要展开
                if(cItem){
                    this.openKey = item.key
                }
                
                return (
                    <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
        })
    }
    componentWillMount(){
        //调用获取菜单列表函数
        this.menuNode = this.getMenuNodes(menuList)
    }
    render() {
        //获取当前请求路径
        let path = this.props.location.pathname
        if(path.indexOf('/product') === 0){
            path = '/product'
        }
        //获取需要打开菜单项的key
        const openKey = this.openKey
        return (
            <div className="nav">
                <header>
                    <h1 className="nav-header">React后台管理系统</h1>
                </header>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                    >
                    {
                        this.menuNode
                    }
                </Menu>
                
            </div>
        );
    }
}

export default withRouter(Nav);