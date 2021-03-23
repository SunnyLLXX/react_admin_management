import React, { Component } from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Admin from './pages/Admin/Admin.jsx'

import './App.css';


export default class App extends Component {
  render() {
    return (
        <div className="app">
            <BrowserRouter>
              <Switch> 
                {/* 只匹配一个路由 */}
                <Route path="/login" component={Login}></Route>
                <Route path="/" component={Admin}></Route>
              </Switch>
            </BrowserRouter>
        </div>
    
    )
  }
}

