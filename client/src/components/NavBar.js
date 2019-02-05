import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

import { Button,Icon,Input } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';









class NavBar extends Component {

  constructor(props){
    super(props);
  this.state = {
    activeItem: 'home'
  }

  }

      handleItemClick = (e, { name }) => {
            this.setState({ activeItem: name },
              console.log(name)
   
        )}


        onLogoutClick(e) {
          e.preventDefault();
          this.props.logoutUser();  
          
        }


     

  // handleItemClick = () => {
   
  //   if(this.state.activeItem==='messages'){
  //     console.log('home')
  //   }

  // }
  
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul>
        <li>
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
          
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul>
         <li>
          <Link to="/register">
            Sign Up
          </Link>
        </li>

        <li>
          <Link to="/login">
            Loginnnnn
          </Link>
        </li>
      </ul>
    );

    const {activeItem} = this.state;

    if (this.state.activeItem==='messages'){
      console.log('yeppie messages')
    } 

    return (
      
      <div className="App">
      <Menu secondary>

      {isAuthenticated ? authLinks : guestLinks} 

        <Menu.Item 
        as= { Link }
        to='/'
        name='Register'
        active={activeItem === 'Register'} 
        onClick={this.handleItemClick} />
        
        <Menu.Item
          as={ Link }
          to='login'
          name='Login'
          active={activeItem === 'Login'}
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
       
      </div>
      
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
