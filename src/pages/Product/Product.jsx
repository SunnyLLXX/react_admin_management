import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import ProductIndex from './Index'
import Detail from './Detail'
import AddUpdate from './AddUpdate'

class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductIndex} exact></Route>
                <Route path='/product/addupdate' component={AddUpdate}></Route>
                <Route path='/product/detail' component={Detail}></Route>
                <Redirect to='/product'></Redirect>
            </Switch>
        );
    }
}

export default Product;