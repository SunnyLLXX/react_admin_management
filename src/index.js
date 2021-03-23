import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import currentUser from './until/currentUser'
import storageUntil from './until/storageUntil'

//读取local中的user，保存到内存中
currentUser.user = storageUntil.getUser()
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

reportWebVitals();
