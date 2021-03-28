import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types'

class AddRole extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired
    }
    formRef = React.createRef();
    componentWillMount(){
        //将form对象通过setForm传递给父组件
        this.props.setForm(this.formRef)
    }
    render() {
        return (
            <Form name="role-form" ref={this.formRef}>
                <Form.Item name="roleName" label="角色名称" rules={[{ required: true, message:'角色名称必填哦' }]}>
                    <Input placeholder="请输入角色名称"/>
                </Form.Item>
            </Form>
        );
    }
}

export default AddRole;