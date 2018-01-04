import React, { Component } from 'react';
import axios from 'axios';
import { Menu } from 'semantic-ui-react';
import Calendar from './components/Calendar.js';
import Updates from './components/';
import
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class Home extends Component {
  state = {
      data: ["Initial Data": "HI"]
  };

  componentDidMount() {
    axios.get('/asana/calendar')
      .then((response) => this.setState({data: response.data}));
  };

  render() {
    return (<h1 style:"text-align: center"> Welcome Back</h1>);
  };
};

class Dashboard extends Component {
  state = {
      activeItem: 'Home',
      data: []
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    var {activeItem} = this.state;
    var match = this.props.match;
    console.log(match);
    // <div>
    //   <Route path="/home" component={Home}/>
    // </div>
    return (
      <div>
      <Menu secondary>
        <Link to='/'>
        <Menu.Item
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>
        </Link>

        <Link to='/calendar'>
          <Menu.Item
            name='Calendar'
            active={activeItem === 'Calendar'}
            onClick={this.handleItemClick}
          >
            Calendar
          </Menu.Item>
        </Link>

        <Link to='/updates'>
          <Menu.Item
            name='Team Updates'
            active={activeItem === 'Team Updates'}
            onClick={this.handleItemClick}
          >
            Team Updates
          </Menu.Item>
        </Link>
      </Menu>
      <Route exact path='/' component={Home}/>
      <Route path="/calendar" component={Calendar}/>
      <Route path="/calendar" component={Calendar}/>
      </div>

    );
  };
}


export default Dashboard;
