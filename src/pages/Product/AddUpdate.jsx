import React, { Component } from 'react';
import {Card, Form, Input, Cascader, Upload,Button} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import {reqGetCategory} from '../../serviceAPI/category'
import PictureWall from './PictureWall'
const { TextArea } = Input;
//表单布局设置
const layout = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 8,
    },
  };

class ProductAddUpdate extends Component {

    pictureRef = React.createRef()
    formRef = React.createRef();
    state = {
        options: [],
    }
    onFinish = (values) => {
        console.log(values)
        const imgs = this.pictureRef.current.getImgs()
        console.log('图片:',imgs)
    }
    getCategoryList = async (parentId) => {
        //获取分类（一级或二级）
        const res = await reqGetCategory(parentId)
        if(res.data.status === 0){
            const category = res.data.data
            if(parentId === '0'){
                this.initOptions(category)
            }else{
                return category
            }
            
        }

    }
    initOptions = async (category) => {
        //初始化option
        const options = category.map((item)=>{
            return {
                value:item._id,
                label: item.name,
                isLeaf: false
            }
            
        })
        //如果是二级商品分类的更新
        const {isUpdate,product} = this
        const {pCategoryId,categoryId} = product
        if(isUpdate && pCategoryId !== '0'){
            //获取对应二级列表
            const subCategory = await this.getCategoryList(pCategoryId)
            const childOption = subCategory.data.map((item) => {
                return {
                    value:item._id,
                    label: item.name,
                    isLeaf: true
                }
            })
            //找到当前商品对应的一级option
            const targetOption = options.find((item)=>{
                return item.value === pCategoryId
            })
            targetOption.children = childOption
        }
        
        this.setState({
            options:[...options]
        })
    }
    /**自定义验证价格 */
    // validatePrice = (rule,value,callback) => {
    //     if(value*1 > 0){
    //         callback()
    //     }else {
    //         callback('价格必须大于0哦')
    //     }
    // }

    loadData = async (selectedOptions) => {
        //得到option对象
        const targetOption = selectedOptions[0];
        //显示loading
        targetOption.loading = true;
    
        // 异步获取二级数据
        const subCategory = await this.getCategoryList(targetOption.value)
        targetOption.loading = false;
        if(subCategory && subCategory.length > 0){
            //生成二级列表options
            const child = subCategory.map((item)=> {
                return {
                    value:item._id,
                    label: item.name,
                    isLeaf: true
                }
            })
            //关联到当前option
            targetOption.children = child
        }else{
            targetOption.isLeaf = true
        }

        //更新options状态
        this.setState({
            options: [...this.state.options]
        })
      }

      componentWillMount(){
          //取出传递过来的数据
          const product = this.props.location.state
          this.isUpdate = !!product //强制转换布尔类型
          this.product = product || {}
      }
      componentDidMount(){
          this.getCategoryList('0')
      }
    render() {
        
        const {isUpdate,product} = this
        const {pCategoryId,categoryId,imgs} = product
        const {options} = this.state
        //用来接收级联分类数组
        const categoryIds = []
        if(isUpdate){
            if(pCategoryId === '0'){
                categoryIds.push(categoryId)
            }else{
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
            
        }
        const title = (
            <span>
                <ArrowLeftOutlined  style={{color:'#336699',marginRight: '20px',fontSize: '20px'}} onClick={()=>{this.props.history.goBack()}}/>
                <span >{isUpdate ? '修改商品' : '添加商品'}</span>  
            </span>
        )
        
       
        return (
            <Card title={title} >
                <Form  ref={this.formRef} name="addupdate-form" onFinish={this.onFinish} {...layout}>
                    <Form.Item
                    name="name"
                    label="商品名称"
                    rules={[{required: true,message:'商品名称必填哦'}]}
                    initialValue={product.name}
                    >
                        <Input placeholder='请输入商品名称'/>
                    </Form.Item>
                    <Form.Item
                    name="desc"
                    label="商品描述"
                    rules={[{required: true,message:'商品描述必填哦'}]}
                    initialValue={product.desc}
                    >
                        <TextArea placeholder="请输入商品描述" autoSize={{minRows:2,maxRows:8}}></TextArea>
                    </Form.Item>
                    <Form.Item
                    name="price"
                    label="商品价格"
                    rules={[{required: true,message:'商品价格必填哦'}]}
                    initialValue={product.price}
                    >
                        <Input placeholder='请输入商品价格' type="number" addonAfter="元"/>
                    </Form.Item>
                    <Form.Item
                    name="categoryIds"
                    label="商品分类"
                    rules={[{required: true,message:'商品分类必填哦'}]}
                    initialValue={product.categoryId}
                    >
                        <Cascader options={options} loadData={this.loadData} />
                    </Form.Item>
                    <Form.Item
                    name="imgs"
                    label="商品图片"
                    
                    >
                        <PictureWall ref={this.pictureRef} imgs={imgs}></PictureWall>
                    </Form.Item>
                    <Form.Item >
                    <Form.Item
                    name="detail"
                    label="商品详情"
                    rules={[{required: true,message:'商品价格必填哦'}]}
                    initialValue={product.detail}
                    >
                        <Input placeholder='请输入商品详情' />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default ProductAddUpdate;