import React, { Component } from 'react';
import {Upload, Modal, message} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import {reqDeletePic} from '../../serviceAPI/product'
import PropTypes from 'prop-types'

class PictureWall extends Component {

    static propTypes = {
        imgs: PropTypes.array.isRequired
    }
    state = {
        previewVisible:  false,
        previewImage: '', //大图url
        fileList: [],
    }
    constructor(props){
        super(props)
        let fileList = []
        const {imgs} = this.props
        if(imgs && imgs.length > 0){
            fileList = imgs.map((item,index) => {
                return {
                    uid: -index,
                    name:item,
                    status: 'done',
                    url: 'http://localhost:5000/upload/'+item
                }
            })
        }
        this.state = {
            previewVisible:  false,
            previewImage: '', //大图url
            fileList
        }
    }
    handleCancel = () => {
        this.setState({
            previewVisible: false
        })
    } 
    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await this.getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
          previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    }
    handleChange = async ({ file,fileList }) => {
        //在上传删除过程中及时更新fileList
        console.log('图片更新')
        console.log(fileList)
        //如果上传成功，将当前file信息进行修改
        if(file.status === 'done'){
            const res = file.response
            if(res.status === 0){
                const {name,url} = res.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
                message.success('图片上传成功')
            }else{
                message.error("图片上传失败")
            }
        }else if(file.status === 'remove'){
            const res = await reqDeletePic(file.name)
            if(res.data.status === 0){
                message.success("删除图片成功")
            }else {
                message.error("删除图片失败")
            }
        }
        this.setState({ fileList });
    }

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
      getImgs = () => {
          //获取所有已上传文件的数组
          return this.state.fileList.map((item) => {
              return item.name
          })
      }
    render() {
        const {previewVisible,previewImage,fileList} = this.state
        const uploadButton = (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>上传</div>
            </div>
          );
        return (
            <>
                <Upload
                action="/manage/img/upload"
                accept="image/*"
                listType="picture-card"
                name="image"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                >
                {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                visible={previewVisible}
                title='图片预览'
                footer={null}
                onCancel={this.handleCancel}
                >
                <img alt="图片" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}

export default PictureWall;