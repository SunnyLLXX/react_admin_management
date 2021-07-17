import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Form, Input } from 'antd';


class UpdateForm extends PureComponent {


    static propTypes = {
        categoryName:PropTypes.string,
        setForm: PropTypes.func.isRequired
    }
    formRef = React.createRef();

    componentWillMount(){
        //将form对象通过setForm传递给父组件
        this.props.setForm(this.formRef)
    }

    render() {
        const {categoryName} = this.props
        return (
            <Form name="update-form" ref={this.formRef}>
                <Form.Item name="categoryName" label="分类名称" rules={[{ required: true, message:'分类名称必填哦' }]} initialValue={categoryName}>
                    <Input placeholder="请输入分类名称"/>
                </Form.Item>
            </Form>
        );
    }
}

export default UpdateForm;