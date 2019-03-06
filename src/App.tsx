import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GlobalContext, GlobalStore } from './store';

class App extends Component {
  // TODO:
  render() {
    console.log('todo: reach react 整合');
    console.log('todo: 编码约定');
    console.log('todo: 首页修改, 变成一个帮助页面');
    return (
      <GlobalContext.Provider value={new GlobalStore()}>
        <div className="App">
          <div>
            <header>几种条件模板写法示例</header>
            <header>如何写action/hooks</header>
          </div>
        </div>
      </GlobalContext.Provider>
    );
  }
}

export default App;

