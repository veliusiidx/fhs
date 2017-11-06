import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Green from './Green.js';
import store from "./store.js"


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Green />
      </Provider>
    );
  }
}

export default App;
