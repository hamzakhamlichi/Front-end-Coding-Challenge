import React, { Component } from 'react';
import Repository from './components/repository'
import './assets/css/app.css'
class App extends Component {
  render() {
    return (
      <div className="wrap-app">
        <Repository />
      </div>
    );
  }
}
export default App;
