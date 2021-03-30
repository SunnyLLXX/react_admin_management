import React, { Component } from 'react';
import {Card, List} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import '../../assets/css/product.css'
import {reqCategory} from '../../serviceAPI/product'
const {Item} = List



class Detail extends Component {

    state = {
        parentName:'',
        childName: ''
    }

    async componentDidMount(){
        //获取当前商品的id
        console.log(this.props.location)
        const {pCategoryId,categoryId} = this.props.location.state.product
        if(pCategoryId === '0'){
            const res = await reqCategory(categoryId)
            if(res.data.status === 0){
                this.setState({
                    parentName:res.data.data.name
                })
            }
        }else{
            const res = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
            
            if(res[0].data.status === 0 && res[1].data.status === 0){
                this.setState({
                    parentName:res[0].data.data.name,
                    childName:res[1].data.data.name
                })
            }
        }
    }
    render() {
        const title = (
            <span>
                <ArrowLeftOutlined style={{color:'#336699',marginRight: '20px',fontSize: '20px'}} onClick={()=>{this.props.history.goBack()}}></ArrowLeftOutlined>
                <span>商品详情</span>
            </span>
        )
        //读取携带的state数据详情
        const {name,desc,detail,imgs,price} = this.props.location.state.product
        const {childName,parentName} = this.state
        const path = 'http://localhost:5000/upload/'
        
        return (
            <Card title={title}>
                <List className="product-detail">
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span>{parentName}{childName ? '--->'+ childName : ''}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span>
                            {
                                imgs.map((item) => {
                                    return (
                                        <img src={path+item} alt="图片" className="product-img" key={item}/>
                                    )
                                })
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{__html:detail}}></span>
                    </Item>
                </List>
            </Card>
        );
    }
}

export default Detail;