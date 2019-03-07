import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppContext, AppStore } from './store';

class App extends Component {
  // TODO:
  render() {
    return (
      <AppContext.Provider value={new AppStore()}>
        <div className="App">
          <div>
            <header>几种条件模板写法示例</header>
            <header>如何写action/hooks</header>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
