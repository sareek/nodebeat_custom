import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames'
import { loginUser } from '../../actions/authActions'
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './Login.css';



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this); 


    }


    componentWillReceiveProps(nextProps) {

        if(nextProps.auth.isAuthenticated) {
           this.props.history.push('/dashboard'); 
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
            console.log('component will mount error test',this.state.errors)
        }
    }


    onChange(e) {
        console.log('dd',[e.target.name]);
        console.log({ [e.target.name]: e.target.value })
        this.setState( { [e.target.name]: e.target.value } );
        //this.setState({ [e.target.name]: e.target.value });
      }

    handleSubmitLogin(e) {
        e.preventDefault();
       

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    
    this.props.loginUser(userData);
    console.log('loginsubmit entered', userData)

    }

    render() {

        //implement the errors here
        const { errors } = this.state;




        return (
            <div className='Person'>
                <Form onSubmit={this.handleSubmitLogin}>
                    <Form.Field>
                        <p>Login</p>
                    </Form.Field>
                     {errors.message}
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

                    <Button
                        primary
                        type='submit'
                        onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </div>
        )

    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
