import React, { Component } from 'react';
import './App.css';
import { AppContext, AppStore } from './store';

class App extends Component {
  // TODO:
  render() {
    return (
      <AppContext.Provider value={new AppStore()}>
        <div className="App" />
      </AppContext.Provider>
    );
  }
}

export default App;
