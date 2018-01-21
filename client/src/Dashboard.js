import React, { Component } from 'react';
import axios from 'axios';
import { Menu, Container, Header } from 'semantic-ui-react';
import Calendar from './components/Calendar';
import Updates from './components/Updates';
import Feedback from './components/Feedback';
import Ideas from './components/Ideas';
import General from './components/General';
import auth from './Auth.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class Dashboard extends Component {
  state = {
      activeItem: 'Home',
      data: []
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    var {activeItem} = this.state;
    var match = this.props.match;
    var {username} = auth;

    console.log(username);
    // <div>
    //   <Route path="/home" component={Home}/>
    // </div>
    return (
      <div>
      <Menu secondary size='large' pointing fixed>
        <Link to={match.url}>
        <Menu.Item
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>
        </Link>


        <Link to={`${match.url}/calendar`}>
          <Menu.Item
            name='Calendar'
            active={activeItem === 'Calendar'}
            onClick={this.handleItemClick}
          >
            Calendar
          </Menu.Item>
        </Link>

        <Link to={`${match.url}/updates`}>
          <Menu.Item
            name='Team Updates'
            active={activeItem === 'Team Updates'}
            onClick={this.handleItemClick}
          >
            Team Updates
          </Menu.Item>
        </Link>

        <Link to={`${match.url}/general`}>
          <Menu.Item
            name='General Info'
            active={activeItem === 'General Info'}
            onClick={this.handleItemClick}
          >
            General Info
          </Menu.Item>
        </Link>

        <Link to={`${match.url}/ideas`}>
          <Menu.Item
            name='Ideas Thread'
            active={activeItem === 'Ideas Thread'}
            onClick={this.handleItemClick}
          >
            Ideas Thread
          </Menu.Item>
        </Link>
        <Link to={`${match.url}/feedback`}>
          <Menu.Item
            name='Feedback Box'
            active={activeItem === 'Feedback Box'}
            onClick={this.handleItemClick}
          >
            Feedback Box
          </Menu.Item>
        </Link>
        <Menu.Menu position='right'>
          <Menu.Item>
            {username}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Container textAlign='center' fluid>
        <Route exact path={match.url} component={Home}/>
        <Route path={`${match.url}/calendar`} component={Calendar}/>
        <Route path={`${match.url}/updates`} component={Updates}/>
        <Route path={`${match.url}/general`} component={General}/>
        <Route path={`${match.url}/ideas`} component={Ideas}/>
        <Route path={`${match.url}/feedback`} component={Feedback}/>
      </Container>
      </div>

    );
  }
}

class Home extends Component {
  render() {
    var {username} = auth;
    return (<Header
            as='h1'
            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '2em' }}
          > {"Welcome Back " + username.split(" ")[0]} </Header>);
  };
}


export default Dashboard;
