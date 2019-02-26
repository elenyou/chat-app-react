import React, { Component } from 'react';
import firebase from '../../firebase'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: [],
        loading: false
    }


    displayErrors = errors => errors.map((error, i) => <p key={1}>{error.message}</p>);

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormvalid(this.state)) {
            this.setState({ errors: [], loading: true });
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser);
                })
                .catch (err => {
                    console.error(err);
                    this.setState({
                       errors: this.state.errors.concat(err),
                       loading: false
                    });
                })
        }
    };

    isFormvalid = ({ email, password }) =>  email && password;


    handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)
        )
            ? 'error'
            : ''
    }

    render() {
        const {email, password, errors, loading } = this.state;
        return (
            <div>
                <Grid textAlign="center" verticalAlign="middle" className="app">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h1" icon color="blue" textAlign="center">
                            <Icon name="braille" color="blue" />
                            Login to Chat
                        </Header>
                        <Form onSubmit={this.handleSubmit} size="large">
                            <Segment stacked>

                                <Form.Input fluid name="email"
                                    icon="mail"
                                    iconPosition="left"
                                    placeholder="Email Address"
                                    onChange={this.handleChange}
                                    value={email}
                                    className={this.handleInputError(errors, 'email')}
                                    type="emal"
                                />

                                <Form.Input fluid name="password"
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    value={password}
                                    className={this.handleInputError(errors, 'password')}
                                    type="password"
                                />


                                <Button disabled={loading}
                                    className={loading ? 'loading' : ''}
                                    color="blue"
                                    fluid size="large">
                                    Submit
                                </Button>
                            </Segment>
                        </Form>
                        {errors.length > 0 && (
                            <Message error>
                                <h3>Error</h3>
                                {this.displayErrors(errors)}
                            </Message>
                        )}
                        <Message>
                            Don't have an account?
                            <Link to="/register">Register</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Login;