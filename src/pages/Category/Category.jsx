import React, { Component } from 'react';
import { Card, Button, Table, Space, message,Modal } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/LinkButton/LinkButton'
import {reqGetCategory, reqAddCategory, reqUpdateCategory} from '../../serviceAPI/category'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'

class Category extends Component {

    state = {
        loading: false, //数据获取前显示
        categoryList: [],
        subCategory:[], //二级分类列表
        parentId: '0',
        parentName: '',
        isAddModalVisible: false,
        isUpdateModalVisible: false
    }
    getColumns = () => {
        // 初始化table列字段
        const columns = [
            {
              title: '分类名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              width: 300,
              render: (category) => (
                <Space size="middle">
                  <LinkButton onClick={()=>{this.showUpdateModal(category)}}>修改分类</LinkButton>
                  {this.state.parentId === '0' ? <LinkButton onClick={()=>{this.getSubCategory(category)}}>查看子分类</LinkButton> : null}
                  
                </Space>
              ),
            }
          ];
          return columns
    }
    getCategoryList = async (parentId) => {
        this.setState({
            loading: true
        })
        parentId = parentId || this.state.parentId
        //获取分类列表
        const res = await reqGetCategory(parentId)
        this.setState({
            loading:false
        })
        console.log('分类列表')
        console.log(res.data)
        if(res.data.status === 0){
            if(parentId === '0'){
                this.setState({
                    categoryList: res.data.data
                })
            }else {
                this.setState({
                    subCategory: res.data.data
                })
            }
            
        }else {
            message.error('获取分类列表失败')
        }
        
    }
    getSubCategory = (category) => {
        console.log('每一行的数据')
        console.log(category)
        //获取子分类列表
        this.setState({
            parentId: category._id,
            parentName: category.name
        },()=>{
            //在状态更新且render()后执行，避免parentId未更新
            this.getCategoryList()
        })
        
    }
    showCategoryList = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategory: []
        })
    }
    addCancel = () => {
        this.addform.current.resetFields()
        this.setState({
            isAddModalVisible: false
        })
    }
    updateCancel = () => {
        this.updateform.current.resetFields()
        this.setState({
            isUpdateModalVisible: false
        })
    }
    addCategory = () => {
        //添加分类
        this.addform.current.validateFields().then(async (values)=>{
            console.log(values)
            const {parentId,categoryName} = values  
            console.log('添加分类')
            console.log(this.form)
            console.log(parentId,categoryName)
            this.addform.current.resetFields()
            const res = await reqAddCategory({parentId,categoryName})
            if(res.data.status === 0){
                message.success('添加分类成功')
                //添加的分类是当前分类下的列表
                if(parentId === this.state.parentId){
                    this.getCategoryList()
                }else if(parentId === '0'){
                    //在二级分类下添加一级分类，重新获取一级分类但不需显示
                    this.getCategoryList('0')
                }
                
            }else{
                message.error("添加分类失败")
            }
            
            this.setState({
                isAddModalVisible: false
            })
        }).catch(err=>{
            console.log(err)
        })
        
    }
    updateCategory = () => {
        //更新分类
        //表单验证
        
        this.updateform.current.validateFields().then( async (values) => {
            console.log(values)
            const {categoryName} = values
            const categoryId = this.category._id
            console.log('子组件传递的form对象')
            console.log(this.form)
            this.updateform.current.resetFields()
            const res = await reqUpdateCategory({categoryId,categoryName})
            if(res.data.status === 0){
                this.getCategoryList()
                message.success('更新分类成功')
            }else{
                message.error("更新分类失败")
            }
            
            this.setState({
                isUpdateModalVisible: false
            })
        }).catch(err=>{
            console.log(err)
        })
        
    }
    showAddModal = () => {
        this.setState({
            isAddModalVisible: true
        })
    }
    showUpdateModal = (category) => {
        //保存分类对象
        this.category = category
        console.log('分类对象属性')
        console.log(category)
        this.setState({
            isUpdateModalVisible: true
        })
    }
    componentWillMount(){
        this.columns = this.getColumns()
    }
    componentDidMount(){
        this.getCategoryList()
    }
    render() {
        const category = this.category || {}
        const columns = this.columns
        const {categoryList,loading,subCategory,parentId,parentName,isAddModalVisible,isUpdateModalVisible} = this.state
        const title = parentId === '0' ? '一级分类列表' : (<span>
            <LinkButton onClick={this.showCategoryList}>一级分类列表</LinkButton>
            <ArrowRightOutlined></ArrowRightOutlined>
            <span>{parentName}</span>
        </span>)
        const extra = (<Button type="primary" icon={<PlusOutlined />} onClick={this.showAddModal}>添加</Button>)
        //读取指定分类
        
        return (
            <Card title={title} extra={extra}>
                <Table dataSource={parentId === '0' ? categoryList : subCategory} columns={columns} loading={loading} bordered rowKey="_id" pagination={{defaultPageSize:5,showQuickJumper:true}}/>;
                <Modal title="添加分类" visible={isAddModalVisible} onOk={this.addCategory} onCancel={this.addCancel}>
                    <AddForm categoryList={categoryList} parentId={parentId} setForm={(form)=>{this.addform = form}}></AddForm>
                </Modal>
                <Modal title="修改分类" visible={isUpdateModalVisible} onOk={this.updateCategory} onCancel={this.updateCancel}>
                    <UpdateForm categoryName={category.name} setForm={(form)=>{this.updateform = form}}></UpdateForm>
                </Modal>
            </Card>
        );
    }
}

export default Category;