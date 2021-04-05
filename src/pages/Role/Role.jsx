import React, { Component } from 'react';
import {Card,Button,Table,Modal, message} from 'antd'
import {reqGetRoleList,reqAddRole,reqUpdateRole} from '../../serviceAPI/role'
import AddRole from './AddRole'
import AuthRole from './AuthRole'
import currentUser from '../../util/currentUser'
// import storageUtil from '../../util/storageUtil'
import formateDate from '../../util/dateUtil'


class Role extends Component {

    roleRef = React.createRef()
    state = {
        loading: false,
        roleList: [],
        role: {}, //选中的角色
        isCreateModalVisible: false,
        isSetModalVisible: false
    }

    getColumns = () => {
        this.columns = [
            {
              title: '角色名称',
              dataIndex: 'name',
              
            },
            {
              title: '创建时间',
              dataIndex: 'create_time',
              render: (create_time)=>{
                return formateDate(create_time)
              }
              
            },
            {
              title: '授权时间',
              dataIndex: 'auth_time',
              render: (auth_time) => {
                  return formateDate(auth_time)
              }
              
            },{
                title: '授权人',
                dataIndex: 'auth_name'
                
              }
          ];
    }
    onTableRow = (record) => {
        //监听表格选中事件
        return {
            onClick: event => {
                console.log('选中数据',record)
                this.setState({
                    role: record
                })
            }, // 点击行
            onDoubleClick: event => {},
            onContextMenu: event => {},
            onMouseEnter: event => {}, // 鼠标移入行
            onMouseLeave: event => {},
          }
    }
    getRoleList = async () => {
        const res = await reqGetRoleList()
        console.log('角色列表')
        console.log(res.data.data)
        if(res.data.status === 0){
            this.setState({
                roleList: res.data.data
            })
        }
    }
    createRole = () => {
        //添加角色
        //表单验证
        this.createform.current.validateFields().then( async (values) => {
            console.log(values)
            const {roleName} = values
            console.log('子组件传递的form对象')
            console.log(this.form)
            this.createform.current.resetFields()
            const res = await reqAddRole(roleName)
            if(res.data.status === 0){
                this.getRoleList()
                message.success('创建角色成功')
            }else{
                message.error('创建角色失败')
            }
            
            this.setState({
                isCreateModalVisible: false
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    createCancel = () => {
        //关闭角色创建对话框
        this.createform.current.resetFields()
        this.setState({
            isCreateModalVisible: false
        })
    }
    showCreateModal = () => {
        //打开创建角色对话框
        this.setState({
            isCreateModalVisible: true
        })
    }
    setRole = async () => {
        //更新权限
        const role = this.state.role
        const menus = this.roleRef.current.getMenus()
        role.menus = menus
        role.auth_name = currentUser.user.username
        role.auth_time = Date.now()
        const res = await reqUpdateRole(role)
        if(res.data.status === 0){
            this.getRoleList()
            message.success('角色权限更新成功')
            this.setState({
                isSetModalVisible: false
            })
            
            //如果当前更新的是自己角色的权限，强制退出
            // if(role._id === currentUser.user.role_id){
            //     currentUser.user = {}
            //     storageUtil.removeUser()
            //     message.success('角色权限已更新，请重新登录')
            //     this.props.history.replace('/login')
            // }else {
            //     this.getRoleList()
            //     message.success('角色权限更新成功')
            // }
            // this.setState({
            //     isSetModalVisible: false
            // })
            
        }else {
            message.error('角色权限更新失败')
        }
    }
    setCancel = () => {
        //取消设置角色权限对话框
        this.setState({
            isSetModalVisible: false
        })
    }
    showAuthModal = ()=>{
        this.setState({
            isSetModalVisible: true
        })
    }
    componentWillMount(){
        this.getColumns()
    }
    componentDidMount(){
        this.getRoleList()
    }

    render() {
        const {loading,roleList,role,isCreateModalVisible,isSetModalVisible} = this.state
        const title = (
            <span>
                <Button type="primary" onClick={this.showCreateModal}>创建角色</Button>
                <Button type="primary" style={{marginLeft: '20px'}} disabled={!role._id} onClick={this.showAuthModal}>设置权限角色</Button>
            </span>
        )
        
        return (
            <Card title={title}>
                <Table loading={loading} dataSource={roleList} columns={this.columns} bordered rowKey='_id' rowSelection={{type:'radio',selectedRowKeys:[role._id],onSelect:(role)=>{this.setState({
                    role})}}} onRow={this.onTableRow}/>;

                <Modal title="创建角色" visible={isCreateModalVisible} onOk={this.createRole} onCancel={this.createCancel}>
                    <AddRole setForm={(form)=>{this.createform = form}}></AddRole>
                </Modal>
                <Modal title="设置角色权限" visible={isSetModalVisible} onOk={this.setRole} onCancel={this.setCancel}>
                    <AuthRole role={role} ref={this.roleRef}></AuthRole>
                </Modal>
            </Card>
        );
    }
}

export default Role;