import React, { Component } from 'react';
import logo from './logo.svg';
import Test1 from './containers/test_dataFetch/Test1';
import DummyComp from './components/Test/DummyComponent'
import { Route, Switch } from 'react-router-dom';
import { Button,Icon,Input } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


import './App.css';

class App extends Component {

  constructor(props){
    super(props);
  this.state = {
    "activeItem": 'home'
  }
  }
  
  render() {
    const {activeItem} = this.state;
    return (
      
      <div className="App">
      <Menu secondary>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='friends'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
         <p>Welcome</p>
         <Button primary>Click Here</Button>
         
         <Route path='/test' exact component={ DummyComp } />
           
         <Test1 />
      </div>
      
    );
  }
}

export default App;
