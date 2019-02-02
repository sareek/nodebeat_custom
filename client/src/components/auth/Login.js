import React, { Component } from 'react';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './Login.css';



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        return (
            <div className='Person'>
                <Form>
                    <Form.Field>
                        <p>Login</p>
                    </Form.Field>
                 
                    <Form.Field>
                        <label>Email</label>
                        <input
                            placeholder='sarik@gmail.com'
                            name="email"
                            //value={this.state.email}
                           // onChange={this.onChange}

                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password"
                            placeholder='ssdfasfsere1'
                            name="password"
                            // value={this.state.password}
                            //onChange={this.onChange}
                        />
                    </Form.Field>
                   
                    <Button primary type='submit' onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </div>
        )

    }
}

export default Login;
