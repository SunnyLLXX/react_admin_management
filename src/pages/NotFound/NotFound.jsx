import { Button } from 'antd';
import React, { Component } from 'react';
import '../../assets/css/notfound.css'
class NotFound extends Component {

    goHome = ()=>{
        this.props.history.replace('/home')
    }
    render() {
        return (
            <div className="not-found">
                <div className="content">
                    <h1>404</h1>
                    <h2>抱歉你访问的页面不存在</h2>
                    <Button type="primary" onClick={this.goHome}>返回首页</Button>
                </div>
                
            </div>
        );
    }
}

export default NotFound;