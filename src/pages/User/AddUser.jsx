import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import PropTypes from 'prop-types'
const { Option } = Select;

class AddUser extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired,
        role: PropTypes.array,
        user: PropTypes.object
    }
    formRef = React.createRef();
    componentWillMount(){
       //将form对象通过setForm传递给父组件
       this.props.setForm(this.formRef)
    }
    render() {
        const {role} = this.props
        const user = this.props.user || {}
        console.log('选中用户')
        console.log(user)
        return (
            <Form name="add-user" ref={this.formRef}>
                <Form.Item name="username" label="用户名" rules={[{ required: true, message:'用户名必填哦' },{min: 4,message:'用户名至少四位字符'},{ pattern: /^[0-9a-zA-z_]+$/, message: '用户名只能够是数字、字母或下划线' }]} initialValue={user.username}>
                    <Input placeholder="请输入用户名"/>
                </Form.Item>
                {
                    user._id ? null :(<Form.Item name="password" label="密码" rules={[{ required: true, message:'密码必填哦' },{min: 4,message:'密码至少四位字符'},{max:12,message:'密码最多12位字符'}]} initialValue=''>
                                    <Input placeholder="请输入密码" type='password'/>
                                </Form.Item>)
                }
                
                <Form.Item name="phone" label="手机号" rules={[{ required: true, message:'手机号必填哦' },{ pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }]} initialValue={user.phone}>
                    <Input placeholder="请输入手机号"/>
                </Form.Item>
                <Form.Item name="email" label="邮箱" rules={[{ required: true, message:'邮箱必填哦' }]} initialValue={user.email}>
                    <Input placeholder="请输入邮箱"/>
                </Form.Item>
                <Form.Item name="role_id" label="角色" rules={[{ required: true,  message:'所属角色必选哦'}]} initialValue={user.role_id}>
                    <Select
                    placeholder="请选择角色"
                    allowClear
                    >
                        {
                            role.map((item) => {
                                return (
                                    <Option value={item._id} key={item._id}>{item.name}</Option>
                                )
                            })
                        }
                    
                    
                    </Select>
                </Form.Item>
                
            </Form>
        );
    }
}

export default AddUser;