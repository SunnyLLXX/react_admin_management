import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import PropTypes from 'prop-types'
const { Option } = Select;

class AddForm extends Component {

    static propTypes = {
        categoryList:PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }
    formRef = React.createRef();
    componentWillMount(){
        //将form对象通过setForm传递给父组件
        this.props.setForm(this.formRef)
    }
    render() {
        const {categoryList,parentId} = this.props
        return (
            <Form name="add-form" ref={this.formRef}>
                <Form.Item name="parentId" label="所属分类" rules={[{ required: true,  message:'所属分类必选哦'}]} initialValue={parentId}>
                    <Select
                    placeholder="请选择一个分类"
                    allowClear
                    >
                    <Option value="0">一级分类</Option>
                    {
                        categoryList.map((item) => {
                            return (
                                <Option value={item._id}>{item.name}</Option>
                            )
                        })
                    }
                    
                    </Select>
                </Form.Item>
                <Form.Item name="categoryName" label="分类名称" rules={[{ required: true, message:'分类名称必填哦' }]}>
                    <Input placeholder="请输入分类名称"/>
                </Form.Item>
            </Form>
        );
    }
}

export default AddForm;