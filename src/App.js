import React, { Component, Suspense, lazy } from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import './App.css';
import { Spin } from 'antd';
const Login = lazy(() => import('./pages/Login/Login.jsx'));
const Admin = lazy(() => import('./pages/Admin/Admin.jsx'));

export default class App extends Component {
  render() {
    return (
        <div className="app">
            <BrowserRouter>
              <Suspense fallback={<div style={{textAlign: 'center',margin:'200px auto', width: '100%', height: '100%'}}><Spin></Spin></div>}>
                <Switch> 
                  {/* 只匹配一个路由 */}
                  <Route path="/login" component={Login}></Route>
                  <Route path="/" component={Admin}></Route>
                </Switch>
              </Suspense>
            </BrowserRouter>
        </div>
    
    )
  }
}

