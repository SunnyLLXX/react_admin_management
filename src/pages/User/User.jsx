import React, { Component } from 'react';
import {Card,Table,Modal, Button, message} from 'antd'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../../components/LinkButton/LinkButton';
import {reqGetUserList, reqDeleteUser,reqAddUpdateUser} from '../../serviceAPI/user'
import formateDate from '../../util/dateUtil';
import AddUser from './AddUser';


class User extends Component {
    state = {
        userList: [],
        role: [], //所有角色列表
        loading: false,
        isAddModalVisible: false,
    }

    getColumns = () => {
        // 初始化table列字段
        const columns = [
            {
              title: '用户名',
              dataIndex: 'username',
            },
            {
              title: '邮箱',
              dataIndex: 'email'
            },
            {
                title: '手机号',
                dataIndex: 'phone'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render:(create_time)=>{
                    return formateDate(create_time)
                }
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => this.roleNames[role_id]
                    
            },
            {
                title:'操作',
                render: (user)=> (
                    <span>
                        <LinkButton onClick={()=>{this.showUpdate(user)}} style={{color:'#3399ff'}}>修改</LinkButton>
                        <LinkButton onClick={()=>{this.deleteUser(user)}} style={{color:'#ff6633'}}>删除</LinkButton>
                    </span>
                )
            }
          ];
          return columns
    }
    getUserList = async () => {
        //获取用户列表
        const res = await reqGetUserList()
        console.log('用户列表')
        console.log(res.data)
        if(res.data.status === 0){
            this.roleName(res.data.data.roles)
            this.setState({
                userList: res.data.data.users,
                role: res.data.data.roles
            })
        }else {
            message.error('用户列表获取失败')
        }
    }
    addUser = () => {
        //添加用户
        //表单验证
        
        this.form.current.validateFields().then( async (values) => {
            console.log(values)
            console.log('子组件传递的form对象')
            console.log(this.form)
            this.form.current.resetFields()
            //如果是更新
            if(this.user && this.user._id){
                values._id = this.user._id
            }
            const res = await reqAddUpdateUser(values)
            if(res.data.status === 0){
                this.getUserList()
                message.success(`${this.user? '修改' : '添加'}用户成功`)
            }else{
                message.error(`${this.user? '修改' : '添加'}用户失败`)
            }
            
            this.setState({
                isAddModalVisible: false
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    addCancel = () => {
        //关闭对话框
        this.form.current.resetFields()
        this.setState({
            isAddModalVisible: false
        })
    }
    showUpdate = (user) => {
        this.user = user //保存user
        this.setState({
            isAddModalVisible: true
        })
    }
    showAddUser = () => {
        //显示添加用户对话框
        this.user = null //确保创建用户表单没有数据
        this.setState({
            isAddModalVisible: true
        })
    }
    deleteUser = (user)=> {
        //删除用户
        console.log('选中的此用户')
        console.log(user)
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: `确定要删除${user.name}用户吗?`,
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                console.log('点击确定了')
                //删除保用户
                const res = await reqDeleteUser(user._id)
                if(res.data.status === 0){
                    this.getUserList()
                    message.success('用户删除成功')
                }else {
                    message.error('用户删除失败')
                }
            },
            onCancel: () => {},
          })

    }
    roleName = (role) => {
        //根据role._id获取对应的角色名称
        const roleNames = role.reduce((pre,role)=>{
            pre[role._id] = role.name
            return pre
        },{})
        this.roleNames = roleNames
    }
    componentWillMount(){
        this.columns = this.getColumns()
    }
    componentDidMount(){
        this.getUserList()
    }
    render() {
        const {userList,loading,isAddModalVisible,role} = this.state
        const user = this.user || {}
        const title = (
           <Button icon={<PlusOutlined />} type="primary" onClick={this.showAddUser}>创建用户</Button>
        )
        return (
            <Card title={title}>
                <Table dataSource={userList} columns={this.columns} loading={loading} bordered rowKey="_id" pagination={{showQuickJumper:true}}/>
                <Modal title={user._id ? '修改用户' : '添加用户'} visible={isAddModalVisible} onOk={this.addUser} onCancel={this.addCancel}>
                    <AddUser setForm={(form)=>{this.form = form}} role={role} user={user}></AddUser>
                </Modal>
            </Card>
        );
    }
}

export default User;