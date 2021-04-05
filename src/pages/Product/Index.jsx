import React, { Component } from 'react';
import {Card,Button,Select,Input, Table, message} from 'antd'
import { PlusOutlined, SearchOutlined  } from '@ant-design/icons';
import LinkButton from '../../components/LinkButton/LinkButton'
import {reqGetProduct,reqSearchProduct,reqUpdateStatus} from '../../serviceAPI/product'
const {Option} = Select



class ProductIndex extends Component {

    state = {
        total: 0,
        productList: [],
        loading: false,
        searchName: '', //搜索关键字
        searchType: 'productName'
    }
    getColumns = () => {
        this.columns = [
            {
              title: '商品名称',
              width: 240,
              dataIndex: 'name',
              
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              
            },
            {
              title: '价格',
              width: 150,
              dataIndex: 'price',
              render: (price) => '¥'+ price
              
            },{
                title: '状态',
                width: 180,
                render: (product) => {
                    const {status,_id} = product
                    const newStatus = status===1 ? 2 : 1
                    return (
                        <span>
                            <Button type="primary" onClick={()=>{this.updateStatus(_id, newStatus )}}>{status === 1 ? '下架' : '上架'}</Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
                
              },{
                title: '操作',
                width: 180,
                render: (product) => {
                    return (
                        <span>
                            <LinkButton style={{color:'#00cc33'}} onClick={()=>{this.props.history.push('/product/detail',{product})}}>详情</LinkButton>
                            <LinkButton style={{color:'#3399ff'}} onClick={()=>{this.props.history.push('/product/addupdate',{product})}}>修改</LinkButton>
                        </span>
                    )
                }
              }
          ];
    }
    getProduct = async (pageNum) => {
        //分页请求商品数据
        //保存当前页码
        this.pageNum = pageNum
        this.setState({
            loading: true
        })
        const {searchName,searchType} = this.state
        let res
        if(searchName){
            res = await reqSearchProduct({pageNum,pageSize:3,searchType,searchName})
        }else {
            res = await reqGetProduct(pageNum,3)
            
        }
        this.setState({
                loading: false
            })
        console.log('商品数据')
        console.log(res.data)
        if(res.data.status === 0){
            const {total,list} = res.data.data
            this.setState({
                productList: list,
                total: total
            })
        }
        
    }
    updateStatus = async (id,status) => {
        //更新商品状态
        const res = await reqUpdateStatus(id,status)
        if(res.data.status === 0){
            this.getProduct(this.pageNum)
            return message.success('商品更新成功')
        }else{
            return message.error('商品更新失败')
        }
    }
    componentWillMount(){
        this.getColumns()
    }
    componentDidMount(){
        this.getProduct(1)
    }
    render() {
        const {productList,total,loading,searchName,searchType} = this.state
        const title = (
            <span>
                <Select value={searchType} style={{width: '130px'}} onChange={(value)=>{this.setState({searchType:value})}}>
                    <Option value='productName'>名称搜索</Option>
                    <Option value='productDesc'>描述搜索</Option>
                </Select>
                <Input placeholder="请输入关键字" style={{width: '240px',margin:'0 20px'}} value={searchName} onChange={(event)=>{this.setState({searchName:event.target.value})}}></Input>
                <Button type="primary" icon={<SearchOutlined />} onClick={()=>{this.getProduct(1)}}>搜索</Button>
            </span>
        )
        const extra = (
            <Button icon={<PlusOutlined />} type="primary" onClick={()=>{this.props.history.push('/product/addupdate')}}>添加商品</Button>
        )
        return (
            <Card title={title} extra={extra} >
                <Table loading={loading} dataSource={productList} columns={this.columns} bordered rowKey='_id' pagination={{current:this.pageNum,defaultPageSize: 3,showQuickJumper:true,total:total,onChange:(pageNum)=>{this.getProduct(pageNum)}}}/>
            </Card>
        );
    }
}

export default ProductIndex;