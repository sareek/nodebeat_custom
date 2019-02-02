import React, { Component } from 'react';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import store from './store';

import Test1 from './containers/test_dataFetch/Test1';
import DummyComp from './components/Test/DummyComponent'
import Login from './components/auth/Login'
import NavBar from './components/NavBar'
import RegisterForm from './components/auth/Register'
import { Route, Switch } from 'react-router-dom';
import { Button, Icon, Input } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


import './App.css';
import dummyComp from './components/Test/DummyComponent';




class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    }

  }


  render() {

    return (
      <Provider store={store}>
        <div className="App">
          <NavBar />

          
          

          <Route path='/' exact component={RegisterForm} />
          <Route path='/login' exact component={Login} />
          <Route path='/test' exact component={Test1} />

          {/* <Route path='/test' exact component={ DummyComp } /> */}

          
        </div>
      </Provider>

    );


  }
}

export default App;
