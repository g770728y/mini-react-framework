import React, { Component } from 'react';
import './App.css';
import { AppContext, AppStore } from './store';
import { Router } from '@reach/router';

class App extends Component {
  // TODO:
  render() {
    return (
      <AppContext.Provider value={new AppStore()}>
        <div className="App">
          <Router>
            <Home path="/" />
            <Desks path="/desks" />
          </Router>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
