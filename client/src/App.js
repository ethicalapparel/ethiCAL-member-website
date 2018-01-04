import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form } from 'semantic-ui-react';
import auth from './Auth.js';
import Dashboard from './Dashboard.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';


const responseGoogle = (response) => {
  console.log(response);
}


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <PrivateRoute path="/home" component={Dashboard}/>
          <Route path="/login" component={Login}/>
          <Redirect to="/home"/>
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    submittedSecret: ''
  }

  login = () => {
    auth.authenticate(this.state.submittedSecret, () => {
      this.setState({ redirectToReferrer: true });
    });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (this.state.redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    /* For Google Authentication... */
    // <GoogleLogin
    //   clientId="403191453480-tompathl7r8mmdqcnlqtmh7nruccvju1.apps.googleusercontent.com"
    //   buttonText="Login"
    //   onSuccess={responseGoogle}
    //   onFailure={responseGoogle}
    // />
    return (
      <div>
        <Form onSubmit={this.login}>
          <Form.Group>
            <Form.Input placeholder='Type in Anything' name='submittedSecret' value={this.state.submittedSecret} onChange={this.handleChange}/>
            <Form.Button content='Login'/>
          </Form.Group>
        </Form>

      </div>
    )
  }
}

export default App;
