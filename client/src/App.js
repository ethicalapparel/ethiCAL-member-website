import React, { Component } from 'react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Form, Segment, Header, Grid, Loader } from 'semantic-ui-react';
import auth from './Auth.js';
import Dashboard from './Dashboard.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
// import { GoogleLogin } from 'react-google-login';
//
//
// const responseGoogle = (response) => {
//   console.log(response);
// }

const RedirHome = (props) => (<Redirect to='/home'/>);

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <PrivateRoute path="/home" component={Dashboard}/>
          <Route path="/login" component={Login}/>
          <Route exact path="/" component={RedirHome}/>
        </div>
      </Router>
    );
  }
}

class PrivateRoute extends Component {
  state = {
    knowAuth: false,
  }

  componentDidMount() {
    auth.updateAuthentication().then((authenticated)=>
      {
        console.log(authenticated);
        this.setState({knowAuth: true});
      });
  }

  render() {
    const {component, ...rest} = this.props;
    const Component = component;
    return this.state.knowAuth ? <Route {...rest} render={props => (
      auth.authenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/> : <Loader active/>;
  }

}

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const authenticated = auth.isAuthenticated();
//   console.log(authenticated);
//   return <Route {...rest} render={props => (
//     authenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>;
// };


class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    submittedSecret: '',
    name: '',
    loginFailed: false,
  }

  login = () => {
    auth.authenticate(this.state.name, this.state.submittedSecret, (auth) => {
      auth ? this.setState({ redirectToReferrer: true }) : this.setState({loginFailed: true});
    });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (this.state.redirectToReferrer) {
      return (
        <Redirect to={from} />
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
      <Grid container centered>
        <Segment secondary textAlign='center' style={{marginTop: '35vh', width: '30%'}}>
          <Header> EthiCAL Member Portal </Header>
          <Form onSubmit={this.login}>
              <Form.Field>
                <Form.Input placeholder='Name' name='name' value={this.state.name} onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <Form.Input placeholder='Secret Key' name='submittedSecret' value={this.state.submittedSecret} onChange={this.handleChange} type='password'/>
              </Form.Field>
              <Form.Button content='Login'/>
          </Form>
          <div>
          {this.state.loginFailed && "Login Failed"}
          </div>

        </Segment>
      </Grid>
    )
  }
}

export default App;
