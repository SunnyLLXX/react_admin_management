import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import currentUser from './util/currentUser'
import storageUtil from './util/storageUtil'

//读取local中的user，保存到内存中
currentUser.user = storageUtil.getUser()
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

reportWebVitals();
