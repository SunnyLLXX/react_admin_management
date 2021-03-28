import React, { Component } from 'react';
import { Tree, Form, Input } from 'antd';
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'



// const treeData = [
//     {
//       title: 'parent 1',
//       key: '0-0',
//       children: [
//         {
//           title: 'parent 1-0',
//           key: '0-0-0',
//           disabled: true,
//           children: [
//             {
//               title: 'leaf',
//               key: '0-0-0-0',
//               disableCheckbox: true,
//             },
//             {
//               title: 'leaf',
//               key: '0-0-0-1',
//             },
//           ],
//         },
//         {
//           title: 'parent 1-1',
//           key: '0-0-1',
//           children: [
//             {
//               title: (
//                 <span
//                   style={{
//                     color: '#1890ff',
//                   }}
//                 >
//                   sss
//                 </span>
//               ),
//               key: '0-0-1-0',
//             },
//           ],
//         },
//       ],
//     },
//   ];
class AuthRole extends Component {
    static propTypes = {
        role: PropTypes.object
    }

    constructor(props){
        super(props)
        const {menus} = this.props.role
        //根据传入的角色menus生成初始状态
        this.state = {
            checkedKeys: menus
        }
    }
    
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info)
    }
    
    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info)
        this.setState({
            checkedKeys
        })

    }
    getMenus = () => {
        //为父组件获取最新的menus
        return this.state.checkedKeys
    }
    componentWillMount(){
        this.treeData = menuList
    }
    /**当组件接收到新的props进行调用 */
    componentWillReceiveProps(nextProps){
        //根据新传入的role来更新checkedKeys
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })
    }
    render() {
        const {role} = this.props
        const {checkedKeys} = this.state
        return (
            <div>
                <Form.Item label="角色名称">
                    <Input value={role.name} disabled/>
                </Form.Item>
                <Tree
                checkable
                checkedKeys={checkedKeys}
                defaultExpandedKeys={['0-0-0', '0-0-1']}
                defaultSelectedKeys={['0-0-0', '0-0-1']}
                defaultCheckedKeys={['0-0-0', '0-0-1']}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
                treeData={this.treeData}
                />
            </div>
        );
    }
}

export default AuthRole;