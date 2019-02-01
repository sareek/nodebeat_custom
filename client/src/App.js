import React, { Component } from 'react';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux' 
import store from './store';

import Test1 from './containers/test_dataFetch/Test1';
import DummyComp from './components/Test/DummyComponent'
import NavBar from './components/NavBar'
import RegisterForm from './components/auth/Register'
import { Route, Switch } from 'react-router-dom';
import { Button,Icon,Input } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


import './App.css';




class App extends Component {

  

  constructor(props){
    super(props);
  this.state = {
    activeItem: 'home'
  }

  }

   
   render() {
   
    return (
      <Provider store= {store}>
      <div className="App">
         <NavBar />
         <RegisterForm />
      
         <p>Welcome</p>
         <Button primary>Click Here</Button>
         
         <Route path='/test' exact component={ DummyComp } />
           
         <Test1 />
      </div>
      </Provider>
      
    );

   
  }
}

export default App;
