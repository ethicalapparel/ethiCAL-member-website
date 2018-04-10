import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Sidebar, Button, Icon, Dropdown, Responsive, Menu, Container, Header, Loader, Divider } from 'semantic-ui-react';
import Calendar from './components/Calendar';
import Updates from './components/Updates';
import Feedback from './components/Feedback';
import Ideas from './components/Ideas';
import General from './components/General';
import auth from './Auth.js';
import SalesEvents from './components/SalesEvents';
import Retreat from './components/Retreat';
import Appreciation from './components/Appreciation';
import Inventory from './components/Inventory';
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
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    var {activeItem} = this.state;
    var match = this.props.match;
    var username = auth.username;
    var id = auth.id;
    console.log(id);
    console.log(username);
    // <div>
    //   <Route path="/home" component={Home}/>
    // </div>
    return (
      <div>
      <Responsive maxWidth={767} as={Dropdown} style={{height: 40, padding: 5}} icon={<Icon name="sidebar" size="big" />}>
        <Dropdown.Menu>
            <Dropdown.Item as={Link} to={match.url}
              onClick={this.handleItemClick}
              name='Home'
            >
            <Menu.Item
              active={activeItem === 'Home'}
            >
              Home
            </Menu.Item>
            </Dropdown.Item>

            <Dropdown.Item as ={Link} to={`${match.url}/calendar`}
                onClick={this.handleItemClick}
                name='Calendar'
            >
              <Menu.Item
                active={activeItem === 'Calendar'}
              >
                Calendar
              </Menu.Item>
            </Dropdown.Item>

            <Dropdown.Item as ={Link} to={`${match.url}/updates`}
                onClick={this.handleItemClick}
                name='Team Updates'
            >
              <Menu.Item
                active={activeItem === 'Team Updates'}
              >
                Team Updates
              </Menu.Item>
            </Dropdown.Item>

            <Dropdown.Item as={Link} to={`${match.url}/general`}
                onClick={this.handleItemClick}
                name='General Info'
            >
              <Menu.Item
                active={activeItem === 'General Info'}
              >
                General Info
              </Menu.Item>
            </Dropdown.Item>

            <Dropdown.Item as={Link} to={`${match.url}/sales`}
                onClick={this.handleItemClick}
                name='Sales Events'
            >
              <Menu.Item
                active={activeItem === 'Sales Events'}
              >
                Sales Events
              </Menu.Item>
            </Dropdown.Item>

            <Dropdown.Item as={Link} to={`${match.url}/inventory`}
                onClick={this.handleItemClick}
                name='Inventory'
            >
              <Menu.Item
                active={activeItem === 'Inventory'}
              >
                Inventory
              </Menu.Item>
            </Dropdown.Item>

            <Dropdown.Item as={Link} to={`${match.url}/ideas`}
                onClick={this.handleItemClick}
                name='Ideas Thread'
            >
              <Menu.Item
                active={activeItem === 'Ideas Thread'}
              >
                Ideas Thread
              </Menu.Item>
            </Dropdown.Item>

            <Dropdown.Item as={Link} to={`${match.url}/appreciation`}
                onClick={this.handleItemClick}
                name='Appreciation'
            >
              <Menu.Item
                active={activeItem === 'Appreciation'}
              >
                Appreciation
              </Menu.Item>
            </Dropdown.Item>

            <Dropdown.Item as={Link} to={`${match.url}/feedback`}
                onClick={this.handleItemClick}
                name='Feedback Box'
            >
              <Menu.Item
                active={activeItem === 'Feedback Box'}
              >
                Feedback Box
              </Menu.Item>
            </Dropdown.Item>

        </Dropdown.Menu>
      </Responsive>
      <Responsive minWidth={768} as={Menu}  secondary size='large' pointing fixed>
        <Link to={match.url}> <Menu.Item
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


        <Link to={`${match.url}/sales`}>
          <Menu.Item
            name='Sales Events'
            active={activeItem === 'Sales Events'}
            onClick={this.handleItemClick}
          >
            Sales Events
          </Menu.Item>
        </Link>

        <Link to={`${match.url}/inventory`}>
          <Menu.Item
            name='Inventory'
            active={activeItem === 'Inventory'}
            onClick={this.handleItemClick}
          >
            Inventory
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

        <Link to={`${match.url}/appreciation`}>
          <Menu.Item
            name='Appreciation'
            active={activeItem === 'Appreciation'}
            onClick={this.handleItemClick}
          >
            Appreciation
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
      </Responsive>
      <Container textAlign='center' fluid>
        <Route exact path={match.url} component={Home}/>
        <Route path={`${match.url}/calendar`} component={Calendar}/>
        <Route path={`${match.url}/updates`} component={Updates}/>
        <Route path={`${match.url}/general`} component={General}/>
        <Route path={`${match.url}/ideas`} component={Ideas}/>
        <Route path={`${match.url}/appreciation`} component={Appreciation}/>
        <Route path={`${match.url}/feedback`} component={Feedback}/>
        <Route path={`${match.url}/sales`} component={SalesEvents}/>
        <Route path={`${match.url}/inventory`} component={Inventory}/>
      </Container>
      </div>

    );
/** TO BE ADDED LATER
    <Link to={`${match.url}/ideas`}>
      <Menu.Item
        name='Ideas Thread'
        active={activeItem === 'Ideas Thread'}
        onClick={this.handleItemClick}
      >
        Ideas Thread
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
*/
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

      updates = <ul> {this.state.data.map(elem => {
        var convertLinks = elem.reminder.split(" ")
          .map((word) => {
            return word.includes("https://") || word.includes("http://") ?
             <a href={word} target="_blank"> {word} </a> : " " + word;
          });
        return <li> {convertLinks} </li>;
      })} </ul>;
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
