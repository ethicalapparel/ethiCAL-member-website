import React, { Component } from 'react';
import axios from 'axios';
import { Menu, Container, Header, Loader, Divider } from 'semantic-ui-react';
import Calendar from './components/Calendar';
import Updates from './components/Updates';
import Feedback from './components/Feedback';
import Ideas from './components/Ideas';
import General from './components/General';
import auth from './Auth.js';
import SalesEvents from './components/SalesEvents';
import Retreat from './components/Retreat';
import './index.css';

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

        <Link to={`${match.url}/retreat`}>
          <Menu.Item
            name='Retreat Info'
            active={activeItem === 'Retreat Info'}
            onClick={this.handleItemClick}
          >
            Retreat Info
          </Menu.Item>
        </Link>

        <Link to={`${match.url}/sales`}>
          <Menu.Item
            name='Sales Events'
            active={activeItem === 'Sales Events'}
            onClick={this.handleItemClick}
          >
            Sales Events
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
        <Route path={`${match.url}/sales`} component={SalesEvents}/>
        <Route path={`${match.url}/retreat`} component={Retreat}/>
      </Container>
      </div>

    );
  }
}

class Home extends Component {
  state = {
    data: []
  }

  getData() {
    axios.get('/asana/homeContent')
      .then((response) => this.setState({data: response.data}));
  };

  componentDidMount() {
    this.getData();
    this.countdown = setInterval(()=>this.getData(), 10000);
  };

  componentWillUnmount() {
    clearInterval(this.countdown);
  };
  render() {

    var updates;
    if (this.state.data && this.state.data.length > 0) {
      updates = <ul> {this.state.data.map(elem => <li> {elem.reminder} </li>)} </ul>;
    } else {
      updates = <Loader active />
    }

    return (
      <div id = 'dashboard-container'>
           <Header as='h1'content='WELCOME BACK!'
              style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1.5em', paddingTop: '20px'}}
            />
            <div id = 'content'>
              <Header as='h3' content="Here's watts up:"/>
              <div id = 'updates-list' style={{fontWeight: 'normal', margin: 'auto'}}>
                {updates}   
              </div>
            </div>
      </div>

    );
  };
}


export default Dashboard;
