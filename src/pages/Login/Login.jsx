import React, { Component } from 'react';
import '../../assets/css/login.css';
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../serviceAPI/login';
import currentUser from '../../until/currentUser';
import storageUntil from '../../until/storageUntil'
import { Redirect } from 'react-router';

class Login extends Component {

    onFinish = async (values)=>{
        console.log(values)
        const res = await reqLogin(values)
        console.log(res)
        if(res.data.status === 0){
            message.success('登录成功')
            currentUser.user = res.data.data //保存在内存
            storageUntil.saveUser(res.data.data)   //保存在local中
            this.props.history.replace('/')
        }else {
            return message.error(res.data.msg)
        }
    }
    render() {
        //如果用户已经登录，自动跳转管理界面
        const user = currentUser.user
        if(user || user.id){
            return <Redirect to="/"></Redirect>
        }
        return (
                <div className="login">
                <div className="centerlogin">
                    <h1 className="title">欢迎登录</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item className="inputItem"
                            name="username"
                            rules={[{ required: true, message: '用户名不能够为空' },{ min: 4, message: '用户名至少四位字符' },{ pattern: /^[0-9a-zA-z_]+$/, message: '用户名只能够是数字、字母或下划线' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item className="inputItem"
                            name="password"
                            rules={[{ required: true, message: '密码不能够为空' },{ min: 4, message: '密码至少4个字符' },{ max: 12, message: '密码最多12个字符' }]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="请输入密码"
                            />
                        </Form.Item>

                        <Form.Item className="inputItem">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                        </Form>
                    </div>
                </div>
        );
    }
}

export default Login;