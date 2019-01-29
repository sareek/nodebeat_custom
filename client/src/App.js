import React, { Component } from 'react';
import logo from './logo.svg';
import Test1 from './containers/test_dataFetch/Test1';
import DummyComp from './components/Test/DummyComponent'
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      
      <div className="App">
         <p>Welcome</p>
         <Route path='/test' exact component={ DummyComp } />
           
         <Test1 />
      </div>
      
    );
  }
}

export default App;
