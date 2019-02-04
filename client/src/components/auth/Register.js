import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';
import classnames from 'classnames'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { Button, Checkbox, Form, Dropdown } from 'semantic-ui-react'

import './Register.css';

class RegisterForm extends Component {

constructor() {
    super();
    this.state = {
        name: '',
        email: '',
        password:'',
        password2:'',
        errors: {}

    };
     this.onChange = this.onChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this); 
     this.handleSubmitTest = this.handleSubmitTest.bind(this); 
}    


// onSubmit(e) {
//     e.preventDefault();
//     console.log('onSubmit here');

//     const newUser = {
//       name: this.state.name,
//       email: this.state.email,
//       password: this.state.password,
//       password2: this.state.password2
//     };

//     this.props.registerUser(newUser);

//     // axios
//     //   .post('/api/users/register', newUser)
//     //   .then(res => console.log(res.data))
//     //   .catch(err => this.setState({ errors: err.response.data }));
//   }

handleSubmit(e) {
  console.log('handleSubmit called')
 

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);

   
  
}


handleSubmitTest(e) {
  console.log('handleSubmitTest called');
}

componentWillReceiveProps(nextProps) {
  if(nextProps.errors) {
    this.setState({errors:nextProps.errors})
  }
}

onChange(e) {
  console.log('dd',[e.target.name]);
  console.log({ [e.target.name]: e.target.value })
  this.setState( { [e.target.name]: e.target.value } );
  //this.setState({ [e.target.name]: e.target.value });
}

render() {

  const { errors }= this.state;
  const { user } = this.props.auth;

return (   
 
<div className="Person">

  {/* {user? user.name :null} */}


  <Form onSubmit={this.handleSubmitTest}>
  <Form.Field> 
    <p>Register Form</p> 
        </Form.Field>
    <Form.Field>
      <label>Name</label>
      <input 
      placeholder='Billy Joe' 
      name="name"
     // value={this.state.name}
      onChange={this.onChange}
      
      />
    </Form.Field>
   
    <Form.Field>
      <label>Email</label>
      <input 
      placeholder='sarik@gmail.com'
      name="email" 
      //value={this.state.email}
      onChange={this.onChange}
      
      />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input type="password" 
      placeholder='ssdfasfsere1'
      name="password" 
     // value={this.state.password}
      onChange={this.onChange}
      />
    </Form.Field>
    <Form.Field>
      <label>Confirm Password</label>
      <input
      type="password"
      name="password2"
     // value={this.state.password2}
      onChange={this.onChange}
      />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field >
    <Button primary type='submit' onClick={ this.handleSubmit }>Submit</Button>
  </Form>
  </div>  

 )

}
}

//little bit confused here
RegisterForm.propTypes={
  registerUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
};

//access auth property with this.props.auth
//this.props.errors
const MapStateToProps=(state)=>({
  auth:state.auth,
  errors:state.errors
  
});
export default connect(MapStateToProps, { registerUser })(withRouter(RegisterForm));
